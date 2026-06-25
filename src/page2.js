$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var filled = 0;
            filled += caFill('textarea[name=PRMAIN_cc]', s["pg2_chief_complaint"], 'Chief Complaint') ? 1 : 0;
            filled += caFill('input[name=PRMAIN_ccduration]', s["pg2_duration"], 'Duration') ? 1 : 0;
            filled += caFill('select[name=PRMAIN_ccdurunits]', s["pg2_duration_units"], 'Duration Units') ? 1 : 0;
            filled += caFill('textarea[name=PRMAIN_hpi]', s["pg2_hpi"], 'HPI') ? 1 : 0;
            filled += caFill('textarea[name=scene_description]', s["pg2_scene_description"], 'Scene Description') ? 1 : 0;
            filled += caFill('select[name=PRMAIN_first_on_scene]', s["pg2_first_on_scene"], 'First On Scene') ? 1 : 0;
            filled += caFill('[name=PRMAIN_level_care_per_protocol]', s["pg2_level_care"], 'Level of Care per Protocol') ? 1 : 0;
            filled += caFill('textarea[name=PRMAIN_belongings]', s["pg2_belongings"], 'Patient Belongings') ? 1 : 0;
            filled += caFillPopup('pt_moved_via', s["pg2_to_truck"], 'Moved to Vehicle Via') ? 1 : 0;
            filled += caFillPopup('pt_position', s["pg2_position"], 'Position in Vehicle') ? 1 : 0;
            filled += caFillPopup('pt_moved_from_multi', s["pg2_from_truck"], 'Moved From Vehicle Via') ? 1 : 0;
            filled += caFillPopup('transassess', s["pg2_transassess"], 'Transport Assessment') ? 1 : 0;
            filled += caFill('textarea[name=stretcher_purpose_descr]', s["pg2_stretcher_purpose"], 'Stretcher Purpose') ? 1 : 0;
            if (!filled) caToast('Nothing to fill — no defaults are set, or all fields already match your defaults.');
        });
    });
});
