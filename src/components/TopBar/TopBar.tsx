import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export interface TopBarProps {}
export default function TopBar(props: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h4">Power Music</Typography>
      </Toolbar>
    </AppBar>
  );
}
