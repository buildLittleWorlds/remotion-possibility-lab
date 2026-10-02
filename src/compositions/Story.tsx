import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { motionValue } from "../model";
export type StoryProps = { headline: string; motion: string };
export const Story = ({ headline, motion }: StoryProps) => {
  const frame = useCurrentFrame(),
    phase = frame < 120 ? 0 : frame < 240 ? 1 : 2,
    local = frame % 120;
  return (
    <AbsoluteFill
      style={{
        background: "#101c32",
        color: "#fdf8eb",
        fontFamily: "Arial, sans-serif",
        padding: 72,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -60,
          top: 90,
          width: 390,
          height: 390,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #ffc287, #dd583d 45%, #77394a 85%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 48,
          fontSize: 23,
          letterSpacing: 4,
          color: "#96b7d1",
        }}
      >
        TRANSMISSION / 0{phase + 1}
      </div>
      <div
        style={{
          opacity: interpolate(local, [0, 20, 105, 119], [0, 1, 1, 0]),
          translate: `${motionValue(local, motion) * 50}px 0px`,
          position: "relative",
          maxWidth: 840,
        }}
      >
        <p style={{ fontSize: 26, letterSpacing: 3, color: "#ffab7f" }}>
          {["01 / LISTEN", "02 / DISCOVER", "03 / RESPOND"][phase]}
        </p>
        <h1
          style={{
            fontSize: phase === 0 ? (headline.length > 30 ? 70 : 90) : 78,
            lineHeight: 1.02,
            margin: "18px 0",
            overflowWrap: "anywhere",
          }}
        >
          {
            [headline, "Someone is listening.", "What will you send back?"][
              phase
            ]
          }
        </h1>
        <p style={{ fontSize: 30, maxWidth: 650, color: "#b9cbe0" }}>
          A fictional story told with words, shape, and time.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: 72,
          right: 72,
          height: 5,
          background: "#33485c",
        }}
      >
        <div
          style={{
            width: `${(frame / 359) * 100}%`,
            height: 5,
            background: "#ef8b60",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
