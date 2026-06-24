// TOADD:
// Mental Present
// Mental Not Present
// Neuro Present
// Neuro Not Present
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var response = {
                stroke_scale: s["stroke_scale"],
                gcs_eye: s["gcs_eye_1"],
                gcs_verbal: s["gcs_verbal_1"],
                gcs_motor: s["gcs_motor_1"],
                pupil_size_l: s["pg3_pupil_size_l"],
                pupil_size_r: s["pg3_pupil_size_r"],
                pupil_rx_l: s["pg3_pupil_rx_l"],
                pupil_rx_r: s["pg3_pupil_rx_r"],
                pupil_comments: s["pg3_pupil_comments"],
                motor_la: s["pg3_motor_la"],
                sensory_la: s["pg3_sensory_la"],
                motor_ra: s["pg3_motor_ra"],
                sensory_ra: s["pg3_sensory_ra"],
                motor_ll: s["pg3_motor_ll"],
                sensory_ll: s["pg3_sensory_ll"],
                motor_rl: s["pg3_motor_rl"],
                sensory_rl: s["pg3_sensory_rl"],
                sensory_comments: s["pg3_sensory_comments"],
                motor_comments: s["pg3_motor_comments"],
                airway_status: s["pg3_airway_status"],
                airway_comments: s["pg3_airway_comments"],
                air_by: s["pg3_air_by"],
                air_outcome: s["pg3_air_outcome"]
            };

            var stroke_scale = response.stroke_scale;
            var gcs_eye = response.gcs_eye;
            var gcs_verbal = response.gcs_verbal;
            var gcs_motor = response.gcs_motor;
            var pupil_size_l = response.pupil_size_l;
            var pupil_size_r = response.pupil_size_r;
            var pupil_rx_l = response.pupil_rx_l;
            var pupil_rx_r = response.pupil_rx_r;
            var pupil_comments = response.pupil_comments;
            var motor_la = response.motor_la;
            var sensory_la = response.sensory_la;
            var motor_ra = response.motor_ra;
            var sensory_ra = response.sensory_ra;
            var motor_ll = response.motor_ll;
            var sensory_ll = response.sensory_ll;
            var motor_rl = response.motor_rl;
            var sensory_rl = response.sensory_rl;
            var sensory_comments = response.sensory_comments;
            var motor_comments = response.motor_comments;
            var airway_status = response.airway_status;
            var airway_comments = response.airway_comments;
            var air_by = response.air_by;
            var air_outcome = response.air_outcome;

            caFill('select[name=stroke_scale]', stroke_scale, 'Stroke Scale');
            caFill('select[name=gcs_eye_1]', gcs_eye, 'GCS Eye');
            caFill('select[name=gcs_verbal_1]', gcs_verbal, 'GCS Verbal');
            caFill('select[name=gcs_motor_1]', gcs_motor, 'GCS Motor');
            caFill('[name=pupil_size_l]', pupil_size_l, 'Pupil Size (L)');
            caFill('[name=pupil_size_r]', pupil_size_r, 'Pupil Size (R)');
            caFill('[name=pupil_rx_l]', pupil_rx_l, 'Pupil React (L)');
            caFill('[name=pupil_rx_r]', pupil_rx_r, 'Pupil React (R)');
            caFill('input[name=head_reactive]', pupil_comments, 'Pupil Comments');
            caFill('[name=motor_la]', motor_la, 'Motor (LA)');
            caFill('[name=sensory_la]', sensory_la, 'Sensory (LA)');
            caFill('[name=motor_ra]', motor_ra, 'Motor (RA)');
            caFill('[name=sensory_ra]', sensory_ra, 'Sensory (RA)');
            caFill('[name=motor_ll]', motor_ll, 'Motor (LL)');
            caFill('[name=sensory_ll]', sensory_ll, 'Sensory (LL)');
            caFill('[name=motor_rl]', motor_rl, 'Motor (RL)');
            caFill('[name=sensory_rl]', sensory_rl, 'Sensory (RL)');
            caFill('input[name=head_sensory]', sensory_comments, 'Sensory Comments');
            caFill('input[name=motor_comments]', motor_comments, 'Motor Comments');
            caFill('select[name=AIR_STATUS]', airway_status, 'Airway Status');
            caFill('textarea[name=AIR_COMMENTS]', airway_comments, 'Airway Comments');
            caFill('select[name=air_by]', air_by, 'Airway Performed By');
            caFill('select[name=air_outcome]', air_outcome, 'Airway Outcome');
        });
    });
});