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

function EditPanel() {
  const {
    state: { size, gridCountI, gridCounts },
    dispatch,
  } = useCanvasContext();
  return (
    <div>
      <Label htmlFor="snapping">Snapping</Label>
      <ToggleGroup
        type="single"
        variant={"outline"}
        id="snapping"
        onValueChange={(value) => {
          dispatch({ type: "GridCountI_set", payload: Number(value) });
        }}
      >
        {gridCounts.map((count, i) => {
          return (
            <ToggleGroupItem key={i} value={i.toString()}>
              {size / count} pt
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
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
