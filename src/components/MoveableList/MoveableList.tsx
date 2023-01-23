import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import { useDrag } from "@visx/drag";
import Drag, { DragProps, HandlerArgs } from "@visx/drag/lib/Drag";
import { MouseTouchOrPointerEvent } from "@visx/drag/lib/useDrag";
import { Group } from "@visx/group";
import { re } from "mathjs";
import { memo, useCallback, useEffect, useState } from "react";
import { Node } from "../Graph/Graph";
import ListSvg from "./ListSvg";

interface DragableProps extends Partial<DragProps>, WithBoundingRectsProps {
  node: Node;
  width: number;
  height: number;
  onPositionChange?: (pos: [number, number]) => void;
  lineStartHandler: (event: MouseTouchOrPointerEvent) => void;
}

function MoveableList({
  node,
  width,
  height,
  onPositionChange,
  rect,
  ...rest
}: DragableProps) {
  const bounds = {
    xMin: 0,
    yMin: 0,
    xMax: width - 208,
    yMax: height - 117,
  };

  
  return (
    <>
    <Drag
      snapToPointer={false}
      dx={node.initPos[0]}
      dy={node.initPos[1]}
      restrict={bounds}
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
            x={x}
            y={y}
            transform={`translate(${dx},${dy})`}
            onMouseMove={(e) => {
                dragMove(e)
                //@ts-ignore
               if(e.nativeEvent.layerY <=  5 || e.nativeEvent.layerX <= 5){
                dragEnd(e)
               }
              
            }}
            onMouseUp={dragEnd}
            onMouseDown={(e) => {
              //@ts-ignore
              if(e.target.id != "drag_start"){
              dragStart(e)}
            }}
            width={208}
            height={117}
          >
            <circle id="drag_start" fill="red" r="30" cy={117/2} onClick={(e) => {e.stopPropagation(); console.log("kreis")}} onMouseDown={rest.lineStartHandler} />
            <ListSvg list={node.list} />
          </Group>
        );
      }}
    </Drag>
    </>
  );
}

export default memo(withBoundingRects(MoveableList));
