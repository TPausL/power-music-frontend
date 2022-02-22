import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

export default function Bars() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
