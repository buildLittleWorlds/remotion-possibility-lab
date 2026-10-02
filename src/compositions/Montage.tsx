import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Video } from "@remotion/media";
import { montageStarts, clips } from "../model";
export type MontageProps = { order: string; transition: string };
const Clip = ({ id, fade }: { id: string; fade: boolean }) => {
  const frame = useCurrentFrame(),
    source = clips.find((c) => c.id === id)!;
  return (
    <AbsoluteFill
      style={{
        opacity: fade
          ? interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" })
          : 1,
      }}
    >
      <Video
        name={`Source ${id}`}
        src={staticFile(`media/${source.file}`)}
        muted
        objectFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};
export const Montage = ({ order, transition }: MontageProps) => {
  const frame = useCurrentFrame(),
    starts = montageStarts(transition),
    letters =
      order === "CBA"
        ? ["C", "B", "A"]
        : order === "BAC"
          ? ["B", "A", "C"]
          : ["A", "B", "C"];
  const active = frame >= starts[2] ? 2 : frame >= starts[1] ? 1 : 0;
  return (
    <AbsoluteFill
      style={{ background: "#071626", fontFamily: "Arial, sans-serif" }}
    >
      <Sequence name="First excerpt" from={0} durationInFrames={120}>
        <Clip id={letters[0]} fade={false} />
      </Sequence>
      <Sequence
        name="Second excerpt"
        from={transition === "fade" ? 102 : 120}
        durationInFrames={120}
      >
        <Clip id={letters[1]} fade={transition === "fade"} />
      </Sequence>
      <Sequence
        name="Third excerpt"
        from={transition === "fade" ? 204 : 240}
        durationInFrames={120}
      >
        <Clip id={letters[2]} fade={transition === "fade"} />
      </Sequence>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 32,
          color: "white",
          background: "#111a29e8",
          borderRadius: 12,
          padding: "14px 22px",
          fontSize: 29,
        }}
      >
        CLIP {letters[active]} ·{" "}
        {transition === "fade" ? "CROSSFADE" : "HARD CUT"}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 32px",
          background: "#061528e8",
          color: "white",
          fontSize: 21,
        }}
      >
        Excerpt remix · © 2008 Blender Foundation / www.bigbuckbunny.org · CC BY
        3.0
      </div>
    </AbsoluteFill>
  );
};
