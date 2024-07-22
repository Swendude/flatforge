"use client";

import Dragable from "./Dragable";
import Grid from "./Grid";

import { useState } from "react";
import Centered from "./Centered";

const SvgCanvas = ({ size }: { size: number }) => {
  const [step, setStep] = useState(10);
  const viewBox = (w: number) => `${w * -0.5} ${w * -0.5} ${w} ${w}`;
  const [paths, setPaths] = useState<{ [key: string]: string }>({
    head: "M 73.601851,69.838956 A 22.436988,22.436989 0 0 1 51.164862,92.275945 22.436988,22.436989 0 0 1 28.727873,69.838956 22.436988,22.436989 0 0 1 51.164862,47.401967 22.436988,22.436989 0 0 1 73.601851,69.838956 Z",
    body: "m 138.15086,108.39445 c -6.63246,7.53905 -11.42722,17.37655 -16.19314,24.91133 -0.34761,1.59213 1.44216,4.03848 3.1049,3.31164 3.15114,-1.19535 8.34771,-5.65554 11.93014,-8.37193 0.18088,0.21622 0.69365,0.91889 0.95735,1.77386 0.56913,1.84545 -1.44485,14.86482 0.92284,40.40351 l 6.98776,0.0287 c 1.06729,-5.51273 7.17623,-18.41955 7.31211,-18.57597 0.13588,-0.1563 0.10266,-0.27469 1.17865,-0.27422 1.07604,4.8e-4 1.04276,0.11792 1.17861,0.27422 0.13589,0.15626 6.24484,13.06324 7.31216,18.57597 l 6.98776,-0.0287 c 2.36768,-25.53869 0.35389,-38.55806 0.9228,-40.40351 0.26391,-0.85497 0.77654,-1.55766 0.95735,-1.77386 3.58245,2.71639 8.77901,7.17658 11.93017,8.37193 1.66271,0.72684 3.45248,-1.71951 3.10487,-3.31164 -4.76595,-7.53478 -9.56065,-17.37228 -16.19316,-24.91133 v 3.9e-4 c -2.1196,-2.40954 -16.20056,-2.81893 -16.20056,-2.81893 0,0 -14.08096,0.40939 -16.20061,2.81893 z",
  });
  return (
    <>
      <svg viewBox={viewBox(size)} className="aspect-square w-[400px]">
        <rect
          className="h-full w-full fill-muted-foreground"
          x={-size * 0.5}
          y={-size * 0.5}
        ></rect>
        <Grid size={size} step={step} />
        <Dragable rounding={step} y={-9 * step} scale={3}>
          <Centered d={paths["head"]!} />
        </Dragable>
        <Dragable rounding={step} y={6 * step} scale={3}>
          <Centered d={paths["body"]!} />
        </Dragable>
      </svg>
      <p>Size: {step}</p>
      <button onClick={() => setStep((step) => step + 5)}>size + </button>
      <button onClick={() => setStep((step) => step - 5)}>size - </button>
    </>
  );
};

export default SvgCanvas;
