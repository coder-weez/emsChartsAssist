# EMSCharts Assist — Claude Code Guide

> **Keep this file and `README.md` up to date.** When behaviour, architecture, or helper APIs change, update both documents in the same commit. CLAUDE.md is the technical reference for contributors and AI assistants; README.md is the user-facing reference. Neither should drift from the actual code.

## What this project is

A Chrome MV3 extension that injects an **AutoComplete** toolbar button into EMSCharts PCR pages. Clicking it reads user-configured defaults from `chrome.storage.sync` and fills in matching form fields. No patient data is ever stored or transmitted.

## Architecture

```
src/
  manifest.json      — MV3 manifest; declares content scripts per page
  background.js      — Service worker; opens options tab with page anchor
  chartassist.js     — Shared helpers loaded before every page script
  options.html/.js   — Settings UI; saves defaults to chrome.storage.sync
  page2.js           — Content script for EMSCharts page 2 (dispatch/HPI)
  page3.js           — Content script for page 3 (neuro/airway)
  page4.js           — Content script for page 4 (cardiac/respiratory)
  page5.js           — Content script for page 5 (physical exam)
  page8.js           — Content script for page 8 (billing/narrative)
```

Page 5 and page 8 both use **multiple preset buttons** instead of a single AutoComplete button. Page 5 has Trauma / Medical / Refusal; page 8 has On Scene / Transport / At Hospital / Refusal / Custom. Storage keys for page 5 follow the pattern `pg5_{category}_{fieldName}` (e.g. `pg5_trauma_head_comments`). The Options page shows three sub-tables within the single `<details id="section-page5">` block.

```
```

Each page script is injected only on its matching EMSCharts URL (defined in `manifest.json`). All page scripts share `chartassist.js` via the `"js"` array in the manifest content script entry.

## Key shared helpers (`chartassist.js`)

### `caFill(selector, value, friendlyName)`
Standard field filler. Handles text inputs, textareas, and selects. Returns `true` if anything visible happened (fill or toast), `false` for silent no-ops (no element, no value, or field already exactly matches the default).

- **Text/textarea**: reads current value with `el[0].value` (not `.val()` — EMSCharts textarea state can desync with jQuery). Appends if non-empty and value not already present (`indexOf` check). Shows toast on append.
- **Select**: skips silently if current value matches `value`. Shows toast if a *different* value is already selected. Blank values treated as empty: `null`, `""`, `"0"`, `"null"` (the string — used by GCS/stroke scale blank options).
- Calls `caFlash` on success.

### `caFillPopup(fieldName, value, friendlyName)`
For EMSCharts **popup multi-select** fields — these have no `<select>` element. The pattern is:
- Hidden input: `input[name="{fieldName}_text"]` — stores the text label
- Display span: `#{fieldName}_htmlid` — shows the selected text
- An ADD+ button (`[name="add"]`) that EMSCharts normally hides after a popup save

`caFillPopup` targets the hidden input, sets it via `el[0].value`, triggers `change`, updates the display span, and hides the ADD+ button. Silently skips if `current === value` (case-insensitive). Shows toast if a different value is already present. Returns `true` if anything visible happened, `false` for silent no-ops — same contract as `caFill`.

**Important:** popup fields store **text labels**, not numeric IDs. Options in `options.html` for popup fields must use `value="Stretcher"` not `value="4880"`.

### `caToast(message)` / `caFlash(selector)`
- Toast: yellow stacking notification, 6s, `⚠` prefix via CSS `::before`. Stacks vertically.
- Flash: brief green background pulse on filled elements. Sets an inline `transition` style then clears both `transition` and `background-color` after the animation completes, leaving no residual inline styles.

### `caToolbar()`
Creates (once) a fixed-position draggable toolbar. Appends a "Page Defaults" button that sends `{ action: 'openOptions', page: N }` to the background service worker, which opens the options page scrolled to `#section-pageN`.

## Extension context guard
All click handlers in page scripts must guard against extension reload:
```js
if (!chrome.runtime || !chrome.runtime.id) return;
```

## Options system (`options.js`)

Fields are declared in three arrays at the top of `options.js`:
- `txtInputs` — `<input type="text">` fields
- `txtAreas` — `<textarea>` fields
- `selBoxes` — `<select>` fields (includes popup fields, stored as selects in options UI)

Storage keys follow the pattern `pg{N}_{fieldName}` (e.g. `pg2_chief_complaint`, `pg3_airway_status`).

`prune_stale_keys()` runs on options load and removes any stored keys not in the current field lists — keeps storage tidy after fields are renamed or removed.

## EMSCharts popup multi-select field names (page 2)
| Friendly name          | `caFillPopup` fieldName  | Hidden input selector              |
|------------------------|--------------------------|------------------------------------|
| Moved to Vehicle Via   | `pt_moved_via`           | `input[name="pt_moved_via_text"]`  |
| Position in Vehicle    | `pt_position`            | `input[name="pt_position_text"]`   |
| Moved From Vehicle Via | `pt_moved_from_multi`    | `input[name="pt_moved_from_multi_text"]` |
| Transport Assessment   | `transassess`            | `input[name="transassess_text"]`   |

## Adding a new field — checklist
1. **`options.html`**: add a `<tr>` with a label and the appropriate input/select/textarea. Use `id="pg{N}_{fieldName}"`.
2. **`options.js`**: add the key to `txtInputs`, `txtAreas`, or `selBoxes`.
3. **`page{N}.js`**: add a `caFill` or `caFillPopup` call inside the `chrome.storage.sync.get` callback, reading directly from `s["pg{N}_{fieldName}"]`.
4. For popup fields: use text-label option values in `options.html`, not numeric IDs.

## Common pitfalls
- **Wrong element type**: EMSCharts popup fields have no `<select>` — use `caFillPopup`, not `caFill`.
- **Text vs numeric values**: standard selects use numeric IDs (e.g. `"1240"` for Minutes); popup fields use text labels (e.g. `"Stretcher"`). Check the actual EMSCharts DOM before adding options.
- **jQuery `.val()` unreliable for read-back**: always use `el[0].value` to read current content of text inputs and textareas.
- **`"null"` string**: GCS and stroke scale blank options use `value="null"` (the string) — this is treated as blank in `caFill`.
- **Background service worker required for `chrome.tabs`**: content scripts cannot call `chrome.tabs.create`. Send a message to `background.js` instead.
