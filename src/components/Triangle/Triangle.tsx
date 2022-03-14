import { SVGProps } from "react";
import { Vector } from "tpausl-linear-algebra";

export interface TriangleProps extends SVGProps<SVGPathElement> {
  point: Vector;
  slope: number;
  direction: "source" | "target";
  size?: number;
  turn?: boolean;
}
export default function Triangle(props: TriangleProps) {
  const { point, direction, slope, size = 30, turn, ...rest } = props;
  const slopeV = new Vector(1, slope)
    .normalize()
    .scale(turn ? -1 : 1)
    .scale(direction === "source" ? -1 : 1);
  const normalV = slopeV.getPerpendicular().normalize();
  return (
    <>
      <path
        d={`M ${point
          .add(slopeV.scale(size).add(normalV.scale(size)))
          .array.join(" ")} L ${point.array.join(" ")} ${point
          .add(slopeV.scale(size).add(normalV.scale(-size)))
          .array.join(" ")}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeWidth={size / 5}
        {...rest}
      />
    </>
  );
}
