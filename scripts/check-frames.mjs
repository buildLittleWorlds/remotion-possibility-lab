import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill, openBrowser } from "@remotion/renderer";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const browser = await openBrowser("chrome", {
  chromiumOptions: { gl: "angle" },
});
await mkdir("verification/frames", { recursive: true });
const wanted = process.argv.slice(2);
const results = wanted.length
  ? JSON.parse(
      await readFile("verification/rendered-frames.json", "utf8"),
    ).filter((row) => !wanted.includes(row.id))
  : [];
try {
  const compositions = await getCompositions(serveUrl, {
    puppeteerInstance: browser,
    chromiumOptions: { gl: "angle" },
  });
  for (const composition of compositions.filter(
    (c) => !wanted.length || wanted.includes(c.id),
  )) {
    for (const frame of [
      0,
      Math.floor(composition.durationInFrames / 2),
      composition.durationInFrames - 1,
    ]) {
      const output = `verification/frames/${composition.id}-${frame}.png`;
      await renderStill({
        serveUrl,
        composition,
        frame,
        output,
        puppeteerInstance: browser,
        chromiumOptions: { gl: "angle" },
        imageFormat: "png",
      });
      results.push({ id: composition.id, frame, output });
      if (composition.id === "MiniatureStation" && frame === 180)
        await (
          await import("node:fs/promises")
        ).copyFile(output, "public/media/station-poster.png");
      console.log(`${composition.id}: frame ${frame} verified`);
    }
  }
  await writeFile(
    "verification/rendered-frames.json",
    JSON.stringify(results, null, 2) + "\n",
  );
} finally {
  await browser.close({ silent: true });
}
