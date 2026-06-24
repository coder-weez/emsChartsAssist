$(document).ready(function() {
    caToolbar().append('<button class="atref ca-btn">On Scene</button>');
    caToolbar().append('<button class="lvref ca-btn">Transport</button>');
    caToolbar().append('<button class="atrec ca-btn">At Hospital</button>');
    caToolbar().append('<button class="can1 ca-btn">Refusal</button>');
    caToolbar().append('<button class="can2 ca-btn">Custom</button>');

    $('.atref').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            caFill('textarea[name=vs_comment]', s["pg8_at_ref"], 'On Scene Comment');
        });
    });

    $('.lvref').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            caFill('textarea[name=vs_comment]', s["pg8_lv_ref"], 'Transport Comment');
        });
    });

    $('.atrec').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            caFill('textarea[name=vs_comment]', s["pg8_at_rec"], 'At Hospital Comment');
        });
    });

    $('.can1').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            caFill('textarea[name=vs_comment]', s["pg8_can_1"], 'Refusal Comment');
        });
    });

    $('.can2').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            caFill('textarea[name=vs_comment]', s["pg8_can_2"], 'Custom Comment');
        });
    });
});
