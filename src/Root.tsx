import { Composition } from "remotion";
import { Story } from "./compositions/Story";
import { DataStory } from "./compositions/DataStory";
import { AudioClip } from "./compositions/AudioClip";
import { Montage } from "./compositions/Montage";
import { Station } from "./compositions/Station";
import { EventMaker } from "./compositions/EventMaker";
import audioInfo from "../public/media/audio-info.json";
export const RemotionRoot = () => (
  <>
    <Composition
      id="MessageFromMars"
      component={Story}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ headline: "A message from Mars", motion: "gentle" }}
    />
    <Composition
      id="ReadingData"
      component={DataStory}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ dataset: "A" }}
    />
    <Composition
      id="SignalAudiogram"
      component={AudioClip}
      durationInFrames={audioInfo.durationInFrames}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ captionStyle: "card" }}
    />
    <Composition
      id="FootageMontage"
      component={Montage}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ order: "ABC", transition: "cut" }}
      calculateMetadata={({ props }) => ({
        durationInFrames: props.transition === "fade" ? 324 : 360,
      })}
    />
    <Composition
      id="MiniatureStation"
      component={Station}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ angle: "orbit", speed: 1 }}
    />
    <Composition
      id="ClubAnnouncement"
      component={EventMaker}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ title: "Night Sky Club", palette: "blue" }}
    />
  </>
);
