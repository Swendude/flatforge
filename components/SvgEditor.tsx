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

export default function SvgEditor() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Assemble</CardTitle>
        <CardDescription>Place the parts of your mini</CardDescription>
      </CardHeader>
      <CardContent>
        <SvgCanvas size={400} />
      </CardContent>
      {/* <CardFooter>
        <p>{JSON.stringify(mouse)}</p>
      </CardFooter> */}
    </Card>
  );
}
