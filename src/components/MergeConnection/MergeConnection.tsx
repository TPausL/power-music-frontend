// @ts-nocheck
import { useTheme } from "@mui/system";
import React from "react";
import { Vector } from "tpausl-linear-algebra";
import DirectionTriangles from "../DirectionTriangles";
import { Link } from "../Graph/Graph";
import Line from "../Line";

export interface MergeConnectionProps {
  link: Link;
}
export default function MergeConnection(props: MergeConnectionProps) {
  const { link: l } = props;
  const theme = useTheme();
  const color = theme.palette.info.main;
  const s = new Vector(l.source.pos).add(new Vector(208 / 2, 117 / 2));
  const t = new Vector(l.target.pos).add(new Vector(208 / 2, 117 / 2));

  return (
    <>
      <Line from={s} to={t} stroke={color} strokeWidth="5" fill="none" />
      {(l.direction === "right" || l.direction === "both") && (
        <DirectionTriangles
          from={s}
          to={t}
          direction={"target"}
          stroke={color}
        />
      )}

      {(l.direction === "left" || l.direction === "both") && (
        <DirectionTriangles
          from={s}
          to={t}
          direction={"source"}
          stroke={color}
        />
      )}
    </>
  );
}
