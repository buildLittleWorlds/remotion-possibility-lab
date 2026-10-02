# Verification record — October 2, 2026

## Completed local checks

- Five behavior tests passed: bounded chart values; caption/text/media timing; actual four-second media and overlap accounting; deterministic camera positions; 17 pages with valid local links and 30 ideas.
- Beginning, midpoint, and final stills rendered for all six compositions: 18 frame checks. Midpoint frames were visually inspected. The station fallback was rendered separately.
- Story input changes, dataset changes, caption-style changes, montage order and transition changes, camera/rotation controls, template inputs, and empty-name feedback were checked in the browser.
- Montage boundary A → B was checked at frames 119 and 120. Crossfade midpoint was inspected after changing order to CBA; displayed duration and starts were 10.8 seconds and 0/3.4/6.8 seconds.
- Player seek and reset behavior, long titles, the 3D still selector, and returning from a still to an interactive preview were checked.
- All 17 pages were opened at desktop and 390px phone widths. No horizontal overflow was detected. Mobile navigation starts collapsed. The mobile audio preview and planner were visually inspected.
- Prompt copying matched the source text. The three-field planner produced the intended contextual starter. Gallery filtering displayed five matching ideas out of thirty.
- All six source compositions compiled independently in separate temporary project folders. This is a source rehearsal, not a fresh ChatGPT conversation.
- Studio mounted all six composition registrations. Every composition was selected and read back through Studio’s tools; each reported no error overlay.

- Clean npm installation in a separate temporary folder passed all five tests and the full 17-page production build. All 24 external source links returned HTTP 200.

## Material limits

A fresh student ChatGPT/Remotion conversation has not been run through all eighteen build prompts. The guide does not promise a particular model response or completion time. The actual compositions, supplied assets, prompts, and preview behavior have been checked as described above.

## Publication

GitHub Pages deployment succeeded: [workflow run 37013587482](https://github.com/buildLittleWorlds/remotion-possibility-lab/actions/runs/37013587482). All 34 hosted build files matched the checked local build by SHA-256, including all 17 pages and every bundled media file. All six public demos were opened and inspected at their midpoint, with no browser error logs.

The new “Session 4 — Six ways to create with Remotion” Material was posted under Level 2A Session 4 for all students. The permanent Material page was reopened and its title, exact description, and published guide attachment were read back. Classwork showed exactly one matching title under Session 4, alongside the existing Latin lesson and assignment. No student submissions are part of this repository.


## Getting-started addition — October 2, 2026

- Added two linked beginner walkthroughs, bringing the site to 19 HTML pages while retaining the 17 lesson routes and numbering.
- Both routes specify the same FirstPoem composition: four original lines, 240 frames at 30 fps, 1280×720, with each line assigned 60 frames.
- All 13 distinct PowerShell command blocks parsed without errors in PowerShell 7.6.5 on macOS. This checks syntax; it is not a Windows installation test.
- The exact create-video starter was run in a temporary local folder. Its generated project, two-file poem implementation, TypeScript check, and Remotion bundle were rehearsed locally. Stills at frames 30, 90, 150, and 210 were rendered, and the first and final lines were visually inspected.
- The current starter’s Git requirement was confirmed in its implementation. Node/Git installs, fresh-terminal checks, and source-copy steps are included.
- Select-text followed by the operating-system copy shortcut was verified to preserve the complete command block. Programmatic clipboard writes in the embedded browser did not update the OS clipboard during this pass; the explicit select-text control supplies a working fallback.
- The homepage and both setup guides were checked at desktop and 390px phone widths with no horizontal overflow. Both command and prompt selection followed by the native copy shortcut matched the full source text.
- Windows WinGet installation and a fresh student ChatGPT conversation remain untested.
