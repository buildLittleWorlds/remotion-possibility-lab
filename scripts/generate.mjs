import { writeFile, mkdir } from "node:fs/promises";
import { pages, projects, escape } from "../content/lessons.mjs";
import { introPages } from "../content/getting-started.mjs";
await mkdir("public/media", { recursive: true });
await writeFile(
  "public/media/reading-data.json",
  JSON.stringify(
    {
      note: "Fictional example reading minutes; not a class survey",
      unit: "minutes",
      scale: [0, 30],
      A: { Comics: 12, Novels: 20, Poetry: 8 },
      B: { Comics: 18, Novels: 10, Poetry: 22 },
    },
    null,
    2,
  ) + "\n",
);
const nav = (current) =>
  `<nav aria-label="Guide pages"><a href="index.html" ${current === "index.html" ? 'aria-current="page"' : ""}><span>01</span>Start here</a><div class="nav-group nav-guides"><p>BEFORE YOUR FIRST BUILD</p>${introPages.map((p) => `<a href="${p.file}" ${current === p.file ? 'aria-current="page"' : ""}><span>↗</span>${p.label}</a>`).join("")}</div>${projects.map((p) => `<div class="nav-group"><p>${p.n} / ${p.short}</p>${pages.map((page, i) => (page.project === p.id ? `<a href="${page.file}" ${current === page.file ? 'aria-current="page"' : ""}><span>${String(i + 1).padStart(2, "0")}</span>${page.stage === "EXPLORE" ? "Explore" : page.stage === "BUILD" ? "Build" : "Extend + test"}</a>` : "")).join("")}</div>`).join("")}<a href="17-your-project.html" ${current === "17-your-project.html" ? 'aria-current="page"' : ""}><span>17</span>Your own project</a></nav>`;
const targetTitle = (target) =>
  target.includes("#")
    ? "Browse the project ideas"
    : [...pages, ...introPages].find((p) => p.file === target)?.title ||
      "Return to the guide";
const turnLink = (target, direction) =>
  target
    ? `<a href="${target}" ${direction === "Next" ? 'class="next"' : ""}><small>${direction === "Next" ? "Next →" : "← Previous"}</small>${escape(targetTitle(target))}</a>`
    : "<span></span>";
for (const [i, p] of [...pages, ...introPages].entries()) {
  const previous = p.detour ? p.previous : i > 0 ? pages[i - 1].file : null;
  const next = p.detour
    ? p.next
    : i < pages.length - 1
      ? pages[i + 1].file
      : "index.html";
  const progress = p.detour
    ? `SETUP GUIDE ${introPages.findIndex((x) => x.file === p.file) + 1} / 2`
    : `PAGE ${String(i + 1).padStart(2, "0")} / ${pages.length}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="${escape(p.home ? "Explore six different ways to create videos with Remotion. A student guide with playable demos, beginner setup routes, 30 ideas, and ChatGPT prompts." : p.title + " — an approachable Remotion walkthrough for Level 2A.")}"/><meta name="theme-color" content="#f6f2e8"/><title>${escape(p.title)} · Remotion Possibility Lab</title><link rel="icon" type="image/svg+xml" href="./favicon.svg"/><link rel="stylesheet" href="./src/site.css"/></head><body><a class="skip" href="#main">Skip to the lesson</a><header class="site-header"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">R<span>↗</span></span><span>Remotion<br><strong>Possibility Lab</strong></span></a><div class="header-meta">LEVEL 2A · SESSION 4<br><span>Explore something different.</span></div></header><div class="book"><aside class="sidebar"><details open class="chapter-nav"><summary>Guide + setup <span>${p.detour ? "SETUP" : `${i + 1} / ${pages.length}`}</span></summary>${nav(p.file)}</details><a class="caseflow-link" href="https://buildlittleworlds.github.io/caseflow/">↗ Back to Caseflow</a></aside><main id="main" class="lesson ${p.home ? "home" : ""}">${p.home ? "" : `<div class="page-meta"><span>${p.stage}</span><span>${progress}</span></div><h1>${escape(p.title)}</h1>`}${p.body}<nav class="page-turn" aria-label="Previous and next pages">${turnLink(previous, "Previous")}${turnLink(next, "Next")}</nav><footer class="site-footer"><p>Prepared for Dr. Plate’s Level 2A class · October 2026</p><p>Original teaching examples. Fictional examples are labeled. <a href="https://github.com/buildLittleWorlds/remotion-possibility-lab">Source and asset credits ↗</a></p></footer></main></div><script type="module" src="./src/main.tsx"></script></body></html>`;
  await writeFile(p.file, html + "\n");
}
await writeFile(
  "public/favicon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#203cb4"/><text x="15" y="46" font-size="42" font-family="Arial" font-weight="bold" fill="#fff7e8">R</text></svg>',
);
console.log(
  `Generated ${pages.length} lesson pages and ${introPages.length} setup walkthroughs.`,
);
