import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
export type MakerProps = { title: string; palette: string };
export const EventMaker = ({ title, palette }: MakerProps) => {
  const frame = useCurrentFrame(),
    colors =
      palette === "sunset"
        ? ["#6b2c36", "#ffe7bb", "#fb9377"]
        : ["#183eb4", "#f9f3df", "#b8e8fe"];
  const phase = frame < 120 ? 0 : frame < 240 ? 1 : 2,
    local = frame % 120;
  return (
    <AbsoluteFill
      style={{
        background: colors[0],
        color: colors[1],
        fontFamily: "Arial, sans-serif",
        padding: 68,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          border: "3px solid " + colors[2],
          borderRadius: "50%",
          right: -40,
          top: -110,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          border: "3px solid " + colors[2],
          borderRadius: "50%",
          right: 90,
          bottom: 70,
        }}
      />
      <p style={{ fontSize: 24, letterSpacing: 4, color: colors[2] }}>
        FICTIONAL CLUB / YOUR VIDEO TEMPLATE
      </p>
      <div
        style={{
          opacity: interpolate(local, [0, 18, 108, 119], [0, 1, 1, 0]),
          translate: `0px ${interpolate(local, [0, 25], [25, 0], { extrapolateRight: "clamp" })}px`,
        }}
      >
        <h1
          style={{
            fontSize: phase === 0 ? (title.length > 30 ? 70 : 91) : 80,
            lineHeight: 1.05,
            margin: "15px 0",
            maxWidth: 950,
            overflowWrap: "anywhere",
          }}
        >
          {[title, "Look up. Ask questions.", "Join us Friday."][phase]}
        </h1>
        <p style={{ fontSize: 32, color: colors[2] }}>
          {
            [
              "One template. Your words.",
              "Bring your curiosity.",
              "Example announcement · not a real event",
            ][phase]
          }
        </p>
      </div>
    </AbsoluteFill>
  );
};
