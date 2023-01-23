import { Box } from "@mui/system";
import { useDrag } from "@visx/drag";
import React, { useCallback, useState } from "react";
import { Vector } from "tpausl-linear-algebra";
import Graph from "../Graph";
import Line from "../Line";
function Workspace() {

  const [line, setLine] = useState<{from: Vector, to: Vector} | undefined>();

  const onLineDragStart = useCallback((currDrag) => {
    setLine({from: new Vector(currDrag.x,currDrag.y), to: new Vector(currDrag.x,currDrag.y)})
  },[setLine])
  const onLineDragMove = useCallback((drag) => {
    console.log("moveeee")
    console.log(drag)
    setLine(l => {

      return {from: l?.from as Vector, to: new Vector(drag.x + drag.dx, drag.y + drag.dy)}
    })
    
  }, [setLine])

   const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart: lineDragStart,
    dragEnd: lineDragEnd,
    dragMove: lineDragMove,
    
  } = useDrag({
    onDragStart: onLineDragStart,
    onDragMove: onLineDragMove,
    onDragEnd: () => setLine(undefined),
    resetOnStart: true,
  });



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
      <svg width="100%" height="100%" style={{ backgroundColor: "aliceblue" }}  onMouseUp={lineDragEnd} onMouseMove={e => {lineDragMove(e); console.log("mov")}}>
        {line &&
          <Line arrows="source" from={line.to} to={line.from} color="red" stroke={"red"} strokeWidth="5" fill="none" />
        }
        <Graph lineStartHandler={lineDragStart} />
      </svg>
    </Box>
  );
}

export default Workspace;
