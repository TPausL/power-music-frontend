import { LinkHorizontalLine } from "@visx/shape";
import { LinkHorizontalLineProps } from "@visx/shape/lib/shapes/link/line/LinkHorizontalLine";
import { AddSVGProps } from "@visx/shape/lib/types";
import React from "react";
import { Vector } from "tpausl-linear-algebra";
import { getBezierControlPoints } from "../../utils";

export interface LineProps
  extends Omit<
    AddSVGProps<
      LinkHorizontalLineProps<{ from: Vector; to: Vector }, Vector>,
      SVGPathElement
    >,
    "from" | "to" | "data"
  > {
  from: Vector;
  to: Vector;
  arrows?: "source" | "target" | "both";
}
export default function Line(props: Omit<LineProps, "data">) {
  const { from, to, ...rest } = props;
  return (
    <LinkHorizontalLine
      {...rest}
      path={(data) => {
        const s = data.from.array as [number, number];
        const t = data.to.array as [number, number];
        const [p1, p2] = getBezierControlPoints(s, t);
        return `M ${s[0]} ${s[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${t[0]} ${t[1]}`;
      }}
      key={Math.random()}
      data={{ from, to }}
      source={(data) => data.from}
      target={(data) => data.to}
      x={(pos: Vector) => pos[0]}
      y={(pos: Vector) => pos[1]}
    />
  );
}
