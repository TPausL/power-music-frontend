import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import { raise } from "@visx/drag";
import { Group } from "@visx/group";
import { LinkHorizontalLine } from "@visx/shape";
import { compact, find, map } from "lodash";
import { add, divide, norm } from "mathjs";
import React, { useEffect, useState } from "react";
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

  const normalize = (v: [number, number]): [number, number] => {
    return [v[0] / (norm(v) as number), v[1] / (norm(v) as number)];
  };
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
      {links.map((l, i) => {
        const connection: [number, number] = add(
          l.source.pos,
          l.target.pos
        ) as [number, number];
        const mid: [number, number] = divide(connection, 2) as [number, number];
        const nc: [number, number] = normalize(connection);
        console.log(nc);

        const nn = [nc[1], nc[0]];
        return (
          <>
            <LinkHorizontalLine
              path={(link: Link) => {
                const s = add(link.source.pos, [104, 117 / 2]) as [
                  number,
                  number
                ];
                const t = add(link.target.pos, [104, 117 / 2]) as [
                  number,
                  number
                ];
                const [p2, p1] = getBezierControlPoints(s, t);
                return `M ${s[0]} ${s[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${t[0]} ${t[1]}`;
              }}
              key={i}
              //percent={0.5}
              stroke="rgb(254,110,158,0.6)"
              strokeWidth="5"
              fill="none"
              data={l}
              source={(link: Link) => link.source}
              target={(link: Link) => link.target}
              x={(node: Node) => node.pos[0] + 104}
              y={(node: Node) => node.pos[1] + 117 / 2}
            />
            {l.direction && (
              <polygon
                points={`${(add(mid, divide(1 / 30, nc)) as number[]).join(
                  ","
                )}, ${(add(mid, divide(1 / 30, nn)) as number[]).join(",")}, ${(
                  add(mid, divide(-1 / 30, nn)) as number[]
                ).join(",")}`}
              />
            )}
          </>
        );
      })}
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

const getBezierControlPoints = (
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
  const c1 = [b0r[0] / 6, b0r[0] / 6];
  const c2 = [(5 * b0r[0]) / 6, -b0r[0] / 6];

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

export default withBoundingRects(Graph);
