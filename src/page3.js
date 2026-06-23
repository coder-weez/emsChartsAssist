// TOADD:
// Mental Present
// Mental Not Present
// Neuro Present
// Neuro Not Present
// Pupils L/R Size -- dropdown
// Pupils L/R React -- dropdown
// Comments
// Motor & Sensory
// Sensor & Motor comment boxes
// Airway Status
// Airway Comments (NOT EXAM)
// Performed By
// Outcome
$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.storage.sync.get(null, function(s) {
            var response = {
                neuro_comments: s["pg3_neuro_comments"], // delete
                stroke_scale: s["pg3_stroke_scale"],
                gcs_eye: s["pg3_gcs_eye"],
                gcs_verbal: s["pg3_gcs_verbal"],
                gcs_motor: s["pg3_gcs_motor"],
                pupil_size_l: s["pg3_pupil_size_l"],
                pupil_size_r: s["pg3_pupil_size_r"],
                pupil_rx_l: s["pg3_pupil_rx_l"],
                pupil_rx_r: s["pg3_pupil_rx_r"],
                pupil_comments: s["pg3_pupil_comments"],
                sensory_comments: s["pg3_sensory_comments"],
                motor_comments: s["pg3_motor_comments"],
                motor_la: s["pg3_motor_la"],
                sensory_la: s["pg3_sensory_la"],
                motor_ra: s["pg3_motor_ra"],
                sensory_ra: s["pg3_sensory_ra"],
                motor_ll: s["pg3_motor_ll"],
                sensory_ll: s["pg3_sensory_ll"],
                motor_rl: s["pg3_motor_rl"],
                sensory_rl: s["pg3_sensory_rl"]
            };

            var neuro_comments = response.neuro_comments;
            var stroke_scale = response.stroke_scale;
            var gcs_eye = response.gcs_eye;
            var gcs_verbal = response.gcs_verbal;
            var gcs_motor = response.gcs_motor;
            var pupil_size_l = response.pupil_size_l;
            var pupil_size_r = response.pupil_size_r;
            var pupil_rx_l = response.pupil_rx_l;
            var pupil_rx_r = response.pupil_rx_r;
            var pupil_comments = response.pupil_comments;
            var sensory_comments = response.sensory_comments;
            var motor_comments = response.motor_comments;
            var motor_la = response.motor_la;
            var sensory_la = response.sensory_la;
            var motor_ra = response.motor_ra;
            var sensory_ra = response.sensory_ra;
            var motor_ll = response.motor_ll;
            var sensory_ll = response.sensory_ll;
            var motor_rl = response.motor_rl;
            var sensory_rl = response.sensory_rl;

            caFill('input[name=head_findings]', neuro_comments, 'Neuro Comments');
            caFill('select[name=stroke_scale]', stroke_scale, 'Stroke Scale');
            caFill('select[name=gcs_eye_1]', gcs_eye, 'GCS Eye');
            caFill('select[name=gcs_verbal_1]', gcs_verbal, 'GCS Verbal');
            caFill('select[name=gcs_motor_1]', gcs_motor, 'GCS Motor');
            caFill('[name=pupil_size_l]', pupil_size_l, 'Pupil Size (L)');
            caFill('[name=pupil_size_r]', pupil_size_r, 'Pupil Size (R)');
            caFill('[name=pupil_rx_l]', pupil_rx_l, 'Pupil React (L)');
            caFill('[name=pupil_rx_r]', pupil_rx_r, 'Pupil React (R)');
            caFill('input[name=head_reactive]', pupil_comments, 'Pupil Comments');
            caFill('[name=motor_la]', motor_la, 'Motor LA');
            caFill('[name=sensory_la]', sensory_la, 'Sensory LA');
            caFill('[name=motor_ra]', motor_ra, 'Motor RA');
            caFill('[name=sensory_ra]', sensory_ra, 'Sensory RA');
            caFill('[name=motor_ll]', motor_ll, 'Motor LL');
            caFill('[name=sensory_ll]', sensory_ll, 'Sensory LL');
            caFill('[name=motor_rl]', motor_rl, 'Motor RL');
            caFill('[name=sensory_rl]', sensory_rl, 'Sensory RL');
            caFill('input[name=head_sensory]', sensory_comments, 'Sensory Comments');
            caFill('input[name=motor_comments]', motor_comments, 'Motor Comments');
        });
    });
});