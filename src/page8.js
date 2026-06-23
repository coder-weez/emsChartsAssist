$(document).ready(function() {
    $('.headerTable').append('<button class="atref ca-btn">At Ref</button>');
    $('.headerTable').append('<button class="lvref ca-btn">Lv Ref</button>');
    $('.headerTable').append('<button class="atrec ca-btn">At Rec</button>');
    $('.headerTable').append('<button class="can1 ca-btn">Canned 1</button>');
    $('.headerTable').append('<button class="can2 ca-btn">Canned 2</button>');
    
    $('.can1').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg8"
        }, function(response) {
            var can_1 = response.can_1;
            $('textarea[name=vs_comment]').val(can_1);
            caFlash('textarea[name=vs_comment]');
        }); 
    });
    
    $('.can2').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg8"
        }, function(response) {
            var can_2 = response.can_2;
            $('textarea[name=vs_comment]').val(can_2);
            caFlash('textarea[name=vs_comment]');
        }); 
    });
    
    $('.atref').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg8"
        }, function(response) {
            var at_ref_comment = response.at_ref_comment;
            
            var at_ref_ex = "At Ref: ([0-2][0-9]:[0-5][0-9])";
            var regex1 = new RegExp(at_ref_ex);
            var times = $('input[name=pertneg_tmp_eventid]').next('div').html();
            var at_ref = regex1.exec(times);
            if (at_ref) {
                $('input[name=vtime]').val(at_ref[1]);
            }
            $('textarea[name=vs_comment]').val(at_ref_comment);
            caFlash('input[name=vtime], textarea[name=vs_comment]');
        }); 
    });
    $('.lvref').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg8"
        }, function(response) {           
            
            var lv_ref_comment = response.lv_ref_comment;
            var lv_ref_ex = "Lv Ref: ([0-2][0-9]:[0-5][0-9])";
            var regex2 = new RegExp(lv_ref_ex);
            var times = $('input[name=pertneg_tmp_eventid]').next('div').html();
            var lv_ref = regex2.exec(times);
            if (lv_ref) {
                $('input[name=vtime]').val(lv_ref[1]);
            }
            $('textarea[name=vs_comment]').val(lv_ref_comment);
            caFlash('input[name=vtime], textarea[name=vs_comment]');
        }); 
    });
    $('.atrec').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg8"
        }, function(response) {           
            var at_rec_comment = response.at_rec_comment;
            var at_rec_ex = "At Rec: ([0-2][0-9]:[0-5][0-9])";
            var regex3 = new RegExp(at_rec_ex);
            var times = $('input[name=pertneg_tmp_eventid]').next('div').html();
            var at_rec = regex3.exec(times);
            if (at_rec) {
                $('input[name=vtime]').val(at_rec[1]);
            }
            $('textarea[name=vs_comment]').val(at_rec_comment);
            caFlash('input[name=vtime], textarea[name=vs_comment]');
        });
    });
});
    
