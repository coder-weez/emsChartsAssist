$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var response = {
                resp_comments: s["pg4_resp_comments"],
                breath_sounds_l: s["pg4_breath_sounds_l"],
                breath_sounds_r: s["pg4_breath_sounds_r"],
                breath_comments: s["pg4_breath_comments"],
                carotid_l: s["pg4_carotid_l"],
                carotid_r: s["pg4_carotid_r"],
                radial_l: s["pg4_radial_l"],
                radial_r: s["pg4_radial_r"],
                fem_l: s["pg4_fem_l"],
                fem_r: s["pg4_fem_r"],
                brachial_l: s["pg4_brachial_l"],
                brachial_r: s["pg4_brachial_r"],
                cardiac_comments: s["pg4_cardiac_comments"]
            };

            var resp_comments = response.resp_comments;
            var breath_sounds_l = response.breath_sounds_l;
            var breath_sounds_r = response.breath_sounds_r;
            var breath_comments = response.breath_comments;
            var carotid_l = response.carotid_l;
            var carotid_r = response.carotid_r;
            var radial_l = response.radial_l;
            var radial_r = response.radial_r;
            var fem_l = response.fem_l;
            var fem_r = response.fem_r;
            var brachial_l = response.brachial_l;
            var brachial_r = response.brachial_r;
            var cardiac_comments = response.cardiac_comments;

            caFill('textarea[name=RESP_COMMENTS]', resp_comments, 'Respiratory Comments');
            caFill('select[name=cv_breath_sounds_l]', breath_sounds_l, 'Breath Sounds (L)');
            caFill('select[name=cv_breath_sounds_r]', breath_sounds_r, 'Breath Sounds (R)');
            caFill('[name=cv_breath_comments]', breath_comments, 'Breath Comments');
            caFill('select[name=PULSE_CAROTID]', carotid_l, 'Carotid (L)');
            caFill('select[name=PULSE_CAROTID_R]', carotid_r, 'Carotid (R)');
            caFill('select[name=PULSE_RAD_L]', radial_l, 'Radial (L)');
            caFill('select[name=PULSE_RAD_R]', radial_r, 'Radial (R)');
            caFill('select[name=PULSE_BRA_L]', brachial_l, 'Brachial (L)');
            caFill('select[name=PULSE_BRA_R]', brachial_r, 'Brachial (R)');
            caFill('select[name=PULSE_FEM_L]', fem_l, 'Femoral (L)');
            caFill('select[name=PULSE_FEM_R]', fem_r, 'Femoral (R)');
            caFill('input[name=cv_comments]', cardiac_comments, 'Cardiovascular Comments');
        });
    });
});
