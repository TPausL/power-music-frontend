import { Box } from "@mui/system";
import { curveBasis } from "@visx/curve";
import { Drag } from "@visx/drag";
import { LinePath } from "@visx/shape";
import React, { useState } from "react";
import { usePlaylists } from "../PlaylistsProvider";
import List from "./list";

export interface WorkspaceProps {}
export default function Workspace(props: WorkspaceProps) {
  const { playlists } = usePlaylists();

  const [pos, setPos] = useState<[number, number]>([0, 0]);

  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        height: "70vh",
        width: 1,
        position: "relative",
      }}
    >
      <svg style={{ height: "100%", width: "100%", position: "absolute" }}>
        <LinePath
          stroke="red"
          curve={curveBasis}
          x={(d) => d[0] as number}
          y={(d) => d[1] as number}
          data={[[0, 0], pos]}
          strokeWidth={5}
        />
        {playlists.map((l) => (
          <Drag
            height={50}
            width={50}
            onDragMove={(args) => setPos([args.dx ?? 0, args.dy ?? 0])}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => {
              return (
                <List
                  list={l}
                  transform={`translate(${dx}, ${dy})`}
                  cx={x}
                  cy={y}
                  onMouseMove={dragMove}
                  onMouseUp={dragEnd}
                  onMouseDown={dragStart}
                />
              );
            }}
          </Drag>
        ))}
      </svg>
    </Box>
  );
}
