// TOADD
// Breathe sounds left
// right
// comment box
// brachial L & R
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var response = {
                resp_comments: s["pg4_resp_comments"],
                cardiac_comments: s["pg4_cardiac_comments"],
                carotid_r: s["pg4_carotid_r"],
                carotid_l: s["pg4_carotid_l"],
                radial_r: s["pg4_radial_r"],
                radial_l: s["pg4_radial_l"],
                fem_r: s["pg4_fem_r"],
                fem_l: s["pg4_fem_l"],
                dors_r: s["pg4_dors_r"],
                dors_l: s["pg4_dors_l"]
            };

            var resp_comments = response.resp_comments;
            var cardiac_comments = response.cardiac_comments;
            var carotid_r = response.carotid_r;
            var carotid_l = response.carotid_l;
            var radial_r = response.radial_r;
            var radial_l = response.radial_l;
            var fem_r = response.fem_r;
            var fem_l = response.fem_l;
            var dors_r = response.dors_r; // delete
            var dors_l = response.dors_l; // delete

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

            caFlash('input[name=cv_comments], input[name=RESP_COMMENTS], select[name=PULSE_CAROTID_R], select[name=PULSE_CAROTID], select[name=PULSE_RAD_R], select[name=PULSE_RAD_L], select[name=PULSE_FEM_R], select[name=PULSE_FEM_L], select[name=PULSE_DORS_R], select[name=PULSE_DORS_L]');
        });
    });
});
