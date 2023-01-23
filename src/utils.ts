import { add, multiply } from "mathjs";

export const getBezierControlPoints = (
  a: [number, number],
  b: [number, number]
): [[number, number], [number, number]] => {
  const b0 = [b[0] - a[0], b[1] - a[1]];

  const alpha = -Math.atan2(b[1] - a[1], b[0] - a[0]);

  const b0r = [
    b0[0] * Math.cos(alpha) - b0[1] * Math.sin(alpha),
    b0[0] * Math.sin(alpha) + b0[1] * Math.cos(alpha),
  ];
  const c1 = [(5 * b0r[0]) / 6, -b0r[0] / 6];
  const c2 = [b0r[0] / 6, b0r[0] / 6];

  const cr1 = [
    c1[0] * Math.cos(-alpha) - c1[1] * Math.sin(-alpha),
    c1[0] * Math.sin(-alpha) + c1[1] * Math.cos(-alpha),
  ];
  const cr2 = [
    c2[0] * Math.cos(-alpha) - c2[1] * Math.sin(-alpha),
    c2[0] * Math.sin(-alpha) + c2[1] * Math.cos(-alpha),
  ];

  const crt1 = [cr1[0] + a[0], cr1[1] + a[1]] as [number, number];
  const crt2 = [cr2[0] + a[0], cr2[1] + a[1]] as [number, number];

  return [crt1, crt2];
};

export function Bezier(
  t: number,
  a: [number, number],
  b: [number, number],
  c1: [number, number],
  c2: [number, number]
) {
  return add(
    add(
      add(
        multiply((1 - t) ** 3, a),
        multiply(3, multiply(t, multiply((1 - t) ** 2, c1)))
      ),
      multiply(3, multiply(t ** 2, multiply(1 - t, c2)))
    ),
    multiply(t ** 3, b)
  );
}

export function BezierDerivative(
  t: number,
  a: [number, number],
  b: [number, number],
  c1: [number, number],
  c2: [number, number]
) {
  return add(
    add(
      multiply(3 * (1 - t) ** 2, add(c1, multiply(a, -1))),
      multiply(6 * (1 - t) * t, add(c2, multiply(c1, -1)))
    ),
    multiply(3 * t ** 2, add(b, multiply(c2, -1)))
  );
}


export function ellipsize(text: string, width: number) {
  if (text.length <= width - 3) {
    return text;
  }
  return text.substring(0, width - 3) + "..."
}