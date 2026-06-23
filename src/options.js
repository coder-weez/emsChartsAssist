var txtInputs = [
    "pg2_duration",
    "pg2_stretcher_purpose",
    "pg3_neuro_comments",
    "pg4_resp_comments",
    "pg4_cardiac_comments",
    "pg5_head_comments",
    "pg5_neck_comments",
    "pg5_chest_comments",
    "pg5_ap_appearance",
    "pg5_ap_palpation",
    "pg5_ap_bowel_sounds",
    "pg5_ap_findings",
    "pg5_pelvis_comments",
    "pg5_back_comments",
    "pg5_ex_comments",
    "pg5_ex_restraints",
    "pg5_ex_skin_findings"
];
var txtAreas = [
    "pg2_chief_complaint",
    "pg2_hpi",
    "pg2_scene_description",
    "pg2_belongings",
    "pg8_at_ref",
    "pg8_lv_ref",
    "pg8_at_rec",
    "pg8_can_1",
    "pg8_can_2"
];
var selBoxes = [
    "pg2_duration_units",
    "pg2_level_care",
    "pg2_to_truck",
    "pg2_position",
    "pg2_from_truck",
    "pg3_stroke_scale",
    "pg3_gcs_eye",
    "pg3_gcs_verbal",
    "pg3_gcs_motor",
    "pg3_pupil_size_l",
    "pg3_pupil_size_r",
    "pg4_radial_l",
    "pg4_radial_r",
    "pg4_fem_l",
    "pg4_fem_r",
    "pg4_carotid_l",
    "pg4_carotid_r",
    "pg4_dors_l",
    "pg4_dors_r",
    "pg2_to_truck",
    "pg2_duration_units",
    "pg2_first_on_scene"
];

function _all_opts() {
    var opts = {};
    for (var i=0; i<txtInputs.length; i++) {
        opts[ txtInputs[i] ] = "text";
    }
    for (var i=0; i<txtAreas.length; i++) {
        opts[ txtAreas[i] ] = "textarea";
    }
    for (var i=0; i<selBoxes.length; i++) {
        opts[ selBoxes[i] ] = "select";
    }
    return opts;
}

function get_user_values() {
    var vals = {};
    var opts = _all_opts();
    var keys = Object.keys(opts);

    for (var i=0; i < keys.length; i++) {
        var field_id = keys[i];
        var field_type = opts[field_id];
        if (typeof(field_id) == "undefined" || field_id == "undefined") continue;
        console.debug("Getting user value for: " + field_id + "(" + field_type + ")")

        var el = document.getElementById(field_id);

        if (field_type == "text" || field_type == "textarea") {
            vals[field_id] = el.value;
        } else if (field_type == "select") {
            var ch = el.children[el.selectedIndex];
            if (typeof(ch) != "undefined") {
                vals[field_id] = ch.value;
            }
        } else {
            console.warn("Not sure what to do with field " + field_type + ":" + field_id)
        }

    }
    return vals;
}

function show_status(msg, isError) {
    var status = document.getElementById("status");
    status.innerHTML = msg;
    status.className = isError ? "error" : "";
    setTimeout(function() {
        status.innerHTML = "";
        status.className = "";
    }, 2500);
}

function save_options() {
    var values = get_user_values();
    console.info("Saving Values:");
    console.debug(values);

    chrome.storage.sync.set(values, function() {
        show_status("OPTIONS SAVED");
    });
}

function restore_options() {
    console.info("Restoring Options");
    var opts = _all_opts();
    var opt_keys = Object.keys(opts);

    chrome.storage.sync.get(opt_keys, function(items) {
        console.debug(items);
        for (var i=0; i<opt_keys.length; i++) {
            var field_id = opt_keys[i];
            var field_type = opts[field_id];
            var user_val = items[field_id];

            if (field_type == "text" || field_type == "textarea") {
                document.getElementById(field_id).value = (user_val == null ? "" : user_val);

            } else if (field_type == "select") {
                var sbox = document.getElementById(field_id);
                for (var j=0; j<sbox.children.length;j++) {
                    if (sbox.children[j].value == user_val) {
                        sbox.selectedIndex = j;
                        break;
                    }
                }
            } else {
                console.warn("I don't know what to do with " + field_type + ":" + field_id);
            }
        }
    });
}

// Remove any stored keys this extension no longer recognizes (e.g. settings
// left behind by features that were removed), keeping chrome.storage.sync tidy.
// Runs automatically when the Options page loads.
function prune_stale_keys() {
    var opts = _all_opts();
    chrome.storage.sync.get(null, function(items) {
        var stale = Object.keys(items).filter(function(k) {
            return !opts.hasOwnProperty(k);
        });
        if (stale.length) {
            console.info("Removing stale settings:", stale);
            chrome.storage.sync.remove(stale);
        }
    });
}

// Download all saved defaults as a JSON file the user can back up or share.
function export_options() {
    chrome.storage.sync.get(null, function(items) {
        var json = JSON.stringify(items, null, 2);
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "emscharts-assist-defaults.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Load defaults from a previously exported JSON file.
function import_options(ev) {
    var file = ev.target.files[0];
    ev.target.value = "";  // allow re-importing the same file later
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
        var data;
        try {
            data = JSON.parse(reader.result);
        } catch (e) {
            show_status("IMPORT FAILED: NOT VALID JSON", true);
            return;
        }
        if (!data || typeof data != "object") {
            show_status("IMPORT FAILED: UNRECOGNIZED FILE", true);
            return;
        }

        // Only import keys this extension recognizes.
        var opts = _all_opts();
        var values = {};
        var imported = 0;
        Object.keys(data).forEach(function(k) {
            if (opts.hasOwnProperty(k)) {
                values[k] = data[k];
                imported++;
            }
        });

        if (imported == 0) {
            show_status("IMPORT FAILED: NO RECOGNIZED SETTINGS", true);
            return;
        }

        chrome.storage.sync.set(values, function() {
            if (chrome.runtime.lastError) {
                show_status("IMPORT FAILED: " + chrome.runtime.lastError.message, true);
                return;
            }
            restore_options();
            show_status("IMPORTED " + imported + " SETTINGS");
        });
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', prune_stale_keys);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#export').addEventListener('click', export_options);
document.querySelector('#import-btn').addEventListener('click', function() {
    document.getElementById('import-file').click();
});
document.querySelector('#import-file').addEventListener('change', import_options);
