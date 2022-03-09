import { Box } from "@mui/system";
import { withBoundingRects, WithBoundingRectsProps } from "@visx/bounds";
import { Drag, raise } from "@visx/drag";
import { DragProps } from "@visx/drag/lib/Drag";
import { Group } from "@visx/group";
import { LinkHorizontalLine, LinkVerticalCurve } from "@visx/shape";
import { map } from "lodash";
import { norm } from "mathjs";
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
            <LinkHorizontalLine
              path={(link: Link) => {
                const [p2, p1] = getControlPoints(
                  link.source.pos,
                  link.target.pos
                );
                return `M ${link.source.pos[0]} ${link.source.pos[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${link.target.pos[0]} ${link.target.pos[1]}`;
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

const getControlPoints = (
  a: [number, number],
  b: [number, number]
): [[number, number], [number, number]] => {
  /* if (norm(b) > norm(a)) {
    b = [a, (a = b)][0];
  } */
  const a0 = [0, 0];
  const b0 = [b[0] - a[0], b[1] - a[1]];

  const alpha = -Math.atan2(b[1] - a[1], b[0] - a[0]);

  const b0r = [
    a[0] * Math.cos(alpha) - a[1] * Math.sin(alpha),
    a[0] * Math.sin(alpha) + a[1] * Math.cos(alpha),
  ];

  console.log(Math.cos(alpha));

  const c1 = [b0r[0] / 3, b0r[0]];
  const c2 = [(2 * b0r[0]) / 3, -b0r[0]];

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
