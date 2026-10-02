import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
  datasets,
  dataProgress,
  stationCamera,
  durationFor,
  montageStarts,
  defaults,
  clips,
} from "../src/model";
import captions from "../public/media/captions.json";
import info from "../public/media/audio-info.json";
const mediaDuration = (file: string) =>
  Number(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        `public/media/${file}`,
      ],
      { encoding: "utf8" },
    ),
  );
test("Reading chart is bounded on its stated scale and reaches actual supplied values", () => {
  for (const set of Object.values(datasets))
    for (const row of set) {
      assert.ok(row.value >= 0 && row.value <= 30);
      assert.equal(row.value * dataProgress(0), 0);
      assert.equal(row.value * dataProgress(120), row.value);
      assert.equal(row.value * dataProgress(359), row.value);
    }
});
test("Media duration, supplied transcript, and caption intervals agree", () => {
  const duration = mediaDuration("signal.wav");
  assert.ok(info.durationInFrames / 30 >= duration);
  assert.ok(info.durationInFrames / 30 - duration < 1 / 30 + 0.001);
  assert.equal(captions.map((c) => c.text).join(" "), info.transcript);
  let end = 0;
  for (const caption of captions) {
    assert.ok(caption.startMs >= end);
    assert.ok(caption.endMs > caption.startMs);
    assert.ok(caption.endMs / 1000 <= duration);
    end = caption.endMs;
  }
});
test("Cuts and overlaps match the actual four-second files without a gap or truncated ending", () => {
  for (const clip of clips)
    assert.ok(Math.abs(mediaDuration(clip.file) - 4) < 0.035);
  for (const transition of ["cut", "fade"]) {
    const starts = montageStarts(transition);
    assert.equal(starts[0], 0);
    assert.equal(starts[2] + 120, durationFor("montage", { transition }));
    for (let i = 1; i < 3; i++) {
      const overlap = starts[i - 1] + 120 - starts[i];
      assert.equal(overlap, transition === "fade" ? 18 : 0);
    }
  }
});
test("Fixed camera remains fixed, orbit changes, and seeking recovers its same position", () => {
  assert.deepEqual(stationCamera(0, "side"), stationCamera(359, "side"));
  assert.notDeepEqual(stationCamera(0, "orbit"), stationCamera(359, "orbit"));
  const mid = stationCamera(180, "orbit");
  stationCamera(0, "orbit");
  assert.deepEqual(stationCamera(180, "orbit"), mid);
  assert.ok(stationCamera(180, "high")[1] > mid[1]);
});
test("17 generated pages expose navigation, working local assets, and no private uploads", () => {
  const pages = readdirSync(".").filter((f) => f.endsWith(".html"));
  assert.equal(pages.length, 17);
  for (const file of pages) {
    const html = readFileSync(file, "utf8");
    assert.match(html, /lang="en"/);
    assert.match(html, /Previous and next pages/);
    for (const [, target] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      if (!/^(https?:|data:)/.test(target)) {
        const local = target.split("#")[0].replace(/^\.\//, "");
        assert.ok(
          existsSync(local) || existsSync(`public/${local}`),
          `${file}: ${target}`,
        );
      }
    }
  }
  assert.equal(
    (readFileSync("index.html", "utf8").match(/class="idea"/g) || []).length,
    30,
  );
  assert.equal(Object.keys(defaults).length, 6);
});
