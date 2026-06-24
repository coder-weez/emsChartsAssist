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
function caFillPopup(fieldName, value, friendlyName) {
    if (value === undefined || value === null || value === '') return;
    var input = jQuery('input[name="' + fieldName + '_text"]');
    if (!input.length) return;
    var current = (input.val() || '').trim();
    if (current) {
        if (current.toLowerCase() === value.toLowerCase()) return;
        caToast('"' + friendlyName + '" was not updated — field already has content.');
        return;
    }
    input[0].value = value;
    input.trigger('change');
    var span = jQuery('#' + fieldName + '_htmlid');
    if (span.length) {
        span.text(value);
        span.parent().find('[name="add"]').hide();
    }
    caFlash('input[name="' + fieldName + '_text"]');
}

// Fill a field with value.
// Text inputs / textareas: appends to any existing content (space-separated).
// Selects: skips and shows a toast if the field already has a value.
// Flashes the field on success.
function caFill(selector, value, friendlyName) {
    var el = jQuery(selector);
    if (!el.length || value === undefined || value === null || value === '') return;
    var tag = (el.prop('tagName') || '').toLowerCase();
    var type = (el.attr('type') || 'text').toLowerCase();
    var isText = tag === 'textarea' || (tag === 'input' && type !== 'checkbox' && type !== 'radio' && type !== 'hidden');
    if (isText) {
        var current = ((el[0] && el[0].value) || '').trim();
        var trimmedValue = value.trim();
        if (current) {
            if (current.toLowerCase().indexOf(trimmedValue.toLowerCase()) !== -1) return;
            el[0].value = current + ' ' + trimmedValue;
            caToast('"' + friendlyName + '" already had content — options default appended.');
        } else {
            el[0].value = trimmedValue;
        }
    } else {
        var existing = el.val();
        if (existing !== null && existing !== '' && existing !== '0' && existing !== 'null') {
            if (existing === value) return;
            caToast('"' + friendlyName + '" was not updated — field already has content.');
            return;
        }
        el.val(value);
    }
    caFlash(selector);
}
