import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../UserProvider";

export interface LoginProps {}
export default function Login(props: LoginProps) {
  const user = useUser();
  const theme = useTheme();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (password && email) {
          user.login(email, password);
        }
      }
    });
  }, []);
  return (
    <div
      style={{
        background: "linear-gradient(45deg, #11b8ed, #3b8cf0)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        alt="sun"
        src="/sun.svg"
        style={{
          position: "absolute",
          objectFit: "cover",
          height: "32vh",
          width: "32vh",
          left: "-12vh",
          top: "-12vh",
        }}
      />
      <img
        alt="sun"
        src="/mountain.svg"
        style={{
          position: "absolute",
          objectFit: "cover",
          bottom: "0",
          height: "50vh",
        }}
      />
      <img
        alt="sun"
        src="/clouds.svg"
        style={{
          position: "absolute",
          objectFit: "cover",
          right: "0",
          height: "50vh",
        }}
      />
      <Box
        sx={{
          height: 1,
          width: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            height: 0.5,
            width: 0.3,
            bgcolor: "primary.main",
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            flexDirection: "column",
            alignItems: "space-around",
            justifyContent: "center",
            zIndex: 5,
            position: "relative",
          }}
        >
          <img
            alt="logo"
            src="/logo_white.svg"
            height="20%"
            style={{
              position: "absolute",
              right: 25,
              top: 20,
              transform: "rotate(15deg)",
            }}
          />
          <Typography
            fontWeight="bold"
            sx={{
              color: "#fff",
              fontSize: "4em",
              alignSelf: "center",
              //transform: "translateX(-25%)",
            }}
          >
            Login
          </Typography>
          <InputBase
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon
                  color={"#fff"}
                  size="2x"
                  style={{ marginRight: 8 }}
                  icon={faEnvelope}
                />
              </InputAdornment>
            }
            color="secondary"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            sx={{
              flex: 1,
              width: "60%",
              alignSelf: "center",
              margin: 2,
              fontSize: "1.25rem",
              border: "hidden",
              color: "secondary.main",
            }}
            title="email"
            type="email"
          ></InputBase>
          <InputBase
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon
                  color={"#fff"}
                  style={{ marginRight: 8 }}
                  size="2x"
                  icon={faKey}
                />
              </InputAdornment>
            }
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            sx={{
              flex: 1,
              width: 0.6,
              alignSelf: "center",
              margin: 2,
              fontSize: "1.25rem",
              minWidth: "20%",
              color: "secondary.main",
            }}
            color="secondary"
            title="email"
            type="password"
          />
          <div
            style={{
              flex: 3,
              width: "60%",
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                if (password && email) {
                  user.login(email, password);
                }
              }}
              variant="contained"
              color="secondary"
              style={{ height: "40%", width: "70%" }}
            >
              Login
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
