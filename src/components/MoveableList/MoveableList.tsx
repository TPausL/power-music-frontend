import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import Draggable from "react-draggable";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";
export interface MoveableListProps {
  list: Playlist;
}
export default function MoveableList(props: MoveableListProps) {
  const { list } = props;
  const { source, title, count, thumbnail } = list;
  const theme = useTheme();
  return (
    <Draggable bounds="parent">
      <Card
        sx={{
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          p: 2,
          position: "absolute",
          background: `linear-gradient(45deg, ${theme.palette[source].main}, ${theme.palette[source].light})`,
          width: 16 * 11,
          height: 9 * 11,
        }}
      >
        <FontAwesomeIcon
          size="4x"
          color="white"
          icon={["fab", source]}
          style={{
            position: "absolute",
            right: -20,
            top: "30%",
            transform: "rotate(10deg)",
          }}
        />
        <img
          style={{ borderRadius: "50%" }}
          src={thumbnail}
          height={(9 * 11) / 2.5}
          width={(9 * 11) / 2.5}
          alt="thumbnail"
        />
        <Typography
          variant="body1"
          fontWeight={"900"}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 0.8,
            ml: 1,
            mt: -0.5,
          }}
          color={"white"}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 0.7,
            fontSize: "0.9rem",
            ml: 1,
            mt: -0.5,
          }}
          color={"white"}
        >
          {count} Songs
        </Typography>
        <Box
          sx={{
            position: "absolute",
            borderRadius: "50%",
            height: 9 * 7,
            width: 9 * 7,
            bottom: (-9 * 7) / 2,
            left: (-9 * 7) / 2,
            bgcolor: "info.main",
            "&:hover": {
              cursor: "grab",
            },
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        />
      </Card>
    </Draggable>
  );
}
