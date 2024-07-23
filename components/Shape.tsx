import { createUseEnsureContext } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  useId,
  useReducer,
  useState,
} from "react";
import { svgPathBbox } from "svg-path-bbox";
import Dragable from "./Dragable";
import { useCanvasContext } from "./CanvasContext";
import { init } from "next/dist/compiled/webpack/webpack";

type Coords = {
  x: number;
  y: number;
};

type State = {
  id: string;
  d: string;
  scale: number;
  bbox: [number, number, number, number];
  position: Coords;
  drag: {
    enabled: boolean;
  };
};

type Action = {
  type: "Position_set";
  payload: Coords;
};

const context = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "Position_set":
      return { ...state, position: action.payload };
  }
};

export const useShapeContext = createUseEnsureContext(context);

const Shape = ({
  d,
  initial,
}: {
  d: string;
  initial?: Partial<Omit<State, "d">>;
}) => {
  const shapeId = useId();
  const bbox = svgPathBbox(d);
  const [state, dispatch] = useReducer(reducer, {
    scale: 1,
    position: {
      x: 0,
      y: 0,
    },
    id: shapeId,
    d: d,
    bbox: bbox,
    drag: {
      enabled: true,
    },
    ...initial,
  });
  return (
    <context.Provider value={{ state, dispatch }}>
      <Render />
    </context.Provider>
  );
};

const Render = ({ centered = true }: { centered?: boolean }) => {
  const {
    state: { position, d, bbox, id },
  } = useShapeContext();
  const {
    state: { boundingBoxes },
  } = useCanvasContext();

  const [w, h] = [bbox[2] - bbox[0], bbox[3] - bbox[1]];
  const [left, top] = [bbox[0], bbox[1]];

  return (
    // <g
    //   id="positioning"
    //   transform={`translate(${position.x} ${position.y})`}

    // >
    <Dragable>
      <g
        id="centering"
        transform={`translate(${-(left + 0.5 * w)} ${-(top + 0.5 * h)})`}
        className="fill-muted-foreground stroke-background opacity-80  group-hover:stroke-2"
      >
        {boundingBoxes && (
          <rect
            x={bbox[0]}
            y={bbox[1]}
            width={bbox[2] - bbox[0]}
            height={bbox[3] - bbox[1]}
            className="fill-none stroke-muted-foreground stroke-1"
            stroke="red"
            strokeWidth={1}
            fill="none"
          />
        )}
        <path id={id} d={d} vectorEffect="non-scaling-stroke" />
      </g>
    </Dragable>
  );
};

export default Shape;
