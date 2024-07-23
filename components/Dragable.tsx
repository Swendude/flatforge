"use client";
import { useState, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Centered from "./Centered";
import { useShapeContext } from "./Shape";
import { useCanvasContext } from "./CanvasContext";

const MovePath = () => (
  <g transform="translate(-12 -12) ">
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <line x1="12" x2="12" y1="2" y2="22" />
  </g>
);

const Dragable = ({ children }: { children: ReactNode }) => {
  const {
    state: { gridCountI, gridCounts, size },
  } = useCanvasContext();
  const { state, dispatch } = useShapeContext();
  const [position, setPosition] = useState<{
    dragging: boolean;
    offset: { x: number; y: number };
  }>({
    dragging: false,
    offset: { x: 0, y: 0 },
  });

  const rounding = size / gridCounts[gridCountI]!;

  const dragStart = (event: React.PointerEvent<SVGElement>) => {
    event.preventDefault();
    const el = event.currentTarget;
    const bbox = el.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    el.setPointerCapture(event.pointerId);

    setPosition((p) => ({ ...p, dragging: true, offset: { x, y } }));
  };

  const dragging = (event: React.PointerEvent<SVGElement>) => {
    if (!position.dragging) return;
    const bbox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    dispatch({
      type: "Position_set",
      payload: {
        x: round(state.position.x - (position.offset.x - x)),
        y: round(state.position.y - (position.offset.y - y)),
      },
    });
  };

  const dragEnd = () => {
    setPosition((p) => {
      return { ...p, dragging: false };
    });
  };

  const round = (num: number) => Math.round(num / rounding) * rounding;

  return (
    <g
      transform={`translate(${state.position.x} ${state.position.y})`}
      onPointerDown={dragStart}
      onPointerUp={dragEnd}
      onPointerMove={dragging}
      className="group"
    >
      {children}

      <g className="pointer-events-none invisible scale-75 fill-muted-foreground stroke-muted-foreground group-hover:visible">
        <MovePath />
      </g>
    </g>
  );
};

export default Dragable;
