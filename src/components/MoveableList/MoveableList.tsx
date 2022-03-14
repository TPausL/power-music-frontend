import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import Drag, { DragProps } from "@visx/drag/lib/Drag";
import { Group } from "@visx/group";
import { memo } from "react";
import { Node } from "../Graph/Graph";
import ListSvg from "./ListSvg";

interface DragableProps extends Partial<DragProps>, WithBoundingRectsProps {
  node: Node;
  width: number;
  height: number;
  onPositionChange?: (pos: [number, number]) => void;
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
    <Drag
      snapToPointer={false}
      dx={node.initPos[0]}
      dy={node.initPos[1]}
      restrict={bounds}
      width={width}
      height={height}
      onDragMove={(args) => {
        //console.log(args);
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
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseDown={dragStart}
            width={208}
            height={117}
          >
            <ListSvg list={node.list} />
          </Group>
        );
      }}
    </Drag>
  );
}

export default memo(withBoundingRects(MoveableList));
