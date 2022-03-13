import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import { raise } from "@visx/drag";
import { Group } from "@visx/group";
import { compact, find, map } from "lodash";
import { add, multiply } from "mathjs";
import React, { useEffect, useState } from "react";
import MergeConnection from "../MergeConnection";
import { useMerges } from "../MergesProvider";
import MoveableList from "../MoveableList";
import { usePlaylists } from "../PlaylistsProvider";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";
export interface Node {
  initPos: [number, number];
  pos: [number, number];
  list: Playlist;
}

export interface Link {
  source: Node;
  target: Node;
  direction: "left" | "right" | "both";
}

export interface GraphProps extends WithBoundingRectsProps {}
function Graph({ parentRect }: GraphProps) {
  const { playlists } = usePlaylists();
  const { merges } = useMerges();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  useEffect(() => {
    const sizeX = (parentRect?.width ?? 0) - 208;
    const sizeY = (parentRect?.height ?? 0) - 117;

    const width = Math.ceil(sizeX / 208);
    const height = Math.ceil(sizeY / 117);

    if (width > 0 && height > 0) {
      let grid: boolean[][] = new Array(height)
        .fill(null)
        .map(() => new Array(width).fill(null));

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          grid[i][j] = true;
        }
      }
      const ns = map(playlists, (list): Node => {
        let x = 0,
          y = 0;
        while (x <= 0 && y <= 0) {
          const rX = Math.ceil(Math.random() * width);
          const rY = Math.floor(Math.random() * height);
          if (grid[rY][rX]) {
            x = rX * 208;
            y = rY * 117;
            grid[rY][rX] = false;
          }
        }
        const pos: [number, number] = [x, y];
        return {
          pos,
          initPos: pos,
          list,
        };
      });
      setNodes(ns);
    }
  }, [playlists, parentRect]);
  useEffect(() => {
    const ls = map(merges, (merge): Link | undefined => {
      const source = find(nodes, (n) => n.list.id === merge.left.id);
      const target = find(nodes, (n) => n.list.id === merge.right.id);
      if (source && target) {
        return {
          direction: merge.direction,
          source,
          target,
        };
      }
      return undefined;
    });
    setLinks(compact(ls));
  }, [merges, nodes]);
  return (
    <Group>
      {links.map((l, i) => (
        <MergeConnection link={l} />
      ))}
      {nodes.map((n, i) => (
        <MoveableList
          key={n.list.id}
          onDragStart={() => {
            setNodes(raise(nodes, i));
          }}
          width={parentRect?.width ?? 0}
          height={parentRect?.height ?? 0}
          node={n}
          onPositionChange={(pos: [number, number]) => {
            let l = nodes.pop();
            if (l) {
              l.pos = pos;
              setNodes([...nodes, l]);
            }
          }}
        />
      ))}
    </Group>
  );
}

export const getBezierControlPoints = (
  a: [number, number],
  b: [number, number]
): [[number, number], [number, number]] => {
  const a0 = [0, 0];
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
export default withBoundingRects(Graph);
