import { mkdtemp, mkdir, cp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { bundle } from "@remotion/bundler";
const checks = [
  [
    "MessageFromMars",
    "Story",
    "Story",
    "headline:'A message from Mars',motion:'gentle'",
    360,
  ],
  ["ReadingData", "DataStory", "DataStory", "dataset:'A'", 360],
  ["SignalAudiogram", "AudioClip", "AudioClip", "captionStyle:'card'", 219],
  ["FootageMontage", "Montage", "Montage", "order:'ABC',transition:'cut'", 360],
  ["MiniatureStation", "Station", "Station", "angle:'orbit',speed:1", 360],
  [
    "ClubAnnouncement",
    "EventMaker",
    "EventMaker",
    "title:'Night Sky Club',palette:'blue'",
    360,
  ],
];
const root = await mkdtemp(join(tmpdir(), "remotion-lab-rehearsal-")),
  results = [];
for (const [id, file, component, props, duration] of checks) {
  const dir = join(root, id);
  await mkdir(dir);
  await cp("src", join(dir, "src"), { recursive: true });
  await cp("public", join(dir, "public"), { recursive: true });
  await cp("tsconfig.json", join(dir, "tsconfig.json"));
  await symlink(resolve("node_modules"), join(dir, "node_modules"));
  await writeFile(
    join(dir, "package.json"),
    JSON.stringify({
      name: `rehearsal-${id.toLowerCase()}`,
      private: true,
      type: "module",
    }),
  );
  await writeFile(
    join(dir, "src/Root.tsx"),
    `import {Composition} from 'remotion';import {${component}} from './compositions/${file}';export const RemotionRoot=()=> <Composition id="${id}" component={${component}} fps={30} durationInFrames={${duration}} width={1280} height={720} defaultProps={{${props}}}/>;`,
  );
  await bundle({ entryPoint: join(dir, "src/index.ts"), rootDir: dir });
  results.push({
    id,
    isolatedProject: dir,
    status: "compiled",
    kind: "source rehearsal; not a fresh ChatGPT conversation",
  });
  console.log(`${id}: isolated source project compiled`);
}
await writeFile(
  "verification/isolated-rehearsal.json",
  JSON.stringify(results, null, 2) + "\n",
);
