import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useUser } from "../UserProvider";
import { Service } from "../UserProvider/UserProvider";

export type InactiveServiceItemProps = {
  service: Service;
};

export default function InactiveServiceItem(props: InactiveServiceItemProps) {
  const { service } = props;
  const user = useUser();
  return (
    <>
      <ListItem>
        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
          <Avatar
            sx={{
              bgcolor: "error.main",
              width: 36,
              height: 36,
            }}
          >
            <FontAwesomeIcon size="lg" icon={["fab", service]} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>{service}</ListItemText>
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            onClick={() => console.log("connect account")}
          >
            Login
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}
