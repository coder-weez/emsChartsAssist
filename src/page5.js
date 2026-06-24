// TOADD
// Treachea
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var response = {
                head_comments: s["pg5_head_comments"],
                neck_comments: s["pg5_neck_comments"],
                chest_comments: s["pg5_chest_comments"],
                ap_appearance: s["pg5_ap_appearance"],
                ap_palpation: s["pg5_ap_palpation"],
                ap_bowel_sounds: s["pg5_ap_bowel_sounds"],
                ap_findings: s["pg5_ap_findings"],
                trachea: s["pg5_trachea"],
                pelvis_comments: s["pg5_pelvis_comments"],
                back_comments: s["pg5_back_comments"],
                extremity_findings: s["pg5_ex_comments"],
                restraints: s["pg5_ex_restraints"],
                skin_findings: s["pg5_ex_skin_findings"]
            };

            var head_comments = response.head_comments;
            var neck_comments = response.neck_comments;
            var chest_comments = response.chest_comments;
            var ap_appearance = response.ap_appearance;
            var ap_palpation = response.ap_palpation;
            var ap_bowel_sounds = response.ap_bowel_sounds;
            var ap_findings = response.ap_findings;
            var trachea = response.trachea;
            var pelvis_comments = response.pelvis_comments;
            var back_comments = response.back_comments;
            var extremity_findings = response.extremity_findings;
            var restraints = response.restraints;
            var skin_findings = response.skin_findings;

            caFill('input[name=head_comments]', head_comments, 'Head Findings');
            caFill('input[name=neck_comments]', neck_comments, 'Neck Findings');
            caFill('select[name=trachea]', trachea, 'Trachea');
            caFill('input[name=chest_comments]', chest_comments, 'Chest Findings');
            caFill('input[name=ap_appearance]', ap_appearance, 'Abdomen (Appearance)');
            caFill('input[name=ap_palpation]', ap_palpation, 'Abdomen (Palpation)');
            caFill('input[name=ap_bowel_sounds]', ap_bowel_sounds, 'Abdomen (Bowel Sounds)');
            caFill('input[name=ap_findings]', ap_findings, 'Abdomen (Comments)');
            caFill('input[name=pelvis_comments]', pelvis_comments, 'Pelvis Findings');
            caFill('input[name=back_comments]', back_comments, 'Back Findings');
            caFill('input[name=ex_comments]', extremity_findings, 'Extremity Findings');
            caFill('input[name=ex_restraints]', restraints, 'Restraints');
            caFill('input[name=ex_skin_findings]', skin_findings, 'Skin Findings');
        });
    });
});