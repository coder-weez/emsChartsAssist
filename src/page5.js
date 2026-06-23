// TOADD
// Treachea
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var response = {
                head_comments: s["pg5_head_comments"],
                neck_comments: s["pg5_neck_comments"],
                chest_comments: s["pg5_chest_comments"],
                ap_appearance: s["pg5_ap_appearance"],
                ap_palpation: s["pg5_ap_palpation"],
                ap_bowel_sounds: s["pg5_ap_bowel_sounds"],
                ap_findings: s["pg5_ap_findings"],
                trachea: 'M',
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

            if (ap_findings != '') {
                $('input[name=ap_findings]').val(ap_findings);
            }
            if (trachea != '') {
                $('select[name=trachea]').val(trachea);
            }
            if (restraints != '') {
                $('input[name=ex_restraints]').val(restraints);
            }

            $('input[name=head_comments]').val(head_comments);
            $('input[name=neck_comments]').val(neck_comments);
            $('input[name=chest_comments]').val(chest_comments);
            $('input[name=ap_appearance]').val(ap_appearance);
            $('input[name=ap_palpation]').val(ap_palpation);
            $('input[name=ap_bowel_sounds]').val(ap_bowel_sounds);
            $('input[name=pelvis_comments]').val(pelvis_comments);
            $('input[name=back_comments]').val(back_comments);
            $('input[name=ex_comments]').val(extremity_findings);
            $('input[name=ex_restraints]').val(restraints);
            $('input[name=ex_skin_findings]').val(skin_findings);


            if (ap_findings != '') {
                $('input[name=ap_findings]').val(ap_findings);
            }

            caFlash('input[name=head_comments], input[name=neck_comments], input[name=chest_comments], input[name=ap_appearance], input[name=ap_palpation], input[name=ap_bowel_sounds], input[name=ap_findings], input[name=pelvis_comments], input[name=back_comments], input[name=ex_comments], input[name=ex_restraints], input[name=ex_skin_findings], select[name=trachea]');
        });
    });
});