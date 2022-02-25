import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { ServiceUser } from "../UserProvider/UserProvider";
export interface SkeletonItemProps {
  user: ServiceUser;
  icon: IconProp;
}
function SkeletonItem(props: SkeletonItemProps) {
  const { user, icon } = props;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {" "}
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
          <Avatar sx={{ bgcolor: "success.main" }}>
            {" "}
            <FontAwesomeIcon color={"white"} icon={icon} size={"lg"} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          sx={{ display: "flex", alignItems: "center" }}
        >
          {user.name}
          <Avatar
            sx={{
              bgcolor: "transparent",
              width: 8,
              height: 8,
              ml: 0.5,
            }}
          >
            {""}
          </Avatar>
        </ListItemText>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <>
              <ListItemAvatar sx={{ minWidth: 56 }}>
                <Avatar src={user.image}>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText secondary={user.email}>{user.name}</ListItemText>
              {/* <ListItemSecondaryAction>
                <IconButton color="secondary" edge="end" sx={{ mr: 0.25 }}>
                  <FontAwesomeIcon icon={faRefresh} />
                </IconButton>
              </ListItemSecondaryAction> */}
            </>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default SkeletonItem;
