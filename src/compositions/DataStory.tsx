import { AbsoluteFill, useCurrentFrame } from "remotion";
import { datasets, dataProgress } from "../model";
export type DataProps = { dataset: string };
export const DataStory = ({ dataset }: DataProps) => {
  const frame = useCurrentFrame(),
    progress = dataProgress(frame),
    rows = datasets[dataset === "B" ? "B" : "A"];
  return (
    <AbsoluteFill
      style={{
        background: "#f2eee3",
        color: "#172c28",
        fontFamily: "Arial, sans-serif",
        padding: "48px 70px",
      }}
    >
      <p
        style={{ fontSize: 21, letterSpacing: 3, color: "#487367", margin: 0 }}
      >
        FICTIONAL DATA / SET {dataset}
      </p>
      <h1 style={{ fontSize: 61, margin: "17px 0 12px" }}>
        How much time did we read?
      </h1>
      <p style={{ fontSize: 25, margin: 0 }}>
        Example reading minutes · same scale, different values
      </p>
      <svg
        viewBox="0 0 1120 420"
        style={{ width: "100%", marginTop: 22 }}
        aria-label="Animated horizontal bar chart"
      >
        {[0, 10, 20, 30].map((n) => (
          <g key={n}>
            <line
              x1={230 + n * 25}
              x2={230 + n * 25}
              y1={34}
              y2={326}
              stroke="#b8c4b8"
              strokeWidth="2"
            />
            <text
              x={230 + n * 25}
              y={366}
              textAnchor="middle"
              fill="#34574c"
              fontSize="25"
            >
              {n}
            </text>
          </g>
        ))}
        {rows.map((row, i) => (
          <g key={row.label}>
            <text x="0" y={92 + i * 100} fontSize="34" fill="#172c28">
              {row.label}
            </text>
            <rect
              x={230}
              y={50 + i * 100}
              width={row.value * 25 * progress}
              height="62"
              rx="8"
              fill={["#215d4a", "#d37b35", "#5a5cb1"][i]}
            />
            <text
              x={250 + row.value * 25 * progress}
              y={91 + i * 100}
              fontSize="32"
              fill="#172c28"
            >
              {Math.round(row.value * progress)}
            </text>
          </g>
        ))}
        <text x="605" y="411" fontSize="23" textAnchor="middle" fill="#34574c">
          Minutes (0–30)
        </text>
      </svg>
      <p style={{ fontSize: 22, margin: 0 }}>
        Made-up examples for learning. This is not a class survey.
      </p>
    </AbsoluteFill>
  );
};
