// TOADD: level of care per protocal -- dropdown
// 
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
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
                stretcher_purpose: s["pg2_stretcher_purpose"]
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
            
            
            $('input[name=PRMAIN_ccduration]').val(cc_duration);
            $('input[name=stretcher_purpose_descr]').val(stretcher_purpose);
                    
            $('textarea[name=PRMAIN_cc]').val(chief_complaint);
            $('textarea[name=PRMAIN_hpi]').val(hpi);
            $('textarea[name=PRMAIN_belongings]').val(patient_belongings);
            $('textarea[name=scene_description]').val(scene_description);

            $('select[name=PRMAIN_first_on_scene]').val(first_on_scene);
            $('select[name=PRMAIN_ccdurunits]').val(cc_duration_units);
            $('select[name=pt_moved_via]').val(to_truck);
            $('select[name=pt_position]').val(position);
            $('select[name=pt_moved_from]').val(from_truck);

            caFlash('input[name=PRMAIN_ccduration], input[name=stretcher_purpose_descr], textarea[name=PRMAIN_cc], textarea[name=PRMAIN_hpi], textarea[name=PRMAIN_belongings], textarea[name=scene_description], select[name=PRMAIN_first_on_scene], select[name=PRMAIN_ccdurunits], select[name=pt_moved_via], select[name=pt_position], select[name=pt_moved_from]');
        });
    });
});
