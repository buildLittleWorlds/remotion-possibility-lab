import audioInfo from "../public/media/audio-info.json";
export type DemoKind =
  | "story"
  | "data"
  | "audio"
  | "montage"
  | "station"
  | "maker";
export const FPS = 30;
export const datasets = {
  A: [
    { label: "Comics", value: 12 },
    { label: "Novels", value: 20 },
    { label: "Poetry", value: 8 },
  ],
  B: [
    { label: "Comics", value: 18 },
    { label: "Novels", value: 10 },
    { label: "Poetry", value: 22 },
  ],
};
export const defaults: Record<DemoKind, Record<string, unknown>> = {
  story: { headline: "A message from Mars", motion: "gentle" },
  data: { dataset: "A" },
  audio: { captionStyle: "card" },
  montage: { order: "ABC", transition: "cut" },
  station: { angle: "orbit", speed: 1 },
  maker: { title: "Night Sky Club", palette: "blue" },
};
export const clips = [
  { id: "A", file: "bunny-a.mp4", sourceStart: 32, sourceEnd: 36 },
  { id: "B", file: "bunny-b.mp4", sourceStart: 43, sourceEnd: 47 },
  { id: "C", file: "bunny-c.mp4", sourceStart: 61, sourceEnd: 65 },
];
export const montageStarts = (transition: string) =>
  transition === "fade" ? [0, 102, 204] : [0, 120, 240];
export const durationFor = (kind: DemoKind, props: Record<string, unknown>) =>
  kind === "audio"
    ? audioInfo.durationInFrames
    : kind === "montage"
      ? props.transition === "fade"
        ? 324
        : 360
      : 360;
export const dataProgress = (frame: number) =>
  Math.max(0, Math.min(1, (frame - 30) / 90));
export const motionValue = (frame: number, mode: string) =>
  mode === "energetic" ? Math.sin(frame / 7) * Math.exp(-frame / 22) : 0;
export const stationCamera = (frame: number, angle: string) => {
  const theta = angle === "side" ? 0.6 : -0.65 + (frame / 360) * 1.3;
  return [
    Math.sin(theta) * 9,
    angle === "high" ? 6 : 3,
    Math.cos(theta) * 9,
  ] as [number, number, number];
};
