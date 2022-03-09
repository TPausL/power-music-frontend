import { Box } from "@mui/system";
import { withBoundingRects, WithBoundingRectsProps } from "@visx/bounds";
import { Drag, raise } from "@visx/drag";
import { DragProps } from "@visx/drag/lib/Drag";
import { Group } from "@visx/group";
import { LinkVerticalCurve } from "@visx/shape";
import { map } from "lodash";
import React, { useEffect, useState } from "react";
import ListSvg from "../MoveableList/ListSvg";
import { usePlaylists } from "../PlaylistsProvider";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";
interface Node {
  pos: [number, number];
  list: Playlist;
}

interface Link {
  source: Node;
  target: Node;
  direction: "left" | "right" | "both";
}

function Workspace2() {
  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        height: "70vh",
        width: 1,
        position: "relative",
        userSelect: "none",
        "& text": {
          pointerEvents: "none",
        },
      }}
    >
      <svg width="100%" height="100%" style={{ backgroundColor: "aliceblue" }}>
        <GraphContainer />
      </svg>
    </Box>
  );
}

const GraphContainer = withBoundingRects(
  ({ parentRect }: WithBoundingRectsProps) => {
    const { playlists } = usePlaylists();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [links, setLinks] = useState<Link[]>([]);
    useEffect(() => {
      const ns = map(
        playlists,
        (list): Node => ({
          pos: [0, 0],
          list,
        })
      );
      setNodes(ns);
      if (ns.length) {
        setLinks([
          { source: ns[0], target: ns[1], direction: "both" },
          { source: ns[1], target: ns[2], direction: "both" },
          { source: ns[3], target: ns[4], direction: "both" },
        ]);
      }
    }, [playlists]);

    /*  useEffect(() => {
      console.log(nodes);
      setLinks([{ source: nodes[0], target: nodes[1], direction: "both" }]);
    }, [nodes]); */
    return (
      <Group>
        {links.map((l, i) => {
          console.log(l);
          return (
            <LinkVerticalCurve
              key={i}
              percent={0.5}
              stroke="rgb(254,110,158,0.6)"
              strokeWidth="5"
              fill="none"
              data={l}
              source={(link: Link) => link.source}
              target={(link: Link) => link.target}
              x={(node: Node) => node.pos[0] + 104}
              y={(node: Node) => node.pos[1] + 117 / 2}
            />
          );
        })}
        {nodes.map((n, i) => (
          <Draggable
            key={n.list.id}
            onDragStart={() => {
              setNodes(raise(nodes, i));
            }}
            width={parentRect?.width ?? 0}
            height={parentRect?.height ?? 0}
            node={n}
            onPositionChange={(pos) => {
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
);

interface DragableProps extends Partial<DragProps>, WithBoundingRectsProps {
  node: Node;
  width: number;
  height: number;
  onPositionChange?: (pos: [number, number]) => void;
}

const Draggable = withBoundingRects(
  ({ node, width, height, onPositionChange, rect, ...rest }: DragableProps) => {
    return (
      <Drag
        restrict={{
          xMin: (rect?.width ?? 0) / 2,
          yMin: (rect?.height ?? 0) / 2,
          xMax: width - (rect?.width ?? 0) / 2,
          yMax: height - (rect?.height ?? 0) / 2,
        }}
        width={width}
        height={height}
        onDragMove={(args) => {
          onPositionChange && onPositionChange([args.dx, args.dy]);
        }}
        {...rest}
      >
        {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => {
          return (
            <Group
              transform={`translate(${dx},${dy})`}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              onMouseDown={dragStart}
              width={208}
              height={117}
            >
              <ListSvg list={node.list}></ListSvg>
            </Group>
          );
        }}
      </Drag>
    );
  }
);

export default Workspace2;
