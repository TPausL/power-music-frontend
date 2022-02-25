import {
  Divider,
  Drawer,
  List,
  ListItemAvatar,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { difference, map } from "lodash";
import React from "react";
import InactiveServiceItem from "../InactiveServiceItem";
import ServiceItem from "../ServiceItems/ServiceItem";
import { useUser } from "../UserProvider";
import { services } from "../UserProvider/UserProvider";

export interface SidebarProps {}
export default function Sidebar(props: SidebarProps) {
  const drawerWidth = 300;
  const user = useUser();
  const unusedServices = difference(services, map(user.services, "service"));
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItemAvatar></ListItemAvatar>
        <ListSubheader sx={{ fontSize: "1.5rem" }}>Services</ListSubheader>
        {user.services.length > 0 && (
          <>
            <ListSubheader>Connected</ListSubheader>
            {user.services.map((s) => (
              <ServiceItem user={s} />
            ))}
          </>
        )}
        {unusedServices.length > 0 && (
          <>
            <Divider />
            <ListSubheader>Available</ListSubheader>
            {unusedServices.map((s) => (
              <InactiveServiceItem service={s} />
            ))}
          </>
        )}
        <Divider />
      </List>
    </Drawer>
  );
}
