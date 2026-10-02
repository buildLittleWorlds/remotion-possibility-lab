import { writeFile, mkdir } from "node:fs/promises";
import { pages, projects, escape } from "../content/lessons.mjs";
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
  `<nav aria-label="Guide pages"><a href="index.html" ${current === 0 ? 'aria-current="page"' : ""}><span>01</span>Start here</a>${projects.map((p) => `<div class="nav-group"><p>${p.n} / ${p.short}</p>${pages.map((page, i) => (page.project === p.id ? `<a href="${page.file}" ${current === i ? 'aria-current="page"' : ""}><span>${String(i + 1).padStart(2, "0")}</span>${page.stage === "EXPLORE" ? "Explore" : page.stage === "BUILD" ? "Build" : "Extend + test"}</a>` : "")).join("")}</div>`).join("")}<a href="17-your-project.html" ${current === 16 ? 'aria-current="page"' : ""}><span>17</span>Your own project</a></nav>`;
for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="${escape(p.home ? "Explore six different ways to create videos with Remotion. A student guide with playable demos, 30 project ideas, and ChatGPT prompts." : p.title + " — an approachable Remotion example with ChatGPT build prompts for Level 2A.")}"/><meta name="theme-color" content="#f6f2e8"/><title>${escape(p.title)} · Remotion Possibility Lab</title><link rel="icon" type="image/svg+xml" href="./favicon.svg"/><link rel="stylesheet" href="./src/site.css"/></head><body><a class="skip" href="#main">Skip to the lesson</a><header class="site-header"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">R<span>↗</span></span><span>Remotion<br><strong>Possibility Lab</strong></span></a><div class="header-meta">LEVEL 2A · SESSION 4<br><span>Explore something different.</span></div></header><div class="book"><aside class="sidebar"><details open class="chapter-nav"><summary>Guide pages <span>${i + 1} / 17</span></summary>${nav(i)}</details><a class="caseflow-link" href="https://buildlittleworlds.github.io/caseflow/">↗ Back to Caseflow</a></aside><main id="main" class="lesson ${p.home ? "home" : ""}">${p.home ? "" : `<div class="page-meta"><span>${p.stage}</span><span>PAGE ${String(i + 1).padStart(2, "0")} / 17</span></div><h1>${escape(p.title)}</h1>`}${p.body}<nav class="page-turn" aria-label="Previous and next pages">${i > 0 ? `<a href="${pages[i - 1].file}"><small>← Previous</small>${escape(pages[i - 1].title)}</a>` : "<span></span>"}${i < pages.length - 1 ? `<a class="next" href="${pages[i + 1].file}"><small>Next →</small>${escape(pages[i + 1].title)}</a>` : `<a class="next" href="index.html"><small>Return →</small>Browse the possibilities</a>`}</nav><footer class="site-footer"><p>Prepared for Dr. Plate’s Level 2A class · October 2026</p><p>Original teaching demos. Fictional examples are labeled. <a href="https://github.com/buildLittleWorlds/remotion-possibility-lab">Source and asset credits ↗</a></p></footer></main></div><script type="module" src="./src/main.tsx"></script></body></html>`;
  await writeFile(p.file, html + "\n");
}
await writeFile(
  "public/favicon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#203cb4"/><text x="15" y="46" font-size="42" font-family="Arial" font-weight="bold" fill="#fff7e8">R</text></svg>',
);
console.log(`Generated ${pages.length} HTML lesson pages.`);
