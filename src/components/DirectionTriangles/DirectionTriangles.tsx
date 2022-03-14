import React, { SVGProps } from "react";
import { Vector } from "tpausl-linear-algebra";
import { Bezier, BezierDerivative, getBezierControlPoints } from "../../utils";
import Triangle from "../Triangle";

export interface DirectionTrianglesProps
  extends Omit<SVGProps<SVGPathElement>, "from" | "to" | "slope"> {
  from: Vector;
  to: Vector;
  direction: "source" | "target";
  size?: number;
}
export default function DirectionTriangles(props: DirectionTrianglesProps) {
  const { from, to, direction, size = 15, ...rest } = props;
  const factor = direction === "source" ? -1 : 1;
  const controls = getBezierControlPoints(
    from.asArray() as [number, number],
    to.asArray() as [number, number]
  );

  const point = (x: number) =>
    new Vector(
      Bezier(
        x,
        from.asArray() as [number, number],
        to.asArray() as [number, number],
        controls[0],
        controls[1]
      ) as [number, number]
    );
  const slope = (x: number) => {
    const p = new Vector(
      BezierDerivative(
        x,
        from.asArray() as [number, number],
        to.asArray() as [number, number],
        controls[0],
        controls[1]
      ) as [number, number]
    );
    return p[1] / p[0];
  };
  const getData = (
    x: number
  ): { point: Vector; slope: number; turn: boolean } => {
    return {
      point: point(x),
      slope: slope(x),
      turn: point(x - 0.001)[0] < point(x + 0.001)[0],
    };
  };
  return (
    <>
      <Triangle
        {...getData(0.5 + factor * 0.2)}
        {...{ direction, size }}
        {...rest}
      />
      <Triangle
        {...getData(0.5 + factor * 0.25)}
        {...{ direction, size }}
        {...rest}
      />
      <Triangle
        {...getData(0.5 + factor * 0.29)}
        {...{ direction, size }}
        {...rest}
      />
    </>
  );
}
