import { Box } from "@mui/system";
import React from "react";
import Graph from "../Graph";
function Workspace() {
  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        height: "70vh",
        width: 1,
        position: "relative",
        userSelect: "none",
        "& text": {
          pointerEvents: "none",
        },
      }}
    >
      <svg width="100%" height="100%" style={{ backgroundColor: "aliceblue" }}>
        <Graph />
      </svg>
    </Box>
  );
}

export default Workspace;
