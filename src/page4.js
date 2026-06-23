$(document).ready(function() {
    $('.headerTable').append('<button style="background:red;color:white;" class="chartfiller">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.runtime.sendMessage({
            greeting: "pg4"
        }, function(response) {
            var resp_comments = response.resp_comments;
            var cardiac_comments = response.cardiac_comments;
            var carotid_r = response.carotid_r;
            var carotid_l = response.carotid_l;
            var radial_r = response.radial_r;
            var radial_l = response.radial_l;
            var fem_r = response.fem_r;
            var fem_l = response.fem_l;
            var dors_r = response.dors_r;
            var dors_l = response.dors_l;

            if (carotid_r != '') {
                $('select[name=PULSE_CAROTID_R]').val(carotid_r);
            }
            if (carotid_l != '') {
                $('select[name=PULSE_CAROTID]').val(carotid_l);
            }
            if (radial_r != '') {
                $('select[name=PULSE_RAD_R]').val(radial_r);
            }
            if (radial_l != '') {
                $('select[name=PULSE_RAD_L]').val(radial_l);
            }
            if (fem_r != '') {
                $('select[name=PULSE_FEM_R]').val(fem_r);
            }
            if (fem_l != '') {
                $('select[name=PULSE_FEM_L]').val(fem_l);
            }
            if (dors_r != '') {
                $('select[name=PULSE_DORS_R]').val(dors_r);
            }
            if (dors_l != '') {
                $('select[name=PULSE_DORS_L]').val(dors_l);
            }
            $('input[name=cv_comments]').val(cardiac_comments);
            $('input[name=RESP_COMMENTS]').val(resp_comments);
        });
    });
});
