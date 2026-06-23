// TOADD
// Breathe sounds left
// right
// comment box
// brachial L & R
// if element does not match options\has preexisting data, add to

$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var response = {
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

            var cardiac_comments = response.cardiac_comments;
            var carotid_r = response.carotid_r;
            var carotid_l = response.carotid_l;
            var radial_r = response.radial_r;
            var radial_l = response.radial_l;
            var fem_r = response.fem_r;
            var fem_l = response.fem_l;
            var dors_r = response.dors_r; // delete
            var dors_l = response.dors_l; // delete

            caFill('select[name=PULSE_CAROTID_R]', carotid_r, 'Carotid (R)');
            caFill('select[name=PULSE_CAROTID]', carotid_l, 'Carotid (L)');
            caFill('select[name=PULSE_RAD_R]', radial_r, 'Radial (R)');
            caFill('select[name=PULSE_RAD_L]', radial_l, 'Radial (L)');
            caFill('select[name=PULSE_FEM_R]', fem_r, 'Femoral (R)');
            caFill('select[name=PULSE_FEM_L]', fem_l, 'Femoral (L)');
            caFill('select[name=PULSE_DORS_R]', dors_r, 'Dorsalis (R)');
            caFill('select[name=PULSE_DORS_L]', dors_l, 'Dorsalis (L)');
            caFill('input[name=cv_comments]', cardiac_comments, 'Cardiovascular Comments');
        });
    });
});
