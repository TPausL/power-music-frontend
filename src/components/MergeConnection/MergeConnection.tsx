import { useTheme } from "@mui/system";
import { LinkHorizontalLine } from "@visx/shape";
import { add } from "mathjs";
import React from "react";
import { Vector } from "tpausl-linear-algebra";
import {
  Bezier,
  BezierDerivative,
  getBezierControlPoints,
  Link,
  Node,
} from "../Graph/Graph";
import Triangle from "../Triangle";

export interface MergeConnectionProps {
  link: Link;
}
export default function MergeConnection(props: MergeConnectionProps) {
  const { link: l } = props;
  const theme = useTheme();

  //const BezierDerivative = useMemo(() => derivative(,"t"), [])
  const s = new Vector(l.source.pos).add(new Vector(208 / 2, 117 / 2));
  const t = new Vector(l.target.pos).add(new Vector(208 / 2, 117 / 2));
  const con = s.subtract(t);
  const mid = s.add(t).divide(2);
  const controls = getBezierControlPoints(
    s.asArray() as [number, number],
    t.asArray() as [number, number]
  );

  const point = (x: number) =>
    new Vector(
      Bezier(
        x,
        s.asArray() as [number, number],
        t.asArray() as [number, number],
        controls[0],
        controls[1]
      ) as [number, number]
    );
  const slope = (x: number) => {
    const p = new Vector(
      BezierDerivative(
        x,
        s.asArray() as [number, number],
        t.asArray() as [number, number],
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

  const color = theme.palette.info.main;
  return (
    <>
      <LinkHorizontalLine
        path={(link: Link) => {
          const s = add(link.source.pos, [104, 117 / 2]) as [number, number];
          const t = add(link.target.pos, [104, 117 / 2]) as [number, number];
          const [p1, p2] = getBezierControlPoints(s, t);
          return `M ${s[0]} ${s[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${t[0]} ${t[1]}`;
        }}
        key={Math.random()}
        stroke={color}
        strokeWidth="5"
        fill="none"
        data={l}
        source={(link: Link) => link.source}
        target={(link: Link) => link.target}
        x={(node: Node) => node.pos[0]}
        y={(node: Node) => node.pos[1]}
      />
      {(l.direction === "right" || l.direction === "both") && (
        <>
          <Triangle
            size={16}
            {...getData(0.7)}
            direction="target"
            stroke={color}
          />
          <Triangle
            size={16}
            {...getData(0.75)}
            direction="target"
            stroke={color}
          />
          <Triangle
            size={16}
            {...getData(0.79)}
            direction="target"
            stroke={color}
          />
        </>
      )}

      {(l.direction === "left" || l.direction === "both") && (
        <>
          <Triangle
            size={16}
            {...getData(0.3)}
            direction="source"
            stroke={color}
          />
          <Triangle
            size={16}
            {...getData(0.25)}
            direction="source"
            stroke={color}
          />
          <Triangle
            size={16}
            {...getData(0.21)}
            direction="source"
            stroke={color}
          />
        </>
      )}
    </>
  );
}
