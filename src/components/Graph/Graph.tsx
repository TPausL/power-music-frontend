import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import { raise } from "@visx/drag";
import { Group } from "@visx/group";
import { compact, find, map } from "lodash";
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
export default withBoundingRects(Graph);
