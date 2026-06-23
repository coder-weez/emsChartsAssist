// MV3 service worker.
// Service workers have no DOM and cannot access localStorage, so all stored
// defaults are read from chrome.storage.sync (the same store options.js writes to).
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.sync.get(null, function(s) {
            if (request.greeting == "pg2")
                sendResponse({
                    chief_complaint : s["pg2_chief_complaint"],
                    cc_duration : s["pg2_duration"],
                    als_assessment : s["pg2_als_assessment"],
                    cc_duration_units : s["pg2_duration_units"],
                    hpi : s["pg2_hpi"],
                    scene_description : s["pg2_scene_description"],
                    patient_belongings : s["pg2_belongings"],
                    to_truck : s["pg2_to_truck"],
                    from_truck : s["pg2_from_truck"],
                    position : s["pg2_position"],
                    first_on_scene : s["pg2_first_on_scene"],
                    stretcher_purpose : s["pg2_stretcher_purpose"]
                });
            else if(request.greeting == "pg3")
                sendResponse({
                    neuro_comments : s["pg3_neuro_comments"],
                    stroke_scale : s["pg3_stroke_scale"],
                    gcs_eye : s["pg3_gcs_eye"],
                    gcs_verbal : s["pg3_gcs_verbal"],
                    gcs_motor : s["pg3_gcs_motor"]
                });
            else if (request.greeting == "pg4")
                sendResponse({
                    resp_comments : s["pg4_resp_comments"],
                    cardiac_comments : s["pg4_cardiac_comments"],
                    carotid_r : s["pg4_carotid_r"],
                    carotid_l : s["pg4_carotid_l"],
                    radial_r : s["pg4_radial_r"],
                    radial_l : s["pg4_radial_l"],
                    fem_r : s["pg4_fem_r"],
                    fem_l : s["pg4_fem_l"],
                    dors_r : s["pg4_dors_r"],
                    dors_l : s["pg4_dors_l"]
                });
            else if (request.greeting == "pg5")
                sendResponse({
                    head_comments : s["pg5_head_comments"],
                    neck_comments : s["pg5_neck_comments"],
                    chest_comments : s["pg5_chest_comments"],
                    ap_appearance : s["pg5_ap_appearance"],
                    ap_palpation : s["pg5_ap_palpation"],
                    ap_bowel_sounds : s["pg5_ap_bowel_sounds"],
                    ap_findings : s["pg5_ap_findings"],
                    trachea : 'M',
                    pelvis_comments : s["pg5_pelvis_comments"],
                    back_comments : s["pg5_back_comments"],
                    extremity_findings : s["pg5_ex_comments"],
                    restraints : s["pg5_ex_restraints"],
                    skin_findings : s["pg5_ex_skin_findings"]
                });
            else if (request.greeting == "pg8")
                sendResponse({
                    at_ref_comment : s["pg8_at_ref"],
                    lv_ref_comment : s["pg8_lv_ref"],
                    at_rec_comment : s["pg8_at_rec"],
                    can_1 : s["pg8_can_1"],
                    can_2 : s["pg8_can_2"]
                });
        });
        // Keep the message channel open for the async chrome.storage callback.
        return true;
    });
