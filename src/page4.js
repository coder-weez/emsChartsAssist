$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var filled = 0;
            filled += caFill('textarea[name=RESP_COMMENTS]', s["pg4_resp_comments"], 'Respiratory Comments') ? 1 : 0;
            filled += caFill('select[name=cv_breath_sounds_l]', s["pg4_breath_sounds_l"], 'Breath Sounds (L)') ? 1 : 0;
            filled += caFill('select[name=cv_breath_sounds_r]', s["pg4_breath_sounds_r"], 'Breath Sounds (R)') ? 1 : 0;
            filled += caFill('[name=cv_breath_comments]', s["pg4_breath_comments"], 'Breath Comments') ? 1 : 0;
            filled += caFill('select[name=PULSE_CAROTID]', s["pg4_carotid_l"], 'Carotid (L)') ? 1 : 0;
            filled += caFill('select[name=PULSE_CAROTID_R]', s["pg4_carotid_r"], 'Carotid (R)') ? 1 : 0;
            filled += caFill('select[name=PULSE_RAD_L]', s["pg4_radial_l"], 'Radial (L)') ? 1 : 0;
            filled += caFill('select[name=PULSE_RAD_R]', s["pg4_radial_r"], 'Radial (R)') ? 1 : 0;
            filled += caFill('select[name=PULSE_BRA_L]', s["pg4_brachial_l"], 'Brachial (L)') ? 1 : 0;
            filled += caFill('select[name=PULSE_BRA_R]', s["pg4_brachial_r"], 'Brachial (R)') ? 1 : 0;
            filled += caFill('select[name=PULSE_FEM_L]', s["pg4_fem_l"], 'Femoral (L)') ? 1 : 0;
            filled += caFill('select[name=PULSE_FEM_R]', s["pg4_fem_r"], 'Femoral (R)') ? 1 : 0;
            filled += caFill('input[name=cv_comments]', s["pg4_cardiac_comments"], 'Cardiovascular Comments') ? 1 : 0;
            if (!filled) caToast('Nothing to fill — no defaults are set, or all fields already match your defaults.');
        });
    });
});
