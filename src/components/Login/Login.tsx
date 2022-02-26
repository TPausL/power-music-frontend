import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useUser } from "../UserProvider";

export interface LoginProps {}
export default function Login(props: LoginProps) {
  const user = useUser();
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    document.addEventListener("keypress", (e) => {
      console.log(e.key);
      if (e.key === "Enter") {
        user.login(email, password);
      }
    });
  }, []);
  return (
    <Box
      sx={{
        height: 1,
        width: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.main",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: 0.5,
          width: 0.3,
          bgcolor: "secondary.main",
          borderRadius: theme.shape.borderRadius,
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
        }}
      >
        <Typography
          style={{
            flex: 3,
            color: "#fff",
            textAlign: "center",
            fontSize: "4em",
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon color={"#fff"} icon={faEnvelope} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          style={{
            color: "#fff",
            flex: 1,
            width: "60%",
            alignSelf: "center",
            margin: theme.spacing(2),
          }}
          title="email"
          type="email"
        ></TextField>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon color={"#fff"} icon={faKey} />
              </InputAdornment>
            ),
          }}
          hidden
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            color: "#fff",
            flex: 1,
            width: "60%",
            alignSelf: "center",
            margin: theme.spacing(2),
          }}
          title="email"
          type="password"
        ></TextField>
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
            onClick={() => user.login(email, password)}
            variant="contained"
            color="primary"
            style={{ height: "40%", width: "70%" }}
          >
            Login
          </Button>
        </div>
      </Box>
    </Box>
  );
}
