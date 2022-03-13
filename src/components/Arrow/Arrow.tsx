import React from "react";
import { Vector } from "tpausl-linear-algebra";

export interface ArrowProps {
  points: [Vector, Vector, Vector];
  smoothness: number;
}
export default function Arrow(props: ArrowProps) {
  return <div></div>;
}
