import { escape } from "./lessons.mjs";
export const firstPoemLines = [
  "One small spark.",
  "A thought takes shape.",
  "We try, we change.",
  "A little world begins.",
];
export const firstPoemSpec = {
  id: "FirstPoem",
  width: 1280,
  height: 720,
  fps: 30,
  durationInFrames: 240,
  lines: firstPoemLines,
};
const poemText = firstPoemLines
  .map((line, i) => `${i + 1}. ${line}`)
  .join("\n");
const prompt = (title, text, note = "") =>
  `<section class="prompt"><div class="prompt-top"><h3>${title}</h3><button type="button" data-copy>Copy prompt</button><button type="button" data-select>Select text</button></div><pre><code>${escape(text)}</code></pre>${note ? `<p class="prompt-note">${note}</p>` : ""}</section>`;
const terminal = (title, code, note = "") =>
  `<section class="terminal"><div class="terminal-top"><h3>${title}</h3><button type="button" data-copy>Copy PowerShell</button><button type="button" data-select>Select text</button></div><pre><code class="language-powershell">${escape(code)}</code></pre>${note ? `<p class="terminal-note">${note}</p>` : ""}</section>`;
const sources = (items) =>
  `<div class="sources"><h2>Official help for this route</h2><ul>${items.map(([url, label]) => `<li><a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a></li>`).join("")}</ul></div>`;
