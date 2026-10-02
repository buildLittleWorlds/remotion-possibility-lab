import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { Story } from "./compositions/Story";
import { DataStory } from "./compositions/DataStory";
import { AudioClip } from "./compositions/AudioClip";
import { Montage } from "./compositions/Montage";
import { EventMaker } from "./compositions/EventMaker";
import {
  defaults,
  durationFor,
  FPS,
  clips,
  montageStarts,
  type DemoKind,
} from "./model";
const Station = lazy(() => import("./compositions/Station"));
const titles = {
  story: "Message from Mars",
  data: "Reading minutes",
  audio: "Signal audiogram",
  montage: "Three-clip montage",
  station: "Station 01",
  maker: "Club announcement",
};
const StationFallback = ({ unavailable = true }: { unavailable?: boolean }) => (
  <div className="fallback">
    <img
      src="./media/station-poster.png"
      alt="A still of Station 01, showing a central module, blue solar panels, and an orange ring"
    />
    <p>
      {unavailable
        ? "This browser could not show the 3D preview. The still shows the same model. Continue with the explanation and prompts below."
        : "Still preview: the same model at frame 180. Choose Interactive to use the camera and rotation controls."}
    </p>
  </div>
);
class DemoBoundary extends React.Component<
  { children: React.ReactNode; kind: DemoKind },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      this.props.kind === "station" ? (
        <StationFallback />
      ) : (
        <p role="alert">
          The preview could not load. Reload this page to try again; the
          explanation and build prompts are still available.
        </p>
      )
    ) : (
      this.props.children
    );
  }
}
export const Demo = ({ kind }: { kind: DemoKind }) => {
  const [props, setProps] = useState(defaults[kind]),
    [frame, setFrame] = useState(0),
    [playing, setPlaying] = useState(false),
    [ready, setReady] = useState(false),
    [webgl, setWebgl] = useState(true),
    [mode, setMode] = useState("interactive");
  const player = useRef<PlayerRef>(null),
    duration = durationFor(kind, props);
  const attach = useCallback((r: PlayerRef | null) => {
    player.current = r;
    setReady(!!r);
  }, []);
  const textOK =
    kind === "story"
      ? String(props.headline).trim().length > 0
      : kind === "maker"
        ? String(props.title).trim().length > 0
        : true;
  useEffect(() => {
    if (kind === "station") {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setWebgl(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    }
  }, [kind]);
  useEffect(() => {
    if (!ready) return;
    const current = player.current;
    if (!current) return;
    const update = (event: { detail: { frame: number } }) =>
        setFrame(event.detail.frame),
      play = () => setPlaying(true),
      pause = () => setPlaying(false);
    current.addEventListener("frameupdate", update);
    current.addEventListener("play", play);
    current.addEventListener("pause", pause);
    current.addEventListener("ended", pause);
    return () => {
      current.removeEventListener("frameupdate", update);
      current.removeEventListener("play", play);
      current.removeEventListener("pause", pause);
      current.removeEventListener("ended", pause);
    };
  }, [ready]);
  const change = (key: string, value: string | number) => {
    player.current?.pause();
    player.current?.seekTo(0);
    setPlaying(false);
    setFrame(0);
    setProps((p) => ({ ...p, [key]: value }));
  };
  const component: React.ComponentType<any> =
    kind === "story"
      ? Story
      : kind === "data"
        ? DataStory
        : kind === "audio"
          ? AudioClip
          : kind === "montage"
            ? Montage
            : kind === "station"
              ? Station
              : EventMaker;
  const select = (label: string, key: string, values: [string, string][]) => (
    <label>
      {label}
      <select
        value={String(props[key])}
        onChange={(e) => change(key, e.target.value)}
      >
        {values.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <section className="demo" aria-label={`${titles[kind]} interactive demo`}>
      <div className="demo-heading">
        <span className="live-dot" />
        <h2>Try it here</h2>
        <span className="demo-badge">
          Real Remotion · {kind === "audio" ? "7.3" : duration / 30} seconds
        </span>
      </div>
      <div className="demo-settings">
        {kind === "story" && (
          <>
            <label>
              Opening headline
              <input
                maxLength={48}
                value={String(props.headline)}
                onChange={(e) => change("headline", e.target.value)}
              />
            </label>
            {select("Motion", "motion", [
              ["gentle", "Gentle"],
              ["energetic", "Energetic"],
            ])}
          </>
        )}
        {kind === "data" &&
          select("Fictional dataset", "dataset", [
            ["A", "Set A: 12, 20, 8 minutes"],
            ["B", "Set B: 18, 10, 22 minutes"],
          ])}
        {kind === "audio" &&
          select("Caption treatment", "captionStyle", [
            ["card", "High-contrast card"],
            ["minimal", "Simple text"],
          ])}
        {kind === "montage" && (
          <>
            {select("Clip order", "order", [
              ["ABC", "A → B → C"],
              ["CBA", "C → B → A"],
              ["BAC", "B → A → C"],
            ])}
            {select("Between clips", "transition", [
              ["cut", "Hard cut · 12 seconds"],
              ["fade", "Crossfade · 10.8 seconds"],
            ])}
          </>
        )}
        {kind === "station" && (
          <>
            <label>
              Preview mode
              <select
                value={mode}
                onChange={(e) => {
                  player.current?.pause();
                  player.current?.seekTo(0);
                  setFrame(0);
                  setPlaying(false);
                  setMode(e.target.value);
                }}
              >
                <option value="interactive">Interactive 3D</option>
                <option value="still">Still image</option>
              </select>
            </label>
            {select("Camera", "angle", [
              ["orbit", "Moving orbit"],
              ["side", "Fixed side view"],
              ["high", "High orbit"],
            ])}
            <label>
              Station rotation
              <select
                value={String(props.speed)}
                onChange={(e) => change("speed", Number(e.target.value))}
              >
                <option value="0">Still</option>
                <option value="0.5">Half speed</option>
                <option value="1">Normal</option>
                <option value="2">Double speed</option>
              </select>
            </label>
          </>
        )}
        {kind === "maker" && (
          <>
            <label>
              Club name
              <input
                maxLength={48}
                value={String(props.title)}
                onChange={(e) => change("title", e.target.value)}
              />
            </label>
            {select("Palette", "palette", [
              ["blue", "Night blue"],
              ["sunset", "Sunset"],
            ])}
          </>
        )}
      </div>
      {!textOK && (
        <p className="setting-note" role="status">
          Enter a name or headline to play this version (up to 48 characters).
        </p>
      )}
      <p className="setting-note">
        Changing an input resets the preview, paused. Press Play to see your
        change.
      </p>
      <div className="preview" data-testid="preview">
        <DemoBoundary kind={kind}>
          {kind === "station" && (!webgl || mode === "still") ? (
            <StationFallback unavailable={!webgl} />
          ) : (
            <Suspense
              fallback={<p className="loading">Loading the 3D scene…</p>}
            >
              <Player
                ref={attach}
                component={component}
                inputProps={props}
                fps={FPS}
                durationInFrames={duration}
                compositionWidth={1280}
                compositionHeight={720}
                style={{ width: "100%" }}
                moveToBeginningWhenEnded={false}
                acknowledgeRemotionLicense
                renderLoading={() => (
                  <p className="loading">Preparing the preview…</p>
                )}
              />
            </Suspense>
          )}
        </DemoBoundary>
      </div>
      <div className="transport">
        <button
          className="primary"
          onClick={() =>
            playing ? player.current?.pause() : player.current?.play()
          }
          disabled={!ready || !textOK || mode === "still"}
        >
          {playing ? "Pause" : "Play"}
          <span aria-hidden="true"> {playing ? "Ⅱ" : "▶"}</span>
        </button>
        <button
          onClick={() => {
            player.current?.pause();
            player.current?.seekTo(0);
            setFrame(0);
            player.current?.play();
          }}
          disabled={!ready || !textOK || mode === "still"}
        >
          Replay
        </button>
        <output aria-live="off">
          {(frame / FPS).toFixed(1)} / {(duration / FPS).toFixed(1)} s
        </output>
      </div>
      <label className="scrubber">
        Inspect the timeline
        <input
          aria-label="Inspect the timeline"
          type="range"
          min="0"
          max={duration - 1}
          value={frame}
          onChange={(e) => {
            player.current?.pause();
            player.current?.seekTo(Number(e.target.value));
            setFrame(Number(e.target.value));
            setPlaying(false);
          }}
          disabled={!ready || mode === "still"}
        />
        <span>Frame {frame} · 30 frames per second</span>
      </label>
      {kind === "audio" && (
        <p className="setting-note">
          Sound begins only when you press Play. Narration: “Signal received. A
          tiny sound can become a visible story. Keep the words readable, and
          let the waveform follow the voice.”
        </p>
      )}
      {kind === "montage" && (
        <div className="timeline-panel">
          <h3>Source footage → your edit</h3>
          <div className="source-strip">
            {clips.map((c) => (
              <div key={c.id}>
                <strong>Source {c.id}</strong>
                <span>
                  {c.sourceStart}–{c.sourceEnd} s in the original
                </span>
              </div>
            ))}
          </div>
          <div className="edit-strip">
            {String(props.order)
              .split("")
              .map((id, i) => (
                <div key={id}>
                  <strong>Clip {id}</strong>
                  <span>
                    Starts at{" "}
                    {(montageStarts(String(props.transition))[i] / FPS).toFixed(
                      1,
                    )}{" "}
                    s
                  </span>
                </div>
              ))}
          </div>
          <p>
            Each source excerpt is 4 seconds. Crossfades overlap by 0.6 seconds:
            12 − 0.6 − 0.6 = 10.8 seconds.
          </p>
        </div>
      )}
    </section>
  );
};
