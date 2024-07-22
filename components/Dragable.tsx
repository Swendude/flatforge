"use client";
import { useState, MouseEvent as ReactMouseEvent, ReactNode } from "react";

const Dragable = ({
  children,
  rounding = 20,
  x = 0,
  y = 0,
  scale = 1,
}: {
  children: ReactNode;
  rounding?: number;
  x?: number;
  y?: number;
  scale?: number;
}) => {
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    dragging: boolean;
    offset: { x: number; y: number };
  }>({
    x: x,
    y: y,
    dragging: false,
    offset: { x: 0, y: 0 },
  });

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
    setPosition((p) => ({
      ...p,
      x: round(position.x - (position.offset.x - x)),
      y: round(position.y - (position.offset.y - y)),
    }));
  };

  const dragEnd = () => {
    setPosition((p) => {
      return { ...p, dragging: false };
    });
  };

  const round = (num: number) => Math.round(num / rounding) * rounding;

  return (
    <g
      transform={`translate(${position.x} ${position.y}) scale(${scale})`}
      cx={position.x}
      cy={position.y}
      r={30}
      className="stroke-white stroke-1 hover:stroke-[3]"
      fill="white"
      fillOpacity={position.dragging ? 0.6 : 0.6}
      onPointerDown={dragStart}
      onPointerUp={dragEnd}
      onPointerMove={dragging}
    >
      {children}
    </g>
  );
};

export default Dragable;
