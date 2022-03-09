import { Box } from "@mui/system";
import { withBoundingRects, WithBoundingRectsProps } from "@visx/bounds";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { add, multiply } from "mathjs";
import React, { useEffect, useState } from "react";
import MoveableList from "../MoveableList";
import { usePlaylists } from "../PlaylistsProvider";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";

export interface WorkspaceProps extends WithBoundingRectsProps {}
function Workspace(props: WorkspaceProps) {
  const { rect } = props;
  const serverlists = usePlaylists().playlists;

  const [playlists, setPlayLists] = useState<Playlist[]>(serverlists);
  const [pos, setPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log("pos change");
  }, [pos]);

  useEffect(() => {
    setPlayLists(serverlists);
  }, [serverlists]);
  const Connect = (
    a: [number, number],
    b: [number, number]
  ): ((t: number) => [number, number]) => {
    const a0 = [0, 0];
    const b0 = [b[0] - a[0], b[1] - a[1]];

    const alpha = -Math.atan2(b[1] - a[1], b[0] - a[0]);

    const b0r = [
      a[0] * Math.cos(alpha) - a[1] * Math.sin(alpha),
      a[0] * Math.sin(alpha) + a[1] * Math.cos(alpha),
    ];

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

    return (t: number) => Bezier(t, a, b, crt1, crt2) as [number, number];
  };
  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        height: "70vh",
        width: 1,
        position: "relative",
        "& text": {
          pointerEvents: "none",
        },
      }}
    >
      <svg height={700} width={500}>
        <LinePath
          stroke="red"
          curve={curveLinear}
          x={(d) => (d as number[])[0]}
          y={(d) => (d as number[])[1]}
          data={new Array(100)
            .fill(null)
            .map((v, i) => Connect([100, 100], pos)(i / 100))}
          strokeWidth={5}
        />
        {playlists.map((l, i) => {
          return <MoveableList onPositionChange={setPos} key={i} list={l} />;
        })}
      </svg>
    </Box>
  );
}

export default withBoundingRects(Workspace);
function Bezier(
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
