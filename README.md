# Songsterr Auto-Continue

A small Manifest V3 extension for Brave and other Chromium browsers. It
automatically clicks the continue link in Songsterr's sync interruption panel.

## Installation

1. Download this repository using **Code → Download ZIP** and extract it, or
   clone it with Git.
2. Open `brave://extensions` in Brave or `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder containing `manifest.json`.
5. Reload any open Songsterr tabs.

The extension runs automatically on subsequent visits and browser restarts.
Keep the extracted folder in place; the browser loads the extension from it.
No build step, npm install, or store account is required.

## Updating or disabling

Run `git pull` in the cloned repository, or download a new ZIP and replace the
files in the folder the browser already loads. Click the extension's **Reload**
button on the extensions page, then reload any open Songsterr tabs.

To disable the extension, turn it off on the extensions page and reload
Songsterr.

## Changelog

### 1.1.1

- Restored automatic continuation after Songsterr began requiring trusted clicks
  on the **Continue with sync pauses** link.
- The extension now calls Songsterr's existing continue handler directly and
  requires the same browser permissions as before.

## How it works

Every **100 ms**, the script looks for `.w_eHuW_continueLink` and checks whether
its first element child is visible. Songsterr's current sync dialog ignores
synthetic clicks, so the script runs in the page's JavaScript context and calls
the existing Preact handler on the dialog's continue link directly. If that
handler is unavailable, the script tries a normal DOM click.

There is one interval, with no mutation observer, extra retry timers, or injected
CSS. A link that is not ready on one check can be clicked on the next check.

The nominal polling delay is 0–100 ms, about 50 ms on average for a panel that
appears at a random point between checks. Browser scheduling, background-tab
throttling, and Songsterr's own animations can add delay. The extension does not
change those animations.

To adjust the interval, edit `CHECK_INTERVAL_MS` in `songsterr_script.js`, reload
the extension, and then reload Songsterr.

## Scope and privacy

- Runs only in the main document on `https://songsterr.com/*` and
  `https://www.songsterr.com/*`.
- Uses the existing continue link; it does not unlock other paid features.
- Does not collect or transmit data, load remote code, or use background services.
- Needs no additional extension permissions beyond access to the matching pages
  declared in the manifest.

This is an independent project and is not affiliated with Songsterr.

## Maintenance

Songsterr's class names, HTML structure, and internal Preact listener storage can
change. If the extension stops working, inspect the continue link and its click
handler in `songsterr_script.js`.

When reporting a problem on GitHub, include your browser version, extension
version, the Songsterr page URL, and whether you are using original or synth
audio. Describe whether the link is clicked at all or the panel just closes
slowly.

## Project files

- `manifest.json` — extension metadata and matching websites.
- `songsterr_script.js` — the 100-ms polling loop.
- `.gitignore` — excludes local files and generated artifacts.

To check JavaScript syntax with Node.js:

```sh
node --check songsterr_script.js
```

To verify behavior in Brave, load the extension, reload Songsterr, and play a
song long enough for the interruption panel to appear. Repeat after changing
songs. Confirm that the panel closes and playback continues.

## License

No license has been selected yet.
