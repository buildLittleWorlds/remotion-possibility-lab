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

Public site, GitHub deployment, and Classroom readback will be recorded after release. No student submissions are part of this repository.
