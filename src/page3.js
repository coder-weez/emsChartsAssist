$(document).ready(function() {
    caToolbar().append('<button class="chartfiller ca-btn">AutoComplete</button>');

    $('.chartfiller').click(function() {
        if (!chrome.runtime || !chrome.runtime.id) return;
        chrome.storage.sync.get(null, function(s) {
            var filled = 0;
            filled += caFill('select[name=stroke_scale]', s["stroke_scale"], 'Stroke Scale') ? 1 : 0;
            filled += caFill('select[name=gcs_eye_1]', s["gcs_eye_1"], 'GCS Eye') ? 1 : 0;
            filled += caFill('select[name=gcs_verbal_1]', s["gcs_verbal_1"], 'GCS Verbal') ? 1 : 0;
            filled += caFill('select[name=gcs_motor_1]', s["gcs_motor_1"], 'GCS Motor') ? 1 : 0;
            filled += caFill('[name=pupil_size_l]', s["pg3_pupil_size_l"], 'Pupil Size (L)') ? 1 : 0;
            filled += caFill('[name=pupil_size_r]', s["pg3_pupil_size_r"], 'Pupil Size (R)') ? 1 : 0;
            filled += caFill('[name=pupil_rx_l]', s["pg3_pupil_rx_l"], 'Pupil React (L)') ? 1 : 0;
            filled += caFill('[name=pupil_rx_r]', s["pg3_pupil_rx_r"], 'Pupil React (R)') ? 1 : 0;
            filled += caFill('input[name=head_reactive]', s["pg3_pupil_comments"], 'Pupil Comments') ? 1 : 0;
            filled += caFill('[name=motor_la]', s["pg3_motor_la"], 'Motor (LA)') ? 1 : 0;
            filled += caFill('[name=sensory_la]', s["pg3_sensory_la"], 'Sensory (LA)') ? 1 : 0;
            filled += caFill('[name=motor_ra]', s["pg3_motor_ra"], 'Motor (RA)') ? 1 : 0;
            filled += caFill('[name=sensory_ra]', s["pg3_sensory_ra"], 'Sensory (RA)') ? 1 : 0;
            filled += caFill('[name=motor_ll]', s["pg3_motor_ll"], 'Motor (LL)') ? 1 : 0;
            filled += caFill('[name=sensory_ll]', s["pg3_sensory_ll"], 'Sensory (LL)') ? 1 : 0;
            filled += caFill('[name=motor_rl]', s["pg3_motor_rl"], 'Motor (RL)') ? 1 : 0;
            filled += caFill('[name=sensory_rl]', s["pg3_sensory_rl"], 'Sensory (RL)') ? 1 : 0;
            filled += caFill('input[name=head_sensory]', s["pg3_sensory_comments"], 'Sensory Comments') ? 1 : 0;
            filled += caFill('input[name=motor_comments]', s["pg3_motor_comments"], 'Motor Comments') ? 1 : 0;
            filled += caFill('select[name=AIR_STATUS]', s["pg3_airway_status"], 'Airway Status') ? 1 : 0;
            filled += caFill('textarea[name=AIR_COMMENTS]', s["pg3_airway_comments"], 'Airway Comments') ? 1 : 0;
            filled += caFill('select[name=air_by]', s["pg3_air_by"], 'Airway Performed By') ? 1 : 0;
            filled += caFill('select[name=air_outcome]', s["pg3_air_outcome"], 'Airway Outcome') ? 1 : 0;
            if (!filled) caToast('Nothing to fill — no defaults are set, or all fields already match your defaults.');
        });
    });
});
