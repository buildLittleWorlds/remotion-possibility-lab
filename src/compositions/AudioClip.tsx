import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  useWindowedAudioData,
  visualizeAudioWaveform,
} from "@remotion/media-utils";
import captions from "../../public/media/captions.json";
export type AudioProps = { captionStyle: string };
export const AudioClip = ({ captionStyle }: AudioProps) => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  const { audioData, dataOffsetInSeconds } = useWindowedAudioData({
    src: staticFile("media/signal.wav"),
    frame,
    fps,
    windowInSeconds: 30,
  });
  const waveform = audioData
    ? visualizeAudioWaveform({
        fps,
        frame,
        audioData,
        dataOffsetInSeconds,
        numberOfSamples: 128,
        windowInSeconds: 0.3,
      })
    : [];
  const active = captions.find(
    (c) => (frame / fps) * 1000 >= c.startMs && (frame / fps) * 1000 < c.endMs,
  );
  return (
    <AbsoluteFill
      style={{
        background: "#251b42",
        color: "#faf4ff",
        fontFamily: "Arial, sans-serif",
        padding: 65,
        alignItems: "center",
      }}
    >
      <Audio
        name="Original synthetic narration"
        src={staticFile("media/signal.wav")}
      />
      <p
        style={{ fontSize: 24, letterSpacing: 3, color: "#c4a7f3", margin: 0 }}
      >
        VOICE → WAVEFORM → WORDS
      </p>
      <h1 style={{ fontSize: 67, margin: "26px 0 20px" }}>
        Make a sound visible.
      </h1>
      <svg
        viewBox="0 0 1120 170"
        style={{ width: "100%", height: 170, marginTop: 30 }}
        aria-label="Waveform sampled from this audio"
      >
        <line x1="0" x2="1120" y1="85" y2="85" stroke="#796798" />
        <polyline
          points={waveform
            .map(
              (y, i) => `${(i / (waveform.length - 1)) * 1120},${85 + y * 180}`,
            )
            .join(" ")}
          fill="none"
          stroke="#c2ff95"
          strokeWidth="5"
        />
      </svg>
      <div
        style={{
          fontSize: captionStyle === "card" ? 48 : 41,
          lineHeight: 1.25,
          textAlign: "center",
          padding: "24px 34px",
          minHeight: 174,
          width: "100%",
          boxSizing: "border-box",
          borderRadius: 22,
          background: captionStyle === "card" ? "#f4edff" : "transparent",
          color: captionStyle === "card" ? "#251b42" : "#f4edff",
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {active?.text || "Listen, then inspect the timing."}
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: 20,
          color: "#c4a7f3",
        }}
      >
        Standard synthetic voice · original sample script · no cloned voice
      </p>
    </AbsoluteFill>
  );
};
