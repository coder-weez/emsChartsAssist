// Shared UI helpers for EMSCharts Assist content scripts.
// Loaded after jQuery and before each page script.

// Returns the extension's floating button bar, creating it once on first use.
// EMSCharts pages no longer expose a stable header element to attach to, so the
// AutoComplete buttons live in their own fixed-position, draggable toolbar.
function caToolbar() {
    var bar = jQuery('#ca-toolbar');
    if (!bar.length) {
        bar = jQuery('<div id="ca-toolbar" class="ca-vertical"></div>').appendTo('body');
        var handle = jQuery('<div id="ca-drag" title="Drag to move">⠿</div>').appendTo(bar);
        caMakeDraggable(bar, handle);
        caRestorePosition(bar);
        setTimeout(function() {
            jQuery('<button class="ca-btn" style="font-size:11px;padding:3px 8px;opacity:0.85">Page Defaults</button>')
                .appendTo(bar)
                .on('click', function() {
                    if (chrome.runtime && chrome.runtime.id) {
                        var m = window.location.pathname.match(/page(\d+)\.cfm/i);
                        chrome.runtime.sendMessage({ action: 'openOptions', page: m ? m[1] : null });
                    }
                });
        }, 0);
    }
    return bar;
}

// Let the user reposition the toolbar by dragging its handle.
function caMakeDraggable(bar, handle) {
    var startX, startY, startLeft, startTop, dragging = false;

    handle.on('mousedown', function(e) {
        e.preventDefault();
        dragging = true;
        var rect = bar[0].getBoundingClientRect();
        // Switch from right-anchored to left/top so we can move it freely.
        bar.css({ left: rect.left + 'px', top: rect.top + 'px', right: 'auto' });
        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        jQuery(document).on('mousemove.ca', onMove).on('mouseup.ca', onUp);
    });

    function onMove(e) {
        if (!dragging) return;
        var left = startLeft + (e.clientX - startX);
        var top = startTop + (e.clientY - startY);
        // Keep the bar within the viewport.
        left = Math.max(0, Math.min(left, window.innerWidth - bar.outerWidth()));
        top = Math.max(0, Math.min(top, window.innerHeight - bar.outerHeight()));
        bar.css({ left: left + 'px', top: top + 'px' });
    }

    function onUp() {
        dragging = false;
        jQuery(document).off('mousemove.ca mouseup.ca');
        caSavePosition(bar);
    }
}

// Remember / restore the toolbar position (per device) so it stays where the
// user dropped it across pages and sessions.
function caSavePosition(bar) {
    var rect = bar[0].getBoundingClientRect();
    chrome.storage.local.set({ ca_toolbar_pos: { left: rect.left, top: rect.top } });
}

function caRestorePosition(bar) {
    chrome.storage.local.get('ca_toolbar_pos', function(r) {
        var pos = r && r.ca_toolbar_pos;
        if (pos) {
            bar.css({ left: pos.left + 'px', top: pos.top + 'px', right: 'auto' });
        }
    });
}

// Briefly flash a light-green background on the given fields to confirm
// they were just auto-filled, then fade back to their normal background.
function caFlash(selector) {
    jQuery(selector).each(function() {
        var el = jQuery(this);
        el.css({ transition: 'background-color .5s ease', backgroundColor: '#c8f7c5' });
        setTimeout(function() {
            el.css('background-color', '');
            setTimeout(function() { el.css('transition', ''); }, 500);
        }, 700);
    });
}

// Show a brief non-blocking notification at the bottom of the page.
// Multiple calls stack vertically above the previous toast.
function caToast(message) {
    var container = jQuery('#ca-toast-container');
    if (!container.length) {
        container = jQuery('<div id="ca-toast-container"></div>').appendTo('body');
    }
    var toast = jQuery('<div class="ca-toast"></div>').text(message).appendTo(container);
    setTimeout(function() { toast.addClass('ca-toast-show'); }, 10);
    setTimeout(function() {
        toast.removeClass('ca-toast-show');
        setTimeout(function() {
            toast.remove();
            if (!container.children().length) { container.remove(); }
        }, 300);
    }, 6000);
}

