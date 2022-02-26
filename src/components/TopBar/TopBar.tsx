import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import React from "react";

export interface TopBarProps {}
export default function TopBar(props: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ alignItems: "center" }}>
        <Avatar sx={{ p: 1, bgcolor: "transparent" }}>
          <img
            height="100%"
            width="100%"
            src="/logo_white.svg"
            alt="The logo"
          />
        </Avatar>
        <Typography variant="h4">Power Music</Typography>
      </Toolbar>
    </AppBar>
  );
}
