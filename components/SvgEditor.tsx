"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import SvgCanvas from "./SvgCanvas";
import { CanvasProvider, useCanvasContext } from "./CanvasContext";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Toggle } from "./ui/toggle";
import { Magnet, Scan } from "lucide-react";

function EditPanel() {
  const {
    state: { size, gridCountI, gridCounts, boundingBoxes },
    dispatch,
  } = useCanvasContext();
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label htmlFor="snapping" className="mb-1">
          Snapping
        </Label>
        <ToggleGroup
          type="single"
          variant={"outline"}
          id="snapping"
          value={gridCountI.toString()}
          onValueChange={(value) => {
            dispatch({ type: "GridCountI_set", payload: Number(value) });
          }}
        >
          {gridCounts.map((count, i) => {
            return (
              <ToggleGroupItem key={i} value={i.toString()}>
                {size / count} <Magnet className="m-1 inline w-4" />
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>
      <div>
        <Label htmlFor="bboxes" className=" mb-1 block">
          Show bounding boxes
        </Label>
        <Toggle
          variant={"outline"}
          id="bboxes"
          onPressedChange={() => dispatch({ type: "boundingBoxes_toggle" })}
          pressed={boundingBoxes}
        >
          <Scan />
        </Toggle>
      </div>
    </div>
  );
}

function SvgEditor() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Assemble</CardTitle>
        <CardDescription>Place the parts of your mini</CardDescription>
      </CardHeader>
      <CanvasProvider>
        <CardContent>
          <SvgCanvas />
        </CardContent>
        <CardFooter>
          <EditPanel />
        </CardFooter>
      </CanvasProvider>
    </Card>
  );
}

export default SvgEditor;
