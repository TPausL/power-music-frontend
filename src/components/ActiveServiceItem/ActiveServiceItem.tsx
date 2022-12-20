import {
  faChevronDown,
  faChevronUp,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";

export type ActiveServiceItemProps = {
  name: string;
  user: {
    name: string;
    email: string;
    icon?: string;
  };
  refresh?: () => void;
};
export default function ActiveServiceItem(props: ActiveServiceItemProps) {
  const [open, setOpen] = React.useState(false);
  const { name, user, refresh } = props;
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
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
        <FontAwesomeIcon icon={open ? "chevron-up" : "chevron-down"} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemAvatar sx={{ minWidth: 56 }}>
              <Avatar src={user?.icon}>{user?.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={user?.email}>{user?.name}</ListItemText>
            {refresh && (
              <ListItemSecondaryAction>
                <IconButton
                  onClick={refresh}
                  color="secondary"
                  edge="end"
                  sx={{ mr: 0.25 }}
                >
                  <FontAwesomeIcon icon="refresh" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

/**
 * 
 * 
 * <ListItemAvatar sx={{ minWidth: 56 }}>
                  <Avatar src={user?.icon}>{user?.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText secondary={user?.email}>
                  {user?.name}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton color="secondary" edge="end" sx={{ mr: 0.25 }}>
                    <FontAwesomeIcon icon={faRefresh} />
                  </IconButton>
                </ListItemSecondaryAction>
 */
