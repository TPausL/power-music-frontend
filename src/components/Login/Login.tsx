import { Box, Button } from "@mui/material";
import React from "react";
import { useUser } from "../UserProvider";

export interface LoginProps {}
export default function Login(props: LoginProps) {
  const user = useUser();
  return (
    <Box sx={{ height: 1, width: 1, bgcolor: "primary.main" }}>
      <Button
        onClick={() => user.login("admin@admin.com", "password")}
        variant="contained"
      >
        test
      </Button>
    </Box>
  );
}