const poemCard = `<div class="first-project"><div><p class="eyebrow">YOUR FIRST PROJECT / AN ANIMATED POEM</p><h2>A little world begins.</h2><p>Four original lines. Eight seconds. Large blue text on a cream background. Each line gets two seconds to fade in, be read, and fade out.</p></div><ol class="poem-lines">${firstPoemLines.map((line, i) => `<li><span>${i * 2}–${(i + 1) * 2} seconds</span>${line}</li>`).join("")}</ol></div>`;
const timeline = `<figure class="first-timeline"><figcaption>At 30 frames per second, each two-second line uses 60 frames.</figcaption><div>${firstPoemLines.map((line, i) => `<span><strong>${i * 2}–${(i + 1) * 2} s</strong>${line}</span>`).join("")}</div><p>4 lines × 60 frames = 240 frames = 8 seconds.</p></figure>`;
export const pluginFirstPrompt = `@Remotion I’m using Remotion for the first time and I’m new to making videos with code. Help me create an animated poem in the new empty first-poem-plugin project folder I selected. Check Node.js and Git, explain any needed setup, and prepare the project dependencies before writing the animation.

Make a composition named FirstPoem: 1280 by 720, 30 frames per second, eight seconds. Use these exact original lines:
${poemText}

Show one line at a time, two seconds per line, with large blue text on a cream background. Use useCurrentFrame and interpolate so the first 10 frames of each line fade in and the last 10 fade out. Keep it silent and use a normal local font.

Open a working Remotion Studio preview. Tell me where the project was saved and which source file controls the poem. Stop so I can inspect it before adding features or rendering an MP4.`;
export const withoutPluginPrompt = `I’m new to Remotion and to making videos with code. I’m using Windows PowerShell and ChatGPT without the Remotion plugin. I have created a blank Remotion project named first-poem with create-video, run npm.cmd install, and opened Remotion Studio. Its src/index.ts imports RemotionRoot from src/Root.tsx. Help me make this first animation; please write the code for me.

Create src/FirstPoem.tsx and update src/Root.tsx to register a composition named FirstPoem: 1280 by 720, 30 frames per second, durationInFrames 240. Use these exact original lines:
${poemText}

Show one line at a time, 60 frames per line, with large blue text on a cream background. Use useCurrentFrame and interpolate so the first 10 frames of each line fade in and the last 10 fade out. Keep it silent and use a normal local font. Preserve src/index.ts and keep the existing package versions compatible.

If you can edit my selected project folder, make those two file changes there and explain them. If you cannot edit local files, give me the complete contents of both files in separately named code blocks and tell me exactly where to save each one. Use npm.cmd and npx.cmd in Windows PowerShell instructions. Use ordinary Remotion code without installing a plugin or agent skills. Help me run npx.cmd tsc --noEmit, then select FirstPoem in Studio. Stop before adding features or rendering an MP4.`;
export const setupCommands = {
  check: String.raw`node --version
npm.cmd --version
npx.cmd --version
git --version`,
  winget: String.raw`winget --version`,
  installNode: String.raw`winget install --id OpenJS.NodeJS.LTS --exact --source winget`,
  installGit: String.raw`winget install --id Git.Git --exact --source winget`,
  folder: String.raw`$remotionProjects = Join-Path $env:USERPROFILE "RemotionProjects"
New-Item -ItemType Directory -Path $remotionProjects -Force | Out-Null
Set-Location $remotionProjects`,
  create: String.raw`npx.cmd create-video@4.0.532 --yes --blank --no-tailwind first-poem`,
  dependencies: String.raw`Set-Location .\first-poem
npm.cmd install`,
  list: String.raw`Get-Location
Get-ChildItem .\src`,
  preview: String.raw`npx.cmd remotion studio --no-open`,
  reopen: String.raw`Set-Location (Join-Path $env:USERPROFILE "RemotionProjects\first-poem")`,
  files: String.raw`if (-not (Test-Path .\src\FirstPoem.tsx)) {
    New-Item -ItemType File -Path .\src\FirstPoem.tsx | Out-Null
}
notepad .\src\FirstPoem.tsx
notepad .\src\Root.tsx`,
  checkCode: String.raw`npx.cmd tsc --noEmit`,
  export: String.raw`npx.cmd remotion render src/index.ts FirstPoem .\out\first-poem.mp4`,
};
const iterationPrompt = `Keep the working FirstPoem composition. Change only the text color from blue to dark green. Keep all four lines, their timing, and the cream background. Tell me what you changed, then help me inspect the same moments again.`;
const repairPrompt = `Here is what I tried in my first-poem project: [describe the step]. Here is the exact message or what I see: [paste the error or describe the preview]. Help me fix just this issue. Keep my files and working features, give Windows PowerShell commands where needed, and explain how I can check the result.`;
const checks = `<section id="check-your-poem"><h2>Check your first working version</h2><ol><li>Select <strong>FirstPoem</strong> in Studio and press Play. You should see four lines in the supplied order.</li><li>Pause or move the timeline to 1, 3, 5, and 7 seconds. Each moment should show a different line. At 30 fps, these are frames 30, 90, 150, and 210.</li><li>Move backward and revisit the same moment. You should recover the same image.</li><li>Point to the file containing the four lines. You can ask the assistant to explain one small part of it.</li></ol><p>At the exact start of each fade the text is transparent. If the first frame looks empty, press Play or move to one second.</p></section>${timeline}`;
const pluginBody = `<p class="lead">Start with one small video you can understand: a four-line animated poem. This walkthrough assumes you have never used Remotion or installed a plugin before.</p><div class="route-switch"><strong>Looking for the Windows terminal route?</strong><p><a href="windows-without-plugin.html">Use Remotion with PowerShell and ChatGPT, without the plugin →</a></p></div>
<section><h2>What is Remotion?</h2><p>Remotion is a framework for making video with code. A <strong>composition</strong> describes what appears at each frame: text, shapes, images, audio, or footage. The code usually uses React, a way to organize a screen into reusable components. ChatGPT can help write those components.</p><p>For a first project, think of a composition as a set of instructions for drawing the next picture. Remotion Studio runs those instructions in a browser so you can play, pause, and inspect them. Rendering turns that composition into a separate video file.</p><div class="workflow-strip" aria-label="How the first video is made"><span><strong>Your idea</strong>What should a viewer see?</span><span><strong>ChatGPT + plugin</strong>Help prepare and write the project</span><span><strong>Remotion Studio</strong>Play and inspect the animation</span></div></section>
<section><h2>What does the plugin add?</h2><p>A plugin is a package of extra capabilities for an AI assistant. The Remotion plugin supplies guidance for creating and editing Remotion projects. You use a conversation to describe your video, inspect what was built, and ask for changes.</p><p>The plugin is installed in the assistant. The project’s packages are installed in the project folder. Those are two separate setup steps; the assistant can help with the second after you have selected a project folder.</p><p><a href="https://www.remotion.dev/docs/ai/codex-plugin" target="_blank" rel="noreferrer">Remotion documents its desktop plugin route here ↗</a>.</p></section>
${poemCard}
<section id="install-plugin"><p class="eyebrow">STEP 1 / GIVE THE ASSISTANT THE CAPABILITY</p><h2>Install the Remotion plugin</h2><ol><li>Open the <strong>ChatGPT desktop app</strong> and its <strong>Plugins</strong> directory. Search for <strong>Remotion</strong>. You can also use <a href="https://chatgpt.com/plugins/plugins~Plugin_efd07789186881918253a50acfc32762?open_in_codex=" target="_blank" rel="noreferrer">the plugin link from Remotion’s documentation ↗</a>.</li><li>Open the plugin’s details and select the <strong>plus / Install</strong> control. If it is already installed, keep the installed version.</li><li>Start a <strong>new conversation</strong> after installation so the plugin’s capabilities are available there.</li></ol><p>If Remotion is unavailable in your current chat surface, use <strong>Codex in the desktop app</strong>, the route Remotion documents. If it is unavailable to your account, continue with <a href="windows-without-plugin.html">the Windows route without a plugin</a>.</p><p><a href="https://learn.chatgpt.com/docs/plugins" target="_blank" rel="noreferrer">Official ChatGPT plugin installation help ↗</a></p></section>
<section id="prepare-project"><p class="eyebrow">STEP 2 / GIVE THE PROJECT A HOME</p><h2>Open a new, empty project folder</h2><p>Create a folder called <strong>first-poem-plugin</strong> somewhere you can find again, such as a RemotionProjects folder inside your Windows user folder. In the desktop app’s local project view, choose that folder for this conversation. Remotion’s documented Codex route supports local project work.</p><p>This folder will hold your animation code and project packages. Use an empty folder for your first try. Ask the assistant to check Node.js and Git and explain any installation it needs before preparing the project. Node.js runs the project tools; Git is used by the current project starter.</p><p>Select <strong>Remotion</strong> from the <strong>@ menu</strong> if your interface offers it. In Codex, Remotion’s documentation also describes typing <code>$remotion</code> and accepting the suggested plugin. The prompt below uses <code>@Remotion</code>; if your interface uses <code>$remotion</code>, replace its opening marker.</p></section>
<section><p class="eyebrow">STEP 3 / ASK FOR ONE SMALL RESULT</p><h2>Make the first poem</h2><p>Paste this into the project conversation after selecting the plugin. Let the assistant prepare the project and tell you where to open the preview.</p>${prompt("Your first Remotion prompt", pluginFirstPrompt, "The result you want is a working local preview with four readable lines. Ask for help with any actual setup message before adding features.")}</section>
<section><p class="eyebrow">STEP 4 / OPEN WHAT WAS BUILT</p><h2>Look at the preview</h2><p>The assistant should start Remotion Studio and give you its local address. Open that address in the app’s browser or your normal browser, and select <strong>FirstPoem</strong>. Keep the preview server running while you look at the result.</p><p>If it only gives you code or a plan, continue the conversation: “Help me save this in my selected project folder and open the working Studio preview.” A returned code block and a working preview are different milestones.</p></section>
${checks}
<section><p class="eyebrow">STEP 5 / TRY ONE CHANGE</p><h2>Change the color, then inspect again</h2>${prompt("A follow-up after your first preview", `@Remotion ${iterationPrompt}`)}<p>Did the color change while the words and timing stayed the same? This is the beginning of a useful build conversation: make something small, look carefully, and choose the next change.</p></section>
<details class="export"><summary>Optional: ask for a finished MP4</summary>${prompt("Export the poem you reviewed", "@Remotion I have checked FirstPoem and now want an MP4. Render the current eight-second composition at 1280 by 720 and 30 fps. Tell me where the file is saved, and help me check that all four lines appear in the correct order.")}<p>An MP4 is a new output file. Keep your project folder too, because it contains the editable source.</p></details>
<section><h2>If you get stuck</h2>${prompt("Describe the actual problem", `@Remotion ${repairPrompt}`)}<p>Bring the exact step and message to Dr. Plate. You can also <a href="windows-without-plugin.html">follow the Windows setup route</a> to see how the project is prepared through PowerShell.</p></section>
<div class="route-switch"><strong>Ready to explore more?</strong><p><a href="index.html#idea-gallery">Browse the 30 project ideas →</a> · <a href="02-story-explore.html">Try the first interactive demo →</a></p></div>${sources(
  [
    ["https://www.remotion.dev/docs", "Remotion: creating a project"],
    [
      "https://www.remotion.dev/docs/the-fundamentals",
      "Frames, components, and compositions",
    ],
    [
      "https://www.remotion.dev/docs/ai/codex-plugin",
      "Remotion plugin installation and usage",
    ],
    ["https://learn.chatgpt.com/docs/plugins", "ChatGPT plugins"],
  ],
)}`;
const windowsBody = String.raw`<p class="lead">Use PowerShell to prepare and run the project, and let ChatGPT help write the animation. This route makes the same four-line poem as <a href="getting-started.html">the plugin walkthrough</a>.</p><p>You can use a regular ChatGPT conversation or another AI assistant. A regular chat can give you file contents; an assistant with access to your selected folder can save them directly.</p>${poemCard}
<section><h2>What each piece does</h2><table><caption>The tools you will use</caption><thead><tr><th>Piece</th><th>Its job in this walkthrough</th></tr></thead><tbody><tr><td>PowerShell</td><td>The Windows terminal where you type setup and preview commands.</td></tr><tr><td>Node.js</td><td>Runs JavaScript tools on your computer, including the tools that prepare and serve the project.</td></tr><tr><td>npm</td><td>Comes with the normal Node.js installer and downloads the project’s packages.</td></tr><tr><td>npx</td><td>Runs a package command, such as the starter that creates a new project.</td></tr><tr><td>Git</td><td>Records versions of source files. The current Remotion starter checks that it is installed.</td></tr><tr><td>Remotion</td><td>The packages and code that describe, preview, and render your composition.</td></tr><tr><td>ChatGPT</td><td>Helps write the poem’s code and explain or repair what you see.</td></tr></tbody></table><p>For this first video, you need a Windows computer, an internet connection for downloads, and a browser. A GitHub account or an AI API key is not needed.</p><div class="workflow-strip" aria-label="The Windows route"><span><strong>PowerShell</strong>Prepare the project</span><span><strong>ChatGPT</strong>Write the two animation files</span><span><strong>Studio</strong>Inspect your first poem</span></div></section>
<section id="open-powershell"><p class="eyebrow">STEP 1 / OPEN THE TERMINAL</p><h2>Open Windows PowerShell</h2><p>Open the Windows Start menu, type <strong>PowerShell</strong>, and open it. If you use Windows Terminal, choose a PowerShell tab. Use a normal terminal window; the installer may separately request administrator permission.</p><p>The dark boxes below contain commands to run. Their explanations are outside the boxes. Use Copy PowerShell, or Select text followed by Ctrl+C. Paste the command block into PowerShell, press Enter, and wait for it to finish before continuing.</p>${terminal("Check what is already installed", setupCommands.check, "Each installed tool should print a version. If Node.js is already a supported LTS release such as 22.x or 24.x, keep it. If a command is not recognized, follow the installation step below for that tool.")}<p><code>npm.cmd</code> and <code>npx.cmd</code> are the Windows command launchers. Using them avoids the common <code>npm.ps1</code> script-policy error without changing your PowerShell execution policy.</p></section>
<section id="install-tools"><p class="eyebrow">STEP 2 / INSTALL ONLY WHAT IS MISSING</p><h2>Install Node.js and Git if needed</h2><p>WinGet is Windows’ package manager. Many Windows 10/11 computers already include it through App Installer. Check it first:</p>${terminal("Check WinGet", setupCommands.winget)}${terminal("Install the current Node.js LTS release", setupCommands.installNode, "Skip this if your existing supported LTS installation already works. LTS means Long-Term Support. Read any installer prompts and let installation finish.")}${terminal("Install Git", setupCommands.installGit, "Skip this if git --version already works. The project starter uses Git during creation; this guide keeps the first build local.")}<p><strong>Close PowerShell and open a fresh window after installation.</strong> This lets the terminal find the newly installed programs. Run the four version checks again before continuing.</p><details class="setup"><summary>If WinGet is unavailable</summary><p>Use the official <a href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">Node.js download page</a>. Select an LTS release, Windows, and the Windows Installer (<code>.msi</code>) for your computer, then follow the installer’s normal steps. The installer includes npm and npx. For Git, use <a href="https://git-scm.com/install/windows" target="_blank" rel="noreferrer">the official Git for Windows instructions</a>.</p><p>Reopen PowerShell and repeat the version checks. If a school or family manages software installation on your computer, ask for help with the install rather than proceeding while the checks fail.</p></details></section>
<section id="create-project"><p class="eyebrow">STEP 3 / CREATE A LOCAL REMOTION PROJECT</p><h2>Give the project a folder</h2><p>These commands make a <strong>RemotionProjects</strong> folder inside your Windows user folder and move PowerShell there. The folder names are specific to this walkthrough.</p>${terminal("Choose the project location", setupCommands.folder, "Join-Path builds a path for your own Windows account. Set-Location changes the folder where the next command will run.")}<p>Now create a new project called <strong>first-poem</strong>. Run this once in the parent RemotionProjects folder:</p>${terminal("Create the blank starter", setupCommands.create, "If npm asks whether it may install create-video, type y and press Enter. The starter uses the blank template. The version number pins the starter used to prepare this guide; it still downloads the official template and selects Remotion package versions.")}<p>If <code>first-poem</code> already exists, use your existing project or ask for help choosing a new folder name. Keep any earlier files.</p>${terminal("Enter the new project and install its packages", setupCommands.dependencies, "Wait until installation finishes and PowerShell returns to its command prompt. npm install reads this folder’s package.json; it creates node_modules with the project’s dependencies.")}<p>Remotion is now installed <em>inside this project</em>. You do not need to install it as a separate Windows application or global package.</p>${terminal("Inspect where you are and what was created", setupCommands.list, "Get-Location should end in your RemotionProjects / first-poem folder. The source folder should contain files including index.ts and Root.tsx.")}<div class="sample"><h2>Recognize the important files</h2><ul><li><code>package.json</code>: the project’s packages and runnable commands.</li><li><code>src/index.ts</code>: connects Studio to the registered compositions.</li><li><code>src/Root.tsx</code>: registers the poem’s name, duration, size, and frame rate.</li><li><code>src/FirstPoem.tsx</code>: the poem code ChatGPT will create next.</li></ul></div></section>
<section id="preview"><p class="eyebrow">STEP 4 / OPEN THE EMPTY STUDIO</p><h2>Start the local preview</h2>${terminal("Start Remotion Studio", setupCommands.preview, "Open the Local URL printed by this command in your browser. It is often http://localhost:3000; use the actual address shown in your terminal.")}<p><strong>Keep this PowerShell window open.</strong> While Studio is running, it is normal for the terminal to remain busy rather than show a new command prompt. Use the browser for the preview. Press <strong>Ctrl+C</strong> when you want to stop the server.</p><p>A blank template may show an empty composition called <strong>MyComp</strong>. Opening that empty preview confirms the setup; the next step creates FirstPoem.</p></section>
<section id="ask-chatgpt"><p class="eyebrow">STEP 5 / LET CHATGPT WRITE THE ANIMATION</p><h2>Use this prompt in your AI conversation</h2><p>Paste the following into <strong>ChatGPT</strong>, not into PowerShell. If your assistant can work in a local project folder, select <strong>RemotionProjects\first-poem</strong> first. If it cannot, follow the file-saving instructions below its response.</p>${prompt("The same poem, without the plugin", withoutPluginPrompt, "The assistant writes the animation. You supply the project context, save the returned files if needed, and use PowerShell to check and preview the result.")}<details class="setup" id="save-files"><summary>If ChatGPT gives you code instead of editing the files</summary><p>Ask for complete contents of <code>src/FirstPoem.tsx</code> and <code>src/Root.tsx</code>. Keep the preview window running and open a <strong>second PowerShell window</strong> for these file steps.</p>${terminal("Return to the project in the second window", setupCommands.reopen)}${terminal("Open the two files in Notepad", setupCommands.files, "The first command creates FirstPoem.tsx only if it does not exist. The two Notepad commands open the files you need to fill.")}<ol><li>Copy only the code inside ChatGPT’s <strong>FirstPoem.tsx</strong> code block into that file. Leave out the Markdown backticks and surrounding explanation. Save it.</li><li>Replace the contents of <strong>Root.tsx</strong> with the complete Root.tsx code ChatGPT supplied. Save it.</li><li>Keep the existing <strong>src/index.ts</strong>. The prompt asks the new Root.tsx to keep the expected RemotionRoot export.</li></ol><p>You can use a code editor you already have instead of Notepad. The important part is saving the code in those exact project files.</p></details></section>
<section><p class="eyebrow">STEP 6 / CHECK BEFORE EXTENDING</p><h2>Check the saved code, then select FirstPoem</h2><p>In a second PowerShell window, return to your project folder and check the saved files:</p>${terminal("Return to the project and check TypeScript", `${setupCommands.reopen}\n${setupCommands.checkCode}`, "A successful TypeScript check returns to the prompt without errors. If it prints errors, give the exact messages to ChatGPT and ask for a focused repair.")}<p>Return to the Studio browser tab. It should update when files are saved. Select <strong>FirstPoem</strong>. If the preview server stopped, restart it from the project folder with the same Studio command.</p></section>${checks}
<section><h2>Try the same small follow-up</h2>${prompt("Change only the color", iterationPrompt)}<p>Save the revised file if ChatGPT cannot edit it directly. Run the TypeScript check again, then inspect the same four moments in Studio.</p></section>
<details class="export"><summary>Optional: render your reviewed poem as an MP4</summary><p>After FirstPoem works in Studio, run this in the project folder from a PowerShell window with a command prompt:</p>${terminal("Export the reviewed FirstPoem composition", setupCommands.export, "Remotion may download a rendering browser on the first export. The result should be first-poem.mp4 inside the project’s out folder. Open that file and check its four lines.")}<p>The composition name <strong>FirstPoem</strong> must match the one registered in Root.tsx. Ask ChatGPT to explain the command before running it if you are unsure.</p></details>
<section><h2>If a step fails</h2><dl class="troubleshooting"><dt>“node” or “npm.cmd” is not recognized</dt><dd>Finish installation, close the old terminal, reopen PowerShell, and repeat the version checks.</dd><dt>npm.ps1 cannot run because scripts are disabled</dt><dd>Use <code>npm.cmd</code> and <code>npx.cmd</code> as shown here. You can keep your script policy unchanged.</dd><dt>Git is not installed</dt><dd>Install Git, reopen PowerShell, and confirm <code>git --version</code> before running the project starter.</dd><dt>The starter reports a Git identity error</dt><dd>If it also reports “Copied to first-poem” and the project’s package.json exists, the files were created. Continue with npm.cmd install inside that folder. Ask ChatGPT about the optional Git commit separately.</dd><dt>npm cannot find package.json</dt><dd>Check <code>Get-Location</code>. Run package commands inside the first-poem folder, where package.json was created.</dd><dt>Studio opens but FirstPoem is missing</dt><dd>Check that both code files were saved and that Root.tsx registers FirstPoem. Give ChatGPT your actual Root.tsx and the message you see.</dd></dl>${prompt("Ask for help with the actual issue", repairPrompt)}</section>
<div class="route-switch"><strong>You have reached the same first milestone.</strong><p>A local eight-second poem you can replay, inspect, and revise with AI help. <a href="getting-started.html">Return to the plugin route →</a> · <a href="index.html#idea-gallery">Choose another idea →</a></p></div>${sources(
  [
    [
      "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
      "Node.js: what the runtime does",
    ],
    ["https://nodejs.org/en/download", "Official Node.js installers"],
    [
      "https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager",
      "npm and project packages",
    ],
    [
      "https://learn.microsoft.com/en-us/windows/package-manager/winget/install",
      "Microsoft: WinGet install commands",
    ],
    ["https://git-scm.com/install/windows", "Official Git for Windows setup"],
    ["https://www.remotion.dev/docs", "Remotion: create and preview a project"],
    [
      "https://github.com/remotion-dev/remotion/blob/main/packages/create-video/src/init.ts",
      "Remotion starter: Git availability check",
    ],
  ],
)}`;
export const introPages = [
  {
    file: "getting-started.html",
    title: "Getting started with Remotion and ChatGPT",
    label: "With the plugin",
    stage: "GETTING STARTED",
    body: pluginBody,
    detour: true,
    previous: "index.html",
    next: "windows-without-plugin.html",
  },
  {
    file: "windows-without-plugin.html",
    title: "Remotion on Windows without the plugin",
    label: "Windows / without plugin",
    stage: "WINDOWS WALKTHROUGH",
    body: windowsBody,
    detour: true,
    previous: "getting-started.html",
    next: "index.html#idea-gallery",
  },
];
