import { useTheme } from "@mui/system";
import { withBoundingRects, WithBoundingRectsProps } from "@visx/bounds";
import { Drag } from "@visx/drag";
import { DragProps } from "@visx/drag/lib/Drag";
import { Group } from "@visx/group";
import React, { useEffect, useState } from "react";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";
import ListSvg from "./ListSvg";

export interface MoveableListProps
  extends Partial<DragProps>,
    WithBoundingRectsProps {
  list: Playlist;
  onPositionChange?: (newPos: [number, number]) => void;
}
function MoveableList(props: MoveableListProps) {
  const { list, parentRect, onDragMove, onPositionChange, ...rest } = props;
  const { source, title, count, thumbnail } = list;
  const theme = useTheme();
  const [maxPos, setMaxPos] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    setMaxPos([parentRect?.width ?? 0, parentRect?.height ?? 0]);
  }, [parentRect]);
  return (
    <Drag
      key={list.id}
      height={parentRect?.height ?? 0}
      width={parentRect?.width ?? 0}
      captureDragArea={false}
      onDragMove={(args) => {
        onDragMove && onDragMove(args);
        if (onPositionChange) {
          const maxX = maxPos[0] - 117;
          const maxY = maxPos[1] - 208;

          const x = args.dx < 0 ? 0 : args.dx > maxX ? maxX : args.dx;
          const y = args.dy < 0 ? 0 : args.dy > maxY ? maxY : args.dy;
          onPositionChange([x, y]);
        }
      }}
      restrict={{
        xMin: 0,
        xMax: parentRect?.width ?? 0 - 208,
        yMin: 0,
        yMax: parentRect?.height ?? 0 - 117,
      }}
      {...rest}
    >
      {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
        <Group
          transform={(() => {
            const maxX = maxPos[0] - 208;
            const maxY = maxPos[1] - 117;
            return `translate(${dx < 0 ? 0 : dx > maxX ? maxX : dx}, ${
              dy < 0 ? 0 : dy > maxY ? maxY : dy
            })`;
          })()}
          onMouseMove={dragMove}
          onMouseUp={dragEnd}
          onMouseDown={dragStart}
        >
          <ListSvg list={list} />
        </Group>
      )}
    </Drag>
  );
}
export default withBoundingRects(MoveableList);
