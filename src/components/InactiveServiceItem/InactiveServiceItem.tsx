import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

export type InactiveServiceItemProps = {
  name: string;
  login: () => void;
};
export default function InactiveServiceItem(props: InactiveServiceItemProps) {
  const { name, login } = props;

  return (
    <>
      <ListItem>
        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
          <Avatar
            sx={{
              bgcolor: "error.main",
              width: 24,
              height: 24,
            }}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText>{name}</ListItemText>
        <ListItemSecondaryAction>
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}