// Fill an EMSCharts popup multi-select field.
// These fields store the selected text label in a hidden input ({fieldName}_text)
// and display it in a span (#{fieldName}_htmlid) — there is no standard select element.
// Returns true if anything visible happened (fill or toast), false for silent no-ops.
function caFillPopup(fieldName, value, friendlyName) {
    if (value === undefined || value === null || value === '') return false;
    var input = jQuery('input[name="' + fieldName + '_text"]');
    if (!input.length) return false;
    var current = (input.val() || '').trim();
    if (current) {
        if (current.toLowerCase() === value.toLowerCase()) return false;
        caToast('"' + friendlyName + '" was not updated — field already has content.');
        return true;
    }
    input[0].value = value;
    input.trigger('change');
    var span = jQuery('#' + fieldName + '_htmlid');
    if (span.length) {
        span.text(value);
        span.parent().find('[name="add"]').hide();
    }
    caFlash('input[name="' + fieldName + '_text"]');
    return true;
}

// Clear a text/textarea/select field back to blank.
function caClrField(selector) {
    var el = jQuery(selector);
    if (!el.length) return;
    var tag = (el.prop('tagName') || '').toLowerCase();
    var type = (el.attr('type') || 'text').toLowerCase();
    var isText = tag === 'textarea' || (tag === 'input' && type !== 'checkbox' && type !== 'radio' && type !== 'hidden');
    if (isText) {
        el[0].value = '';
    } else {
        el.val('');
    }
}

// Clear an EMSCharts popup multi-select field (companion to caFillPopup).
function caClrPopup(fieldName) {
    var input = jQuery('input[name="' + fieldName + '_text"]');
    if (!input.length) return;
    input[0].value = '';
    input.trigger('change');
    var span = jQuery('#' + fieldName + '_htmlid');
    if (span.length) {
        span.text('');
        span.parent().find('[name="add"]').show();
    }
}

// Fill an EMSCharts "pertneg" multi-select field (Mental / Neurological exam sections).
// These fields display selected text in a span.pcr-multi-pick-list inside a div, and
// store the text label in a hidden input whose name is derived by stripping "_id" from divId
// (e.g. divId "mental_text_id" → input[name="mental_text"]).
// value should be comma-separated text labels (e.g. "Oriented-Person,Oriented-Place").
// Returns true if anything visible happened, false for silent no-ops.
function caFillPertNeg(divId, value, friendlyName) {
    if (value === undefined || value === null || value === '') return false;
    var div = jQuery('#' + divId);
    if (!div.length) return false;
    var span = div.find('span.pcr-multi-pick-list');
    if (!span.length) return false;
    var current = span.text().trim();
    if (current) {
        if (current.toLowerCase() === value.toLowerCase()) return false;
        caToast('"' + friendlyName + '" was not updated — field already has content.');
        return true;
    }
    var inputName = divId.replace(/_id$/, '');
    var hidden = jQuery('input[name="' + inputName + '"]');
    if (hidden.length) {
        hidden[0].value = value;
        hidden.trigger('change');
    }
    span.text(value);
    div.find('.add-multi-pick-button').hide();
    caFlash('#' + divId + ' span');
    return true;
}

// Clear an EMSCharts "pertneg" multi-select field (companion to caFillPertNeg).
function caClrPertNeg(divId) {
    var div = jQuery('#' + divId);
    if (!div.length) return;
    var inputName = divId.replace(/_id$/, '');
    var hidden = jQuery('input[name="' + inputName + '"]');
    if (hidden.length) {
        hidden[0].value = '';
        hidden.trigger('change');
    }
    div.find('span.pcr-multi-pick-list').text('');
    div.find('.add-multi-pick-button').show();
}

// Fill a field with value.
// Text inputs / textareas: appends to any existing content (space-separated).
// Selects: skips and shows a toast if the field already has a value.
// Returns true if anything visible happened (fill or toast), false for silent no-ops.
function caFill(selector, value, friendlyName) {
    var el = jQuery(selector);
    if (!el.length || value === undefined || value === null || value === '') return false;
    var tag = (el.prop('tagName') || '').toLowerCase();
    var type = (el.attr('type') || 'text').toLowerCase();
    var isText = tag === 'textarea' || (tag === 'input' && type !== 'checkbox' && type !== 'radio' && type !== 'hidden');
    if (isText) {
        var current = ((el[0] && el[0].value) || '').trim();
        var trimmedValue = value.trim();
        if (current) {
            if (current.toLowerCase().indexOf(trimmedValue.toLowerCase()) !== -1) return false;
            el[0].value = current + ' ' + trimmedValue;
            caToast('"' + friendlyName + '" already had content — options default appended.');
        } else {
            el[0].value = trimmedValue;
        }
    } else {
        if (value === '0' || value === 'null') return false;
        var existing = el.val();
        if (existing !== null && existing !== '' && existing !== '0' && existing !== 'null') {
            if (existing === value) return false;
            caToast('"' + friendlyName + '" was not updated — field already has content.');
            return true;
        }
        el.val(value);
    }
    caFlash(selector);
    return true;
}
