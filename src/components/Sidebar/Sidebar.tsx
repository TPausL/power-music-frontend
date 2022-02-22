import {
  Divider,
  Drawer,
  List,
  ListItemAvatar,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ServiceItem from "../ServiceItems/ServiceItem";

export interface SidebarProps {}
export default function Sidebar(props: SidebarProps) {
  const drawerWidth = 300;
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
        <ListSubheader>Connected</ListSubheader>
        <ServiceItem service="youtube" />
        <Divider />
        <ListSubheader>Available</ListSubheader>
        <Divider />
      </List>
    </Drawer>
  );
}
