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
import { useTheme } from "@mui/system";

interface CommonProps {
  name: string;
}

export type ActiveProps = {
  active: true;
  user: {
    name: string;
    email: string;
    icon?: string;
  };
  login?: () => void;
};
export type InactiveProps = {
  active?: false;
  login: () => void;
  user?: {
    name: string;
    email: string;
    icon?: string;
  };
};

export type ServiceItemProps = CommonProps & (ActiveProps | InactiveProps);
export default function ServiceItem(props: ServiceItemProps) {
  const { name, active, login, user } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
          <Avatar
            sx={{
              bgcolor: active ? "success.main" : "error.main",
              width: 24,
              height: 24,
            }}
          >
            {""}
          </Avatar>
        </ListItemAvatar>
        <ListItemText>{name}</ListItemText>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            {active ? (
              <>
                <ListItemAvatar sx={{ minWidth: 56 }}>
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
              </>
            ) : (
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            )}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
