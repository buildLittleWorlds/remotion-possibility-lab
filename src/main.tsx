import type { DemoKind } from "./model";
import "./site.css";
const node = document.querySelector<HTMLElement>("#demo-root");
window.remotion_staticBase = new URL(
  ".",
  window.location.href,
).pathname.replace(/\/$/, "");
if (node)
  Promise.all([import("react"), import("react-dom/client"), import("./Demo")])
    .then(([React, { createRoot }, { Demo }]) =>
      createRoot(node).render(
        React.createElement(Demo, { kind: node.dataset.demo as DemoKind }),
      ),
    )
    .catch(() => {
      node.textContent =
        "The demo could not load. Reload to try again; the explanation and prompts remain available.";
    });
const selectSnippet = (button: HTMLButtonElement) => {
  const code = button.closest(".prompt, .terminal")?.querySelector("code");
  if (!code) return;
  const range = document.createRange();
  range.selectNodeContents(code);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    const text =
      button.closest(".prompt, .terminal")?.querySelector("code")
        ?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      selectSnippet(button);
      button.textContent = "Selected — Ctrl+C if needed";
    } catch {
      selectSnippet(button);
      button.textContent = "Selected — Ctrl+C / ⌘C";
    }
  }),
);
document
  .querySelectorAll<HTMLButtonElement>("[data-filter]")
  .forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelectorAll("[data-filter]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      document
        .querySelectorAll<HTMLElement>(".idea")
        .forEach(
          (card) =>
            (card.hidden =
              button.dataset.filter !== "all" &&
              card.dataset.category !== button.dataset.filter),
        );
    }),
  );
document
  .querySelectorAll<HTMLButtonElement>("[data-select]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      selectSnippet(button);
      button.textContent = "Selected — Ctrl+C / ⌘C";
    });
  });
const planner = document.querySelector<HTMLFormElement>("#planner");
planner?.addEventListener("input", () => {
  const values = new FormData(planner);
  const output = document.querySelector("#planner-prompt code");
  if (output)
    output.textContent = `@Remotion I’m new to Remotion and would like beginner-friendly guidance. I want to make ${values.get("idea") || "[my idea]"} for ${values.get("audience") || "[my audience]"}. I have ${values.get("assets") || "[my available assets]"}. Help me choose one small first version. Explain what Remotion would do and what inputs we need. Start with a short plan, then build only the first working preview. After I inspect it, we can decide what to add.`;
});

if (window.matchMedia("(max-width:800px)").matches)
  document.querySelector(".chapter-nav")?.removeAttribute("open");
planner?.addEventListener("submit", (event) => event.preventDefault());
