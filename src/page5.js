$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var filled = 0;
            filled += caFill('input[name=head_comments]', s["pg5_head_comments"], 'Head Findings') ? 1 : 0;
            filled += caFill('input[name=neck_comments]', s["pg5_neck_comments"], 'Neck Findings') ? 1 : 0;
            filled += caFill('select[name=trachea]', s["pg5_trachea"], 'Trachea') ? 1 : 0;
            filled += caFill('input[name=chest_comments]', s["pg5_chest_comments"], 'Chest Findings') ? 1 : 0;
            filled += caFill('input[name=ap_appearance]', s["pg5_ap_appearance"], 'Abdomen (Appearance)') ? 1 : 0;
            filled += caFill('input[name=ap_palpation]', s["pg5_ap_palpation"], 'Abdomen (Palpation)') ? 1 : 0;
            filled += caFill('input[name=ap_bowel_sounds]', s["pg5_ap_bowel_sounds"], 'Abdomen (Bowel Sounds)') ? 1 : 0;
            filled += caFill('input[name=ap_findings]', s["pg5_ap_findings"], 'Abdomen (Comments)') ? 1 : 0;
            filled += caFill('input[name=pelvis_comments]', s["pg5_pelvis_comments"], 'Pelvis Findings') ? 1 : 0;
            filled += caFill('input[name=back_comments]', s["pg5_back_comments"], 'Back Findings') ? 1 : 0;
            filled += caFill('input[name=ex_comments]', s["pg5_ex_comments"], 'Extremity Findings') ? 1 : 0;
            filled += caFill('input[name=ex_restraints]', s["pg5_ex_restraints"], 'Restraints') ? 1 : 0;
            filled += caFill('input[name=ex_skin_findings]', s["pg5_ex_skin_findings"], 'Skin Findings') ? 1 : 0;
            if (!filled) caToast('Nothing to fill — no defaults are set, or all fields already match your defaults.');
        });
    });
});
