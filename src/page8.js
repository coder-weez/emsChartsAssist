$(document).ready(function() {
    caToolbar().addClass('ca-vertical');
    caToolbar().append('<button class="atref ca-btn">On Scene</button>');
    caToolbar().append('<button class="lvref ca-btn">Transport</button>');
    caToolbar().append('<button class="atrec ca-btn">At Hospital</button>');
    caToolbar().append('<button class="can1 ca-btn">Refusal</button>');
    caToolbar().append('<button class="can2 ca-btn">Custom</button>');

    $('.can1').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var can_1 = s["pg8_can_1"];
            $('textarea[name=vs_comment]').val(can_1);
            caFlash('textarea[name=vs_comment]');
        });
    });

    $('.can2').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var can_2 = s["pg8_can_2"];
            $('textarea[name=vs_comment]').val(can_2);
            caFlash('textarea[name=vs_comment]');
        });
    });

    $('.atref').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var at_ref_comment = s["pg8_at_ref"];
            $('textarea[name=vs_comment]').val(at_ref_comment);
            caFlash('textarea[name=vs_comment]');
        });
    });

    $('.lvref').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var lv_ref_comment = s["pg8_lv_ref"];
            $('textarea[name=vs_comment]').val(lv_ref_comment);
            caFlash('textarea[name=vs_comment]');
        });
    });

    $('.atrec').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var at_rec_comment = s["pg8_at_rec"];
            $('textarea[name=vs_comment]').val(at_rec_comment);
            caFlash('textarea[name=vs_comment]');
        });
    });
});
