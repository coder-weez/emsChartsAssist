$(document).ready(function() {
    caToolbar().append('<button class="atref ca-btn">On Scene</button>');
    caToolbar().append('<button class="lvref ca-btn">Transport</button>');
    caToolbar().append('<button class="atrec ca-btn">At Hospital</button>');
    caToolbar().append('<button class="can1 ca-btn">Refusal</button>');
    caToolbar().append('<button class="can2 ca-btn">Custom</button>');

    $('.atref').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            if (!caFill('textarea[name=vs_comment]', s["pg8_at_ref"], 'On Scene Comment'))
                caToast('Nothing to fill — no default configured for On Scene Comment.');
        });
    });

    $('.lvref').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            if (!caFill('textarea[name=vs_comment]', s["pg8_lv_ref"], 'Transport Comment'))
                caToast('Nothing to fill — no default configured for Transport Comment.');
        });
    });

    $('.atrec').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            if (!caFill('textarea[name=vs_comment]', s["pg8_at_rec"], 'At Hospital Comment'))
                caToast('Nothing to fill — no default configured for At Hospital Comment.');
        });
    });

    $('.can1').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            if (!caFill('textarea[name=vs_comment]', s["pg8_can_1"], 'Refusal Comment'))
                caToast('Nothing to fill — no default configured for Refusal Comment.');
        });
    });

    $('.can2').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            if (!caFill('textarea[name=vs_comment]', s["pg8_can_2"], 'Custom Comment'))
                caToast('Nothing to fill — no default configured for Custom Comment.');
        });
    });
});
