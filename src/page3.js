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
                gcs_motor: s["pg3_gcs_motor"]
            };

            var neuro_comments = response.neuro_comments;
            var stroke_scale = response.stroke_scale;
            var gcs_eye = response.gcs_eye;
            var gcs_verbal = response.gcs_verbal;
            var gcs_motor = response.gcs_motor;

            $('input[name=head_findings]').val(neuro_comments);
            $('select[name=stroke_scale]').val(stroke_scale);
            $('select[name=gcs_eye_1]').val(gcs_eye);
            $('select[name=gcs_verbal_1]').val(gcs_verbal);
            $('select[name=gcs_motor_1]').val(gcs_motor);

            caFlash('input[name=head_findings], select[name=stroke_scale], select[name=gcs_eye_1], select[name=gcs_verbal_1], select[name=gcs_motor_1]');
        });
    });
});