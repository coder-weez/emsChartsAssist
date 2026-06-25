EMSCharts Assist
================

EMSCharts Assist is a free extension for the Chrome browser which allows you to store defaults for emscharts.com patient care reports.


## Disclaimer

This is an independent, unofficial tool. It is **not affiliated with,
endorsed by, or supported by emsCharts, Inc.** "emsCharts" and any related
names are trademarks of their respective owners.

This extension fills patient care report fields with the default values you
configure. **You are responsible for reviewing and verifying every auto-filled
value for accuracy before saving or submitting a report.** It does not
guarantee the correctness or appropriateness of any data it enters. Use at your
own risk; the software is provided "AS IS" without warranty of any kind (see
[LICENSE.txt](LICENSE.txt)).

**HIPAA notice:** This extension does not store, transmit, or process protected
health information (PHI). Only the template default values you manually enter
on the Options page are saved — no patient data, no PCR field values, and
nothing from actual reports is ever read or retained by the extension.
Compliance with HIPAA and your organization's privacy policies remains your
responsibility when using EMSCharts and any tools that interact with it.


> **Manifest V3:** This extension targets Chrome's Manifest V3. Defaults are
> stored in `chrome.storage.sync` and read directly by the content scripts.
> A minimal background service worker handles opening the Options page to the
> correct section when the "Page Defaults" button is clicked. It works on
> current versions of Chrome, which no longer load Manifest V2 extensions.
>
> **Dependencies:** The content scripts use jQuery 3.7.1. The Options page has
> no third-party dependencies — its collapsible sections use native HTML
> `<details>`/`<summary>` (the previous jQuery UI accordion was removed).


## Install from Source

  1. `git clone https://github.com/coder-weez/emsChartsAssist.git`
  2. Open `chrome://extensions/` in your browser
  3. Enable `Developer Mode` in the upper-right corner
  4. Select `Load Unpacked` in the upper-left corner
  5. Find the `emsChartsAssist` folder from the `git clone` step, and open the `src` directory

After loading, right-click the extension icon and choose **Options** to fill in
your default values. These are saved to `chrome.storage.sync`.


## Usage

Open a patient care report on `emscharts.com`. On the supported pages
(page 2, 3, 4, 5, and 8) a teal **AutoComplete** button is added to the toolbar.
Click it to fill the form fields with the defaults you saved in Options.


## How settings are stored

Your defaults are saved with Chrome's built-in
[`chrome.storage.sync`](https://developer.chrome.com/docs/extensions/reference/api/storage)
(the `storage` permission in the manifest). Notes for users and contributors:

  * **Defaults only.** Only the template values you enter on the Options page are
    stored. No patient data and nothing from actual PCRs is ever saved or
    transmitted — the extension has no backend.
  * **Synced across devices.** Because it uses `storage.sync`, your defaults
    follow you to any Chrome where you're signed into the same profile with sync
    enabled (otherwise it behaves like local storage).
  * **Flat key/value layout.** Settings are stored as a single flat object whose
    keys are page-prefixed strings (e.g. `pg2_chief_complaint`, `gcs_motor_1`).
    Values are plain strings — either a field's text or a `<select>` option value.
  * **Size limits.** `storage.sync` allows roughly 100 KB total and ~8 KB per
    item; the short text defaults here stay well within that.
  * **Not encrypted at rest.** Values are stored as-is and are readable by anyone
    with access to the Chrome profile, so avoid putting sensitive information in
    the default fields.

`options.js` writes the values and the page content scripts read them straight
from `chrome.storage.sync` when an AutoComplete button is clicked.

### Back up, restore, or share your defaults

The Options page has **Export defaults** and **Import defaults** buttons:

  * **Export defaults** downloads all of your saved settings as a single
    `emscharts-assist-defaults.json` file.
  * **Import defaults** loads settings from a previously exported file and saves
    them. Only keys the extension recognizes are imported, so an unrelated or
    malformed file is rejected with an error message. Importing overwrites any
    existing value for the same field.

This makes it easy to back up your defaults, move them to another computer, or
share a standard set with colleagues.


## Troubleshooting

If the AutoComplete button doesn't fill anything:

  1. A **"Nothing to fill"** toast will appear if no defaults are configured or all fields already match your defaults — check the Options page to confirm your values are saved.
  2. Make sure you've saved defaults in the **Options** page first.
  2. Open a supported PCR page, then open Chrome's DevTools console
     (right-click the page &rarr; **Inspect** &rarr; **Console**) to check for
     any errors logged by the extension.
  3. Reload the extension after making changes.


## Contributing

  Please report any issues by using the "Issues" tab above.

  The original author is no longer active in EMS. If you're interested in
  maintaining/contributing/testing, see the contact in the project history.
