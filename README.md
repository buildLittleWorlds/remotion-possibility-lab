# Remotion Possibility Lab

A 17-page guide for Dr. Plate’s Youth Horizons Level 2A Session 4. Students can browse 30 possibilities, try six original interactive Remotion demos, and follow small ChatGPT/Remotion build prompts.

Public guide: https://buildlittleworlds.github.io/remotion-possibility-lab/

The six projects cover text storytelling, data, captioned audio, footage editing, 3D, and a video-template app. The original Session 4 [Caseflow](https://buildlittleworlds.github.io/caseflow/) remains a separate project.

## Run and edit

Use Node.js 22.13 or newer (Node 22 recommended).

```sh
npm ci
npm run dev
```

The guide opens at http://127.0.0.1:4351/. To preview the six compositions in Studio:

```sh
npm run studio -- --webpack-poll 1000
```

Studio uses http://localhost:4350/. On a macOS sandbox that prevents watchers or Chromium startup, run this in a normal terminal. The guide uses Vite; Studio uses webpack with polling.

Edit `content/lessons.mjs` for lesson text and prompts, `src/compositions/` for demos, and `src/site.css` for the design. `npm run generate` writes all 17 HTML pages. The composition source is shared between Player and Studio. Media is served from the project-relative base path, including on GitHub Pages.

```sh
npm test
npm run build
```

The tests use ffprobe (part of FFmpeg) to check actual media durations. CI installs FFmpeg and publishes `dist/` through GitHub Pages after tests and compilation pass. The public site has no rendering backend, account, telemetry, or student-data collection. The optional planner builds a prompt in the current page; copying it is a separate action.

## Evidence and limits

See `VERIFICATION.md`. The guide and source examples have been checked directly. An isolated source rehearsal is distinct from a fresh ChatGPT conversation; the latter is not claimed as tested. ChatGPT responses and a student’s local setup can vary.

## Assets and attribution

- `public/media/bunny-a.mp4`, `bunny-b.mp4`, and `bunny-c.mp4`: four-second excerpts of **Big Buck Bunny**, from original source intervals 32–36, 43–47, and 61–65 seconds. Trimmed, resized to 960×540, resampled to 30 fps, and muted for this teaching remix. © copyright 2008, Blender Foundation / www.bigbuckbunny.org. [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). [Original license and attribution instructions](https://peach.blender.org/about/). Source video: https://remotion.media/BigBuckBunny.mp4. The isolated soundtrack is not included.
- `public/media/signal.wav`: original sample script synthesized locally using the standard macOS **Samantha** voice at 155 words per minute. It is not a cloned voice and is not Dr. Plate’s voice. Three separately synthesized sentences were combined after removing silence; the provided sentence timestamps correspond to the combined file. Transcript and metadata are included beside the audio.
- `public/media/station-poster.png`: a rendered frame of the original geometric station, provided as a fallback for browsers without WebGL. No external model or texture is used.
- Reading values are authored fictional examples, not student records or a class survey.

Remotion packages are pinned consistently to 4.0.532. Remotion’s own [license terms](https://www.remotion.dev/license) apply to the framework. Third-party media retains its stated license.
