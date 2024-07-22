import { svgPathBbox } from "svg-path-bbox";

const Centered = ({ d }: { d: string }) => {
  const bbox = svgPathBbox(d);
  const [w, h] = [bbox[2] - bbox[0], bbox[3] - bbox[1]];
  const [left, top] = [bbox[0], bbox[1]];
  return (
    <g transform={`translate(${-(left + 0.5 * w)} ${-(top + 0.5 * h)} )`}>
      <path d={d} vectorEffect="non-scaling-stroke" />
      {/* <rect
        x={bbox[0]}
        y={bbox[1]}
        width={w}
        height={h}
        stroke="red"
        strokeWidth={0.1}
        fill="none"
      /> */}
    </g>
  );
};

export default Centered;
