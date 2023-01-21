import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import { raise } from "@visx/drag";
import { Group } from "@visx/group";
import { compact, filter, find, map } from "lodash";
import React, { useEffect, useState } from "react";
import MergeConnection from "../MergeConnection";
import { useMerges } from "../MergesProvider";
import MoveableList from "../MoveableList";
import { usePlaylists } from "../PlaylistsProvider";
import { Playlist } from "../../api";
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

      
      const ns = map(filter(playlists, {hidden: false}) as Playlist[], (list): Node => {

          const rX = Math.random()*sizeX;
          const rY =Math.random()*sizeY;

      
        const pos: [number, number] = [rX, rY];
        return {
          pos,
          initPos: pos,
          list,
        };
      });
      setNodes(ns);
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
