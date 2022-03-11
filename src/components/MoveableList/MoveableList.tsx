import { withBoundingRects } from "@visx/bounds";
import { WithBoundingRectsProps } from "@visx/bounds/lib/enhancers/withBoundingRects";
import Drag, { DragProps } from "@visx/drag/lib/Drag";
import { Group } from "@visx/group";
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
  return (
    <Drag
      snapToPointer
      dx={node.initPos[0]}
      dy={node.initPos[1]}
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
            <ListSvg list={node.list} />
          </Group>
        );
      }}
    </Drag>
  );
}

export default withBoundingRects(MoveableList);
