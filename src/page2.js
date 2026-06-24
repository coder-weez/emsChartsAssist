$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var response = {
                chief_complaint: s["pg2_chief_complaint"],
                cc_duration: s["pg2_duration"],
                cc_duration_units: s["pg2_duration_units"],
                hpi: s["pg2_hpi"],
                scene_description: s["pg2_scene_description"],
                patient_belongings: s["pg2_belongings"],
                to_truck: s["pg2_to_truck"],
                from_truck: s["pg2_from_truck"],
                position: s["pg2_position"],
                first_on_scene: s["pg2_first_on_scene"],
                stretcher_purpose: s["pg2_stretcher_purpose"],
                level_care: s["pg2_level_care"],
                transassess: s["pg2_transassess"]
            };

            var chief_complaint = response.chief_complaint;
            var cc_duration = response.cc_duration;
            var cc_duration_units = response.cc_duration_units;
            var hpi = response.hpi;
            var scene_description = response.scene_description;
            var patient_belongings = response.patient_belongings;
            var to_truck = response.to_truck;
            var from_truck = response.from_truck;
            var position = response.position;
            var first_on_scene = response.first_on_scene;
            var stretcher_purpose = response.stretcher_purpose;
            var level_care = response.level_care;
            var transassess = response.transassess;


            caFill('textarea[name=PRMAIN_cc]', chief_complaint, 'Chief Complaint');
            caFill('input[name=PRMAIN_ccduration]', cc_duration, 'Duration');
            caFill('select[name=PRMAIN_ccdurunits]', cc_duration_units, 'Duration Units');
            caFill('textarea[name=PRMAIN_hpi]', hpi, 'HPI');
            caFill('textarea[name=scene_description]', scene_description, 'Scene Description');
            caFill('select[name=PRMAIN_first_on_scene]', first_on_scene, 'First On Scene');
            caFill('[name=PRMAIN_level_care_per_protocol]', level_care, 'Level of Care per Protocol');
            caFill('textarea[name=PRMAIN_belongings]', patient_belongings, 'Patient Belongings');
            caFillPopup('pt_moved_via', to_truck, 'Moved to Vehicle Via');
            caFillPopup('pt_position', position, 'Position in Vehicle');
            caFillPopup('pt_moved_from_multi', from_truck, 'Moved From Vehicle Via');
            caFillPopup('transassess', transassess, 'Transport Assessment');
            caFill('textarea[name=stretcher_purpose_descr]', stretcher_purpose, 'Stretcher Purpose');
        });
    });
});
