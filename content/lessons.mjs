export const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const link = (url, label) =>
  `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`;
const prompt = (title, text, note = "") =>
  `<section class="prompt"><div class="prompt-top"><h3>${title}</h3><button type="button" data-copy>Copy prompt</button></div><pre><code>${escape(text)}</code></pre>${note ? `<p class="prompt-note">${note}</p>` : ""}</section>`;
const callout = (title, text) =>
  `<aside class="callout"><h2>${title}</h2><p>${text}</p></aside>`;
const sources = (items) =>
  `<div class="sources"><h2>Follow the real examples</h2><ul>${items.map(([url, title]) => `<li>${link(url, title)}</li>`).join("")}</ul></div>`;
const relatives = (items) =>
  `<section><h2>This could also become…</h2><div class="possibilities">${items.map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`).join("")}</div></section>`;
const check = (q, a) =>
  `<details class="check"><summary>${q}</summary><p>${a}</p></details>`;
const demo = (kind) =>
  `<div id="demo-root" data-demo="${kind}"></div><noscript><p>The explanation works without JavaScript. Enable JavaScript to use the interactive Remotion preview.</p></noscript>`;
const repair = `@Remotion Fix only this problem in my current project: [describe what I saw, or attach a screenshot]. Keep the working parts. Tell me what you changed, reopen the preview, and give me one specific check before we continue.`;
const exportPrompt = `@Remotion I have reviewed this composition and now want an MP4. Keep its current inputs, dimensions, duration, and frame rate. Check that its media files are available, render it, and tell me exactly where the MP4 was saved. Help me check the beginning, transitions, audio if present, and ending.`;
const finish = (extra = "") =>
  `${extra}${prompt("A focused repair", repair)}<details class="export"><summary>Optional: ask for an MP4 after you have checked the preview</summary><p>A preview is the composition running in a player. An MP4 is a separate exported file. Ask for export only when you want that file; the guide itself does not render it for you.</p>${prompt("Export the version you reviewed", exportPrompt)}</details>`;
export const projects = [
  {
    id: "story",
    n: "01",
    title: "Tell a story with moving words",
    short: "Animated storytelling",
    explore: "02-story-explore.html",
    build: "03-story-build.html",
    color: "coral",
    icon: "Aa",
    description:
      "Turn a few lines into a trailer, poem, invitation, or visual story.",
  },
  {
    id: "data",
    n: "02",
    title: "Let a dataset become a video",
    short: "Data stories",
    explore: "04-data-explore.html",
    build: "05-data-build.html",
    color: "green",
    icon: "▥",
    description:
      "Let values, labels, and a question shape an animated explanation.",
  },
  {
    id: "audio",
    n: "03",
    title: "Make a sound visible",
    short: "Captioned audio",
    explore: "06-audio-explore.html",
    build: "07-audio-build.html",
    extend: "08-audio-test.html",
    color: "purple",
    icon: "≋",
    description:
      "Give a recording a visual home, synchronized captions, and a waveform.",
  },
  {
    id: "montage",
    n: "04",
    title: "Make a new edit from existing footage",
    short: "Footage montages",
    explore: "09-montage-explore.html",
    build: "10-montage-build.html",
    extend: "11-montage-test.html",
    color: "gold",
    icon: "▶",
    description:
      "Choose moments, rearrange them, and see what a transition changes.",
  },
  {
    id: "station",
    n: "05",
    title: "Build a world and move through it",
    short: "A miniature 3D world",
    explore: "12-3d-explore.html",
    build: "13-3d-build.html",
    extend: "14-3d-test.html",
    color: "blue",
    icon: "◇",
    description:
      "Create a geometric model, light it, and give its camera a path.",
  },
  {
    id: "maker",
    n: "06",
    title: "Build an app that makes videos",
    short: "A video-making app",
    explore: "15-app-explore.html",
    build: "16-app-build.html",
    color: "pink",
    icon: "↗",
    description:
      "Reuse one composition with different words, colors, or input records.",
  },
];
const cards = () =>
  `<div class="project-grid">${projects.map((p) => `<a class="project-card ${p.color}" href="${p.explore}"><div class="card-top"><span>${p.n} / EXPLORE + BUILD</span><span class="card-icon" aria-hidden="true">${p.icon}</span></div><h2>${p.short}</h2><p>${p.description}</p><span class="card-link">Try the demo <span aria-hidden="true">↗</span></span></a>`).join("")}</div>`;
const ideas = [
  ["story", "Book trailer", "Hint at a story without giving away its ending."],
  [
    "story",
    "Animated poem",
    "Use timing to change how a line is heard or read.",
  ],
  ["story", "Title sequence", "Introduce a fictional show through typography."],
  [
    "story",
    "Lyric video",
    "Let verified lyrics meet their musical timestamps.",
  ],
  ["story", "Logo reveal", "Animate an original symbol into view."],
  ["data", "Reading recap", "Turn a small reading log into a visible summary."],
  ["data", "Sports graphic", "Animate a scoreboard or a season comparison."],
  ["data", "Bar-chart race", "Watch values and ranks change over time."],
  [
    "data",
    "Weather bulletin",
    "Give supplied weather records a clear visual story.",
  ],
  [
    "data",
    "Research comparison",
    "Show a carefully labeled result and its limits.",
  ],
  ["audio", "Podcast excerpt", "Make a short audio passage watchable."],
  [
    "audio",
    "Oral-history clip",
    "Keep a speaker’s words visible beside their voice.",
  ],
  [
    "audio",
    "Music visualization",
    "Let real audio samples drive shapes or light.",
  ],
  [
    "audio",
    "Language listening card",
    "Pair a reviewed phrase with audio and text.",
  ],
  [
    "audio",
    "Captioned short",
    "Give an existing spoken clip readable captions.",
  ],
  [
    "montage",
    "Photo documentary",
    "Sequence photographs, captions, and gentle camera moves.",
  ],
  ["montage", "Travel diary", "Edit selected moments into a short memory."],
  [
    "montage",
    "Product walkthrough",
    "Combine screen recordings with explanatory overlays.",
  ],
  [
    "montage",
    "Sports highlights",
    "Trim and arrange footage you have permission to use.",
  ],
  [
    "montage",
    "Picture-in-picture lesson",
    "Keep an explanation beside its evidence.",
  ],
  [
    "station",
    "Historical map",
    "Show a route, movement, or changing boundary.",
  ],
  [
    "station",
    "3D object tour",
    "Inspect a model from several camera positions.",
  ],
  [
    "station",
    "Particle artwork",
    "Build a field of shapes that changes with time.",
  ],
  [
    "station",
    "Process diagram",
    "Reveal how parts connect or steps follow each other.",
  ],
  [
    "station",
    "Game-world teaser",
    "Introduce a made-up place, object, or character.",
  ],
  ["maker", "Personalized recap", "Use one template for many input records."],
  [
    "maker",
    "Learning app",
    "Let a learner replay an explanation with a choice.",
  ],
  ["maker", "Video editor", "Let people select clips and arrange a timeline."],
  ["maker", "Code walkthrough", "Reveal changes or steps in a piece of code."],
  [
    "maker",
    "Announcement generator",
    "Give each club or event its own version.",
  ],
];
const gallery = () =>
  `<section id="idea-gallery"><p class="eyebrow">THIRTY POSSIBILITIES / SIX STARTING POINTS</p><h2 class="section-title">What could you make?</h2><p>These are project ideas informed by Remotion’s examples and resources. The six demos in this guide are small original teaching examples; a gallery idea is not a promise that one prompt produces a finished project.</p><div class="filters" role="group" aria-label="Filter project ideas"><button data-filter="all" aria-pressed="true">All 30</button>${projects.map((p) => `<button data-filter="${p.id}" aria-pressed="false">${p.short}</button>`).join("")}</div><div class="idea-grid">${ideas.map(([category, title, body]) => `<article class="idea" data-category="${category}"><p class="eyebrow">${projects.find((p) => p.id === category).short}</p><h3>${title}</h3><p>${body}</p><a href="${projects.find((p) => p.id === category).explore}">A place to start →</a></article>`).join("")}</div>${sources(
    [
      [
        "https://www.remotion.dev/docs/resources",
        "Remotion’s templates, full projects, and examples",
      ],
      ["https://www.remotion.dev/templates", "Official starter templates"],
      ["https://www.remotion.dev/showcase", "Remotion’s showcase"],
    ],
  )}</section>`;
const starter = `@Remotion I’m new to Remotion and to making videos with code. Help me start a small Remotion project in a new folder for this idea: [my idea]. Check what my computer needs before installing project dependencies. Explain the next step in ordinary words. Open a working Studio preview, and stop so I can inspect it. Do not render an MP4 yet.`;
const startBody = `<div class="hero"><p class="eyebrow">DR. PLATE’S LEVEL 2A / SESSION 4</p><h1>Make time<br> <em>visible.</em></h1><p class="hero-sub">Six different ways to create with Remotion.<br>Try a small example. Imagine a bigger possibility.</p><div class="hero-actions"><a class="button primary" href="getting-started.html">Getting started with Remotion + ChatGPT →</a><a class="button" href="02-story-explore.html">Try a story demo →</a><a class="button" href="#idea-gallery">Browse all 30 ideas ↓</a></div><div class="hero-note"><span>17 lesson pages + 2 setup guides</span><span>6 working demos</span><span>One idea at a time</span></div></div>
<section class="opening"><h2>You have already seen one possibility.</h2><p>In <a href="https://buildlittleworlds.github.io/caseflow/">Caseflow</a>, a Latin sentence becomes an explanation you can pause, replay, and rearrange. Remotion supplies a way to describe what appears at each frame. The plugin helps ChatGPT build with that framework.</p><p>Now widen the view: the same basic approach can tell a story, show data, present sound, edit footage, move through a 3D scene, or power a video-making app. Browse first. You do not need to build all six projects.</p></section>
${cards()}<section class="two-up"><article><h2>Explore in your browser</h2><p>The demos are ready to try. Press Play, pause, or drag the timeline. Change an input and predict what will happen. No plugin or local setup is needed to explore this guide.</p></article><article><h2>Build in your own conversation</h2><p>Choose a project’s Build page. Use one prompt at a time in ChatGPT desktop with the Remotion plugin available. Look at the result before adding the next feature. You own the topic, the judgments, and the next step.</p></article></section>
${callout("Preview, input, export: three different things", "A <strong>preview</strong> runs the composition so you can inspect it. An <strong>input</strong> changes the information the same composition receives. An <strong>export</strong> creates a separate file, such as an MP4. Moving the timeline or changing a title does not export a video.")}
<details class="setup" id="setup"><summary>Before you use the build prompts</summary><p>New to Remotion? Follow <a href="getting-started.html">Getting started with Remotion and ChatGPT</a> for your first poem, or <a href="windows-without-plugin.html">the Windows PowerShell route without the plugin</a>.</p><ol><li>Open the Plugins directory in ChatGPT desktop. Find Remotion and install it if your account offers it. Open a new project conversation with an empty folder selected.</li><li>Select Remotion from the @ menu, or start your request with <code>@Remotion</code>. If it is unavailable in your current surface, use the supported desktop project/Codex route described in Remotion’s instructions.</li><li>Ask the assistant to check the project setup. The plugin and the project’s Remotion packages are separate: installing a plugin does not install a project’s dependencies.</li><li>Open the working preview. You should be able to play and inspect an animation before asking for the next feature.</li></ol>${prompt("A setup conversation you can adapt", starter)}<p>These prompts assume you are continuing in that project conversation. You can ask for explanations in your own words. If setup is blocked, explore the ready-made demos and bring the exact message to Dr. Plate.</p>${sources(
  [
    [
      "https://learn.chatgpt.com/docs/plugins",
      "Official ChatGPT plugin instructions",
    ],
    [
      "https://www.remotion.dev/docs/ai/codex-plugin",
      "Remotion’s desktop plugin route",
    ],
    ["https://www.remotion.dev/docs/the-fundamentals", "Remotion fundamentals"],
  ],
)}</details>${gallery()}`;
const buildIntro = `<p class="lead">Use one prompt, inspect its preview, then continue. Keep the same project conversation so each step adds to the version you have already checked.</p><p>If you have not started a project yet, read <a href="getting-started.html">the getting-started walkthrough</a>. You can replace the example topic after you understand the small working version.</p>`;
const pages = [
  {
    file: "index.html",
    title: "Remotion Possibility Lab",
    label: "Start here",
    stage: "START HERE",
    body: startBody,
    home: true,
  },
];
function add(project, stage, file, title, body) {
  pages.push({ file, title, label: title, stage, project: project.id, body });
}
add(
  projects[0],
  "EXPLORE",
  projects[0].explore,
  "Tell a story with moving words",
  `<p class="lead">A trailer can begin with three sentences and a question. Here, typography and timing carry a fictional message from Mars.</p><p>Press Play once. Then change the opening headline and compare the two motion styles. You are changing a <em>composition</em>—a reusable description of what should appear over time.</p>${demo("story")}<section><h2>What to notice</h2><p>The story has three four-second scenes. The first draws you in, the second creates uncertainty, and the third asks you to imagine a response. The energetic version adds a small settling movement; the words and scene lengths remain the same.</p><p>At 30 frames per second, four seconds is 120 frames. The frame number determines which sentence is visible. Scrub backward: you should recover the same scene rather than create a new story.</p></section>${check("Does faster motion automatically make a better trailer?", "No. Motion can emphasize an entrance, but it can also compete with reading. Choose it for an audience and a purpose. Try both versions without changing the words.")}${relatives(
    [
      [
        "Animated poem",
        "Reveal a line at a time and give each line room to be read.",
      ],
      ["Book trailer", "Keep a question open while introducing the setting."],
      [
        "Title sequence",
        "Let shapes, typography, and rhythm introduce an original story.",
      ],
    ],
  )}${sources([
    [
      "https://www.remotion.dev/docs/the-fundamentals",
      "Frames and compositions",
    ],
    [
      "https://www.remotion.dev/docs/interpolate",
      "Changing values over a frame interval",
    ],
  ])}`,
);
add(
  projects[0],
  "BUILD",
  projects[0].build,
  "Build your text trailer",
  `${buildIntro}<div class="sample"><h2>Your starting material</h2><p>Opening: <strong>A message from Mars</strong><br>Middle: <strong>Someone is listening.</strong><br>Ending: <strong>What will you send back?</strong></p><p>This is an invented story, not a claim about an actual transmission.</p></div>${prompt("1 / Make one readable scene", `@Remotion Make a composition called MessageFromMars: 1280 by 720, 30 fps, 12 seconds. For now, show only “A message from Mars” on a dark background with a simple orange planet shape. Use large readable text. Fade the text in over the first 20 frames using frame-based animation. Preview it and stop; do not render an MP4.`, `Check: can you read the headline at the size you will actually watch?`)}${prompt("2 / Give it three scenes", `@Remotion Continue MessageFromMars. Use these three lines in order: “A message from Mars”, “Someone is listening.”, “What will you send back?” Give each line four seconds. Fade each line in and out without overlapping unreadable text. Keep the planet and the 12-second duration. Preview the beginning, middle, and ending.`, `Check: seek to 2, 6, and 10 seconds. Each should show the intended line.`)}${prompt("3 / Compare two motion choices", `@Remotion Add inputs called headline and motion. The headline replaces only the first line; limit it to 48 characters in the interface. Motion can be gentle or energetic. Gentle uses the current fades. Energetic adds a small settling movement driven by the frame number. Put the composition in Remotion Player with those two controls and a timeline. Changing either input should pause and reset to frame 0.`, `Check: change only motion. Do the words, order, and duration stay the same?`)}${prompt("A small extension", `@Remotion Add one optional subtitle under the first headline. Keep the three-scene structure and readable spacing. Show me two frames where the subtitle is longest before we add anything else.`)}${finish()}`,
);
add(
  projects[1],
  "EXPLORE",
  projects[1].explore,
  "Let a dataset become a video",
  `<p class="lead">A few values can supply the content for an animation. The motion helps a viewer follow a comparison; the labels tell them what the comparison means.</p><p>Our fictional reading records use minutes for three categories. Switch between Set A and Set B. Predict which bar will be longest before pressing Play.</p>${demo("data")}<section><h2>The data changes; the rules stay visible.</h2><p>Both datasets use the same 0–30 minute scale. Comics, novels, and poetry keep their names and colors. After four seconds the bars have reached their final values. Their growth is a reveal, not evidence that someone was reading during the animation.</p><p>A useful data video needs an accurate question, source, units, and scale. Here the values are deliberately made up. With real research, you would retain where the records came from and what they can actually support.</p></section><div class="sample"><h2>The complete example data</h2><table><caption>Fictional reading minutes</caption><thead><tr><th>Category</th><th>Set A</th><th>Set B</th></tr></thead><tbody><tr><td>Comics</td><td>12</td><td>18</td></tr><tr><td>Novels</td><td>20</td><td>10</td></tr><tr><td>Poetry</td><td>8</td><td>22</td></tr></tbody></table><a href="media/reading-data.json" download>Download the sample data</a></div>${check("Would changing the axis separately for each dataset help the comparison?", "It could make both charts look similar even when the values differ. Holding the scale fixed makes this particular comparison easier to inspect.")}${relatives(
    [
      [
        "Research result",
        "Explain a small, sourced comparison without inventing a conclusion.",
      ],
      [
        "Sports scoreboard",
        "Bring supplied names, scores, and times into a consistent graphic.",
      ],
      [
        "Personal recap",
        "Let a reading or practice log fill a reusable video template.",
      ],
    ],
  )}${sources([
    ["https://github.com/remotion-dev/d3-example", "Official D3.js example"],
    [
      "https://github.com/hylarucoder/remotion-bar-race-chart",
      "A community bar-chart race project",
    ],
    [
      "https://github.com/remotion-dev/github-unwrapped",
      "A personalized year-in-review project",
    ],
  ])}`,
);
add(
  projects[1],
  "BUILD",
  projects[1].build,
  "Build a data story",
  `${buildIntro}${prompt("1 / Show the data before animating it", `@Remotion Create ReadingData: 1280 by 720, 30 fps, 12 seconds. Show a horizontal bar chart using this fictional dataset: Comics 12, Novels 20, Poetry 8. Label values as minutes and keep a fixed axis from 0 to 30. Put “Fictional example data” on screen. First make the finished chart readable without animation.`, `Check: compare every displayed value with the three numbers you supplied.`)}${prompt("2 / Reveal the same values over time", `@Remotion Animate ReadingData. Hold for one second, then grow the bars from zero to their supplied values over three seconds. The displayed numbers should follow that growth and finish at 12, 20, and 8. Keep category labels and the 0–30 minute scale fixed. Do not describe this reveal as a change in real reading over time.`, `Check: at four seconds the final labels and bar lengths should agree.`)}${prompt("3 / Let a second dataset reuse the chart", `@Remotion Add a dataset selector in a Remotion Player interface. Set A is Comics 12, Novels 20, Poetry 8. Set B is Comics 18, Novels 10, Poetry 22. Pass the chosen data to the same chart component. Keep the same scale, category order, and units. Changing datasets pauses and resets playback to the start. Add play, pause, replay, and timeline controls.`, `Check: select B and replay. Poetry should now be longest, at 22 minutes.`)}${prompt("A small extension", `@Remotion Add a separate text field for a source note. Default it to “Fictional example data”. Keep that note visible in the composition. Show how I would replace the data and supply its real source without the app inventing an interpretation.`)}${finish()}`,
);
add(
  projects[2],
  "EXPLORE",
  projects[2].explore,
  "Make a sound visible",
  `<p class="lead">An audiogram gives an audio passage a visual home. It can make a podcast excerpt, a short interview, or a language example easier to follow.</p><p>This demo uses a standard synthetic voice reading an original script. Its waveform is calculated from the audio file. Its captions use supplied sentence timestamps; they are not a live transcription.</p>${demo("audio")}<section><h2>Three ingredients, one clock</h2><p>The audio plays. The waveform shows a small window of its actual samples. The caption changes at its recorded start and end times. All three refer to the same playback position.</p><p>Compare the high-contrast card and the simple text treatment. The recording and timestamps stay fixed. A visually lively waveform does not prove that the words are correct: read the transcript and listen to the result.</p></section>${check("Will changing the caption style change what the voice says?", "No. This selector changes presentation. To change the spoken words, you need a revised recording and corresponding timestamps.")}${relatives(
    [
      ["Podcast clip", "Quote a short passage with its title and source."],
      [
        "Oral-history excerpt",
        "Present a speaker’s exact words with readable captions.",
      ],
      [
        "Listening lesson",
        "Let a learner repeat a reviewed pronunciation or phrase.",
      ],
    ],
  )}${sources([
    [
      "https://github.com/remotion-dev/template-audiogram",
      "Official audiogram starter",
    ],
    [
      "https://www.remotion.dev/docs/captions",
      "Caption import, transcription, display, and export",
    ],
    ["https://www.remotion.dev/docs/visualize-audio", "Audio visualization"],
  ])}`,
);
add(
  projects[2],
  "BUILD",
  projects[2].build,
  "Build a captioned audio clip",
  `${buildIntro}<div class="sample"><h2>Use the provided assets</h2><p>Download <a href="media/signal.wav" download>signal.wav</a> and <a href="media/captions.json" download>captions.json</a>. Ask the assistant to place them in your project’s <code>public/media</code> folder. The caption file records the supplied script at sentence boundaries.</p><p>Script: “Signal received. A tiny sound can become a visible story. Keep the words readable, and let the waveform follow the voice.”</p><p>The standard Samantha synthetic voice is a sample, not Dr. Plate’s voice.</p></div>${prompt("1 / Play the supplied recording", `@Remotion Create SignalAudiogram, 1280 by 720 at 30 fps. Use the signal.wav file I supplied in public/media. Set the composition duration to the actual audio length, rounded up to a frame. Show “Make a sound visible” on a dark background and play the recording only when I press Play. Open the preview and stop before adding captions.`, `Check: listen to the whole short recording. Is its ending present?`)}${prompt("2 / Add the supplied captions", `@Remotion Use the captions.json file I supplied. Its startMs and endMs values are milliseconds. Display the active sentence when the composition time is inside that interval. Keep the captions large, centered, and high contrast; leave enough room for the longest sentence. Do not invent new text or treat these timestamps as a transcription model.`, `Check: pause just before and after each sentence boundary.`)}${prompt("3 / Make the actual sound visible", `@Remotion Add a waveform sampled from signal.wav using Remotion’s audio visualization tools. Drive its time window from the composition frame and fps. Add a Remotion Player interface with two caption styles: high-contrast card and simple text. Changing style pauses and resets playback. Keep the audio and timestamps identical.`, `Check: the waveform should respond to sound and quiet, and both styles should show the same words.`)}<p>Continue to <a href="08-audio-test.html">the testing page</a> before replacing the recording.</p>`,
);
add(
  projects[2],
  "EXTEND + TEST",
  projects[2].extend,
  "Change the recording carefully",
  `<p class="lead">A new recording needs new timing. Keep the visual template, but review the material that enters it.</p><section><h2>Give a replacement its own record</h2><p>Use your own short recording or one you have permission to reuse. Write down where it came from. Obtain captions, then listen and correct the words and timestamps. A transcript with correct words can still be difficult to follow if it appears too early or disappears too soon.</p><p>Keep the supplied sample while you try the replacement. That gives you a known working case to return to.</p></section>${prompt("A small extension", `@Remotion Help me add a second short recording as a separate example, keeping the supplied signal.wav version. Inspect the new audio duration, help me obtain sentence captions, and ask me to review the wording against the recording. Update the duration and waveform source for that example. Do not assume the old timestamps fit the new audio.`)}<section><h2>Try these checks</h2><ol><li>Play from the beginning and listen through the final word.</li><li>Pause inside each caption interval and compare the text with the recording.</li><li>Seek backward and replay a sentence. Its caption should return at the same time.</li><li>Use the longest sentence at a phone-sized preview. Make the text readable before adding decorative motion.</li></ol></section>${callout("Why the sample is short", "This first build separates the important connections: one file, one timeline, reviewed captions, and a waveform. Longer audio, automatic transcription, and speaker changes are possible extensions after those connections work.")}${finish()}${sources(
    [
      [
        "https://www.remotion.dev/docs/captions/transcribing",
        "Ways to obtain captions",
      ],
      [
        "https://www.remotion.dev/docs/captions/displaying",
        "Displaying captions",
      ],
    ],
  )}`,
);
add(
  projects[3],
  "EXPLORE",
  projects[3].explore,
  "Make a new edit from existing footage",
  `<p class="lead">Remotion can also arrange media you already have. Here the source material stays the same while its order and transitions change.</p><p>Watch A → B → C, then choose C → B → A. Finally compare hard cuts with crossfades. All three excerpts come from the openly licensed film <em>Big Buck Bunny</em>.</p>${demo("montage")}<section><h2>Your timeline is different from the source timeline.</h2><p>Clip A contains seconds 32–36 of the original, B contains 43–47, and C contains 61–65. Each excerpt starts at zero in its own small file. The edit decides when each file appears in the finished composition.</p><p>A hard cut puts the clips next to each other. A crossfade overlaps them, so the total gets shorter. Neither choice creates new footage. Changing order can suggest a different sequence of events, so think about the relationship between an edit and its source.</p></section>${check("Is a 12-second edit still 12 seconds after two 0.6-second overlaps?", "No. Each crossfade uses an overlap rather than extra time. The result is 12 − 0.6 − 0.6 = 10.8 seconds.")}${relatives(
    [
      [
        "Travel diary",
        "Select a few moments rather than including every recording.",
      ],
      [
        "Photo documentary",
        "Give each image a caption and a deliberate duration.",
      ],
      [
        "Product walkthrough",
        "Combine a supplied screen recording with readable overlays.",
      ],
    ],
  )}<p class="credit">Modified excerpts: © 2008 Blender Foundation / www.bigbuckbunny.org, ${link("https://creativecommons.org/licenses/by/3.0/", "CC BY 3.0")}. The remix is a teaching example.</p>${sources(
    [
      ["https://www.remotion.dev/docs/videos", "Adding video"],
      ["https://www.remotion.dev/docs/transitions", "Transitions"],
      [
        "https://peach.blender.org/about/",
        "Original film attribution and reuse terms",
      ],
    ],
  )}`,
);
add(
  projects[3],
  "BUILD",
  projects[3].build,
  "Build your three-clip montage",
  `${buildIntro}<div class="sample"><h2>Three files, already trimmed</h2><p>Download <a href="media/bunny-a.mp4" download>Clip A</a>, <a href="media/bunny-b.mp4" download>Clip B</a>, and <a href="media/bunny-c.mp4" download>Clip C</a>. Each is four seconds at 30 fps. Place them in <code>public/media</code>.</p><p>Credit: © 2008 Blender Foundation / www.bigbuckbunny.org · CC BY 3.0. These are trimmed, resized excerpts. Keep the credit with your example.</p></div>${prompt("1 / Make a plain sequence", `@Remotion Create FootageMontage at 1280 by 720, 30 fps, 12 seconds. Use public/media/bunny-a.mp4, bunny-b.mp4, and bunny-c.mp4. Play them consecutively in that order, four seconds each, muted. Give each clip its own named sequence in the source. Add a small A, B, or C label and this credit: “© 2008 Blender Foundation / www.bigbuckbunny.org · CC BY 3.0”.`, `Check: inspect the boundaries at 4 and 8 seconds.`)}${prompt("2 / Compare a cut and an overlap", `@Remotion Add a transition input: cut or fade. Cut keeps the current 12-second sequence. Fade overlaps each neighboring pair by 18 frames, using a crossfade. Calculate the resulting duration as 324 frames, or 10.8 seconds. Keep the first clip fully visible at the start, and keep the final clip through the ending. Show a simple edit timeline alongside the preview.`, `Check: seek into the overlap. You should see both neighboring excerpts contributing.`)}${prompt("3 / Give the viewer a different order", `@Remotion Embed FootageMontage in a Remotion Player interface. Add an order selector with ABC, CBA, and BAC, plus the cut/fade selector. Reuse the same three media files. Changing either input pauses and resets playback. Update the player duration to match the transition choice, and show each clip’s start time on the edit timeline.`, `Check: choose CBA with a fade. C should appear first and the duration should be 10.8 seconds.`)}<p>Continue to <a href="11-montage-test.html">the testing page</a> before adding your own footage.</p>`,
);
add(
  projects[3],
  "EXTEND + TEST",
  projects[3].extend,
  "Treat an edit as a sequence of choices",
  `<p class="lead">A transition should help the viewer follow your material. Add it after the selection and order make sense.</p><section><h2>Keep picture, timing, and source separate.</h2><p>When a clip disappears unexpectedly, inspect its duration and start time. When the wrong moment appears, inspect which part of the source was selected. When a fade reveals black, check whether two clips actually overlap.</p><p>For your own footage, decide what to retain before changing colors, adding text, or choosing music. A simple cut is a useful baseline.</p></section>${prompt("A small extension", `@Remotion Add one short explanatory title between the second and third clips as a separate scene. Preserve the three original clips and their credit. Show me how the extra scene changes the total duration for both cut and fade modes. Recalculate the Player and Studio duration consistently.`)}<section><h2>Try these checks</h2><ol><li>Inspect the first and final frames. Is there an accidental black gap?</li><li>Seek to one frame before and after each hard cut.</li><li>Pause halfway through each fade. Check both layers and their labels.</li><li>Change the order and verify the source files, start times, and total duration.</li><li>For a real documentary or interview, ask whether the edit could mislead a viewer about its source.</li></ol></section>${finish()}`,
);
add(
  projects[4],
  "EXPLORE",
  projects[4].explore,
  "Build a world and move through it",
  `<p class="lead">A video can show a place that exists only in code. Begin with ordinary geometric shapes, light, and a camera.</p><p>This fictional station is assembled from a cylinder, sphere, panels, and ring. Set the station rotation to Still, then compare a moving orbit with a fixed side view. Now turn the rotation back on.</p>${demo("station")}<section><h2>Two kinds of movement</h2><p>The model can turn while the camera stays still. Or the camera can travel while the model stays still. Those produce different views. Here both movements are calculated from the frame number, so you can seek backward and inspect them.</p><p>Remotion works with React Three Fiber through <code>ThreeCanvas</code>. You do not need an imported 3D asset to start. A few shapes can teach you the relationship between model, lighting, and camera before you try a larger world.</p></section>${check("If the station is still, should every camera option show a still view?", "No. Still stops the station’s rotation. A moving camera can continue to change what the viewer sees. Compare the fixed side view with a moving orbit.")}${relatives(
    [
      [
        "Object tour",
        "Inspect a geometric or imported model from different sides.",
      ],
      ["World teaser", "Show one place from a game or fictional setting."],
      [
        "Animated map",
        "Use a related camera idea to follow a route; map data and providers need their own setup.",
      ],
    ],
  )}${sources([
    ["https://www.remotion.dev/docs/three", "Remotion’s Three.js integration"],
    ["https://github.com/remotion-dev/template-three", "Official 3D starter"],
    [
      "https://www.remotion.dev/docs/resources",
      "Map, globe, model, and particle examples",
    ],
  ])}`,
);
add(
  projects[4],
  "BUILD",
  projects[4].build,
  "Build your miniature station",
  `${buildIntro}${callout("Start with shapes, not a huge asset", "A cylinder, sphere, two blue boxes, and an orange ring are enough. This first model is fictional; it does not represent an engineered space station.")}${prompt("1 / Make a stationary model", `@Remotion Create MiniatureStation, 1280 by 720, 30 fps, 12 seconds. Use @remotion/three with ThreeCanvas and React Three Fiber. Build a fictional station from a central cylinder, a small sphere, two blue box-shaped solar panels, and an orange torus ring. Add ambient and directional lights on a dark background. Begin with a fixed camera and no movement.`, `Check: are all the important parts visible and lit?`)}${prompt("2 / Give the camera a path", `@Remotion Add a gentle camera orbit to MiniatureStation over its 12-second timeline. Calculate the position from useCurrentFrame, aiming toward the center of the model. Add a camera input with moving orbit, fixed side view, and high orbit. Do not use a free-running animation loop. Seek to the middle, then backward, to show the path can be inspected.`, `Check: does the model stay within the frame as the camera moves?`)}${prompt("3 / Control the station’s own movement", `@Remotion Add a rotation-speed input with 0, 0.5, 1, and 2. Apply it to a model rotation calculated from the composition frame. Embed the composition in Remotion Player with camera and rotation controls. Changing a control pauses and resets playback. Load the 3D code only where this demo is used, and show a still plus an explanation if WebGL is unavailable.`, `Check: use speed 0 with the fixed side view. The model and view should remain still.`)}<p>Continue to <a href="14-3d-test.html">the testing page</a> before adding models or textures.</p>`,
);
add(
  projects[4],
  "EXTEND + TEST",
  projects[4].extend,
  "Keep a 3D scene inspectable",
  `<p class="lead">A good first 3D scene is easy to understand from more than one viewpoint. Add complexity when you can still explain its parts.</p><section><h2>Let the timeline own the movement.</h2><p>If a rotation depends on how long the browser has been running, the same frame may show different positions on replay. For a Remotion composition, calculate movement from its frame. That makes the scene predictable when you scrub, replay, or export it.</p><p>An imported model brings other questions: its size, materials, textures, file paths, and license. Keep the geometric station available while you investigate those questions.</p></section>${prompt("A small extension", `@Remotion Add one small antenna to the geometric station and label it in the page explanation. Keep all camera options and the frame-driven rotation. Check the model at the beginning, midpoint, and ending from each camera. Keep the still fallback in sync with the model.`)}<section><h2>Try these checks</h2><ol><li>Set rotation to Still and use the fixed side view. Compare two distant frames.</li><li>Keep the model still and select a moving orbit. Identify what is moving.</li><li>Seek to frame 180, return to frame 0, and seek to 180 again.</li><li>Test the phone layout. The scene can scale down; the explanation and controls should stay readable.</li><li>Inspect the still fallback. A learner should be able to continue without a working 3D preview.</li></ol></section>${finish()}`,
);
add(
  projects[5],
  "EXPLORE",
  projects[5].explore,
  "Build an app that makes videos",
  `<p class="lead">Now move from one composition to a tool someone else can use. A small form can supply the content for a video template.</p><p>Give this fictional club a different name and choose a palette. Replay its announcement. The composition is the same; its inputs are different.</p>${demo("maker")}<section><h2>This is the Caseflow connection.</h2><p>Caseflow passes a word-order choice into the Latin explanation. This app passes a club name and palette into an announcement. In both cases, the interface gives a person control over the information that reaches the composition.</p><p>A preview generator can run on a static website like this one. An app that exports videos on demand needs a rendering route as an additional feature. A form and Player alone do not provide a cloud rendering service.</p></section>${check("Did changing the club name create a new MP4?", "No. It changed inputProps for the running composition. Exporting an MP4 is a separate action with its own rendering process.")}${relatives(
    [
      [
        "Personalized recap",
        "Use one visual template with different supplied records.",
      ],
      [
        "Learning app",
        "Give a learner a controlled choice and a way to inspect the explanation.",
      ],
      [
        "Video editor",
        "Add clip selection and timeline controls after the small template works.",
      ],
    ],
  )}${sources([
    [
      "https://www.remotion.dev/docs/player",
      "Player: runtime inputs and an interactive preview",
    ],
    [
      "https://www.remotion.dev/docs/parameterized-rendering",
      "Parameterized videos",
    ],
    [
      "https://buildlittleworlds.github.io/caseflow/",
      "Caseflow: the Session 4 starting example",
    ],
  ])}`,
);
add(
  projects[5],
  "BUILD",
  projects[5].build,
  "Build your video-making app",
  `${buildIntro}${prompt("1 / Make one complete announcement", `@Remotion Create ClubAnnouncement, 1280 by 720, 30 fps, 12 seconds. Use three four-second scenes: “Night Sky Club”, “Look up. Ask questions.”, and “Join us Friday.” Use a night-blue background, cream text, and simple circle shapes. Label it as a fictional example, not a real event. First preview the fixed version.`, `Check: can someone understand the example without seeing your code?`)}${prompt("2 / Put the same component in an app", `@Remotion Embed the existing ClubAnnouncement component in a small React app using Remotion Player. Keep the same duration, dimensions, and fps. Give it play, pause, replay, and timeline controls. Keep the club name fixed for now. Explain which part is the interface and which part is the composition.`, `Check: does seeking in the app show the same scenes as Studio?`)}${prompt("3 / Give the user two meaningful inputs", `@Remotion Add a club-name field limited to 48 characters and a palette selector with night blue or sunset. Pass these values into the same composition through inputProps. Changing a value pauses and resets playback to frame 0. Keep the fictional-event label and the three-scene structure. Show a clear message if an essential input is empty.`, `Check: try a long name, a short name, and both palettes. Check the phone layout too.`)}${prompt("A small extension", `@Remotion Add one field for a supplied event date. Keep it as text the user enters; do not invent a real date, timezone, or event. Show that date in the final scene and check the longest supported value. Keep export separate from the live preview.`)}${finish()}`,
);
const planner = `<form id="planner" class="planner"><label>What would you like to make?<input name="idea" placeholder="A short tour of my imagined city" maxlength="180"/></label><label>Who is it for?<input name="audience" placeholder="People seeing the setting for the first time" maxlength="180"/></label><label>What can you supply?<textarea name="assets" placeholder="Three drawings and a short description" maxlength="400"></textarea></label><p>Your entries stay in this page. They are not sent to ChatGPT. Copy the resulting prompt when you are ready.</p></form><section class="prompt" id="planner-prompt"><div class="prompt-top"><h2>Your conversation starter</h2><button type="button" data-copy>Copy prompt</button></div><pre><code>${escape("@Remotion I’m new to Remotion and would like beginner-friendly guidance. I want to make [my idea] for [my audience]. I have [my available assets]. Help me choose one small first version. Explain what Remotion would do and what inputs we need. Start with a short plan, then build only the first working preview. After I inspect it, we can decide what to add.")}</code></pre></section>`;
pages.push({
  file: "17-your-project.html",
  title: "Choose your own first version",
  label: "Your own project",
  stage: "YOUR NEXT BUILD",
  body: `<p class="lead">You do not need to choose the most complicated example. Choose something you want another person to see or understand.</p><section><h2>Describe an outcome before a feature list.</h2><p>“I want to help someone follow this route” gives you a starting point. You might begin with a simple map and three stops, then add a moving camera. “I want a giant video platform” leaves much more undecided.</p><p>Choose one working version you could inspect in a short sitting. Keep a screenshot or note about what you expected and what you actually saw. That record can help you decide what to try next.</p></section>${planner}<section class="two-up"><article><h2>A useful first milestone</h2><p>One clear preview with real inputs, readable text, and a beginning and ending. You can explain what changes with time and what comes from your supplied material.</p></article><article><h2>A useful next question</h2><p>Which single addition would help your audience? A new input? Better timing? A second scene? Ask for that addition after checking the current version.</p></article></section>${prompt("When you want to understand a part", `@Remotion Show me one small piece of this project that controls what I am seeing. Explain it in ordinary words, let me predict one change, and help me test that change without adding unrelated features.`)}${finish()}${callout("Bring back the actual attempt", "This is an optional Session 4 resource, not a new assignment. If you use it for your session record, name what you tried, what you noticed, and what you are wondering. A blocked attempt is still something you can describe honestly.")}<p><a href="index.html#idea-gallery">Return to the 30 ideas →</a></p>`,
});
export { pages };
