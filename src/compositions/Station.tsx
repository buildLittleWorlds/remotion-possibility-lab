import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { stationCamera } from "../model";
export type StationProps = { angle: string; speed: number };
const CameraAim = ({ angle }: { angle: string }) => {
  const frame = useCurrentFrame(),
    { camera, invalidate } = useThree();
  useLayoutEffect(() => {
    camera.position.set(...stationCamera(frame, angle));
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    invalidate();
  }, [frame, angle, camera, invalidate]);
  return null;
};
export const Station = ({ angle, speed }: StationProps) => {
  const frame = useCurrentFrame(),
    { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: "#061326",
        color: "#effaff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 3, 9], fov: 42 }}
      >
        <CameraAim angle={angle} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 7, 4]} intensity={3} />
        <pointLight position={[-4, 1, 0]} intensity={25} color="#67ddff" />
        <group rotation={[0.14, frame * 0.006 * speed, 0.07]}>
          <mesh>
            <cylinderGeometry args={[0.75, 0.75, 2.4, 24]} />
            <meshStandardMaterial
              color="#edf1f5"
              metalness={0.6}
              roughness={0.35}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 5.8, 16]} />
            <meshStandardMaterial color="#b1bfcc" />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <sphereGeometry args={[0.7, 24, 16]} />
            <meshStandardMaterial
              color="#51bfd1"
              metalness={0.5}
              roughness={0.18}
            />
          </mesh>
          <mesh position={[-2.7, 0, 0]}>
            <boxGeometry args={[1.5, 0.12, 2.7]} />
            <meshStandardMaterial
              color="#2b59ac"
              metalness={0.45}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[2.7, 0, 0]}>
            <boxGeometry args={[1.5, 0.12, 2.7]} />
            <meshStandardMaterial
              color="#2b59ac"
              metalness={0.45}
              roughness={0.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.35, 0.085, 12, 64]} />
            <meshStandardMaterial color="#ffa577" />
          </mesh>
        </group>
      </ThreeCanvas>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 52,
          right: 52,
          pointerEvents: "none",
        }}
      >
        <p style={{ fontSize: 22, letterSpacing: 4, color: "#8bcbdc" }}>
          A WORLD MADE FROM SHAPES
        </p>
        <h1 style={{ fontSize: 58, margin: 0 }}>Station 01</h1>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 32,
          left: 52,
          fontSize: 23,
          color: "#b9d8e4",
        }}
      >
        Fictional model · camera: {angle} · rotation: {speed}×
      </p>
    </AbsoluteFill>
  );
};
export default Station;
