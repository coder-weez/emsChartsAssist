Chartfiller
===========

Chartfiller is a free extension for the Chrome browser which allows you to store defaults for emscharts.com patient care reports.

> **Manifest V3:** This extension has been migrated to Chrome's Manifest V3.
> The background page is now a service worker, defaults are stored in
> `chrome.storage.sync`, and the legacy `chrome.extension` messaging APIs have
> been replaced with `chrome.runtime`. It works on current versions of Chrome,
> which no longer load Manifest V2 extensions.


## Install from Source

  1. `git clone git@github.com:cmattoon/chartfiller.git`
  2. Open `chrome://extensions/` in your browser
  3. Enable `Developer Mode` in the upper-right corner
  4. Select `Load Unpacked` in the upper-left corner
  5. Find the `chartfiller` folder from the `git clone` step, and open the `src` directory

After loading, right-click the extension icon and choose **Options** to fill in
your default values. These are saved to `chrome.storage.sync`.


## Usage

Open a patient care report on `emscharts.com`. On the supported pages
(page 2, 3, 4, 5, and 8) a red **AutoComplete** button is added to the header.
Click it to fill the form fields with the defaults you saved in Options.


## Troubleshooting

If the AutoComplete button doesn't fill anything:

  1. Make sure you've saved defaults in the **Options** page first.
  2. Open `chrome://extensions/`, find Chartfiller, and click the
     **service worker** link under "Inspect views" to view background errors.
  3. Reload the extension after making changes.


## Contributing

  Please report any issues by using the "Issues" tab above.

  The original author is no longer active in EMS. If you're interested in
  maintaining/contributing/testing, see the contact in the project history.
