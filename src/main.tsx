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
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    const text =
      button.closest(".prompt")?.querySelector("code")?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select the text below to copy";
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
const planner = document.querySelector<HTMLFormElement>("#planner");
planner?.addEventListener("input", () => {
  const values = new FormData(planner);
  const output = document.querySelector("#planner-prompt code");
  if (output)
    output.textContent = `@Remotion I’m a Level 2A student. I want to make ${values.get("idea") || "[my idea]"} for ${values.get("audience") || "[my audience]"}. I have ${values.get("assets") || "[my available assets]"}. Help me choose one small first version. Explain what Remotion would do and what inputs we need. Start with a short plan, then build only the first working preview. After I inspect it, we can decide what to add.`;
});

if (window.matchMedia("(max-width:800px)").matches)
  document.querySelector(".chapter-nav")?.removeAttribute("open");
planner?.addEventListener("submit", (event) => event.preventDefault());
