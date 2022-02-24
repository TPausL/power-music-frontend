import axios from "axios";
import React, { useState } from "react";
import config from "../../config.json";
export type UserContextType = {
  data?: {
    id: string;
    name: string;
    email: string;
  };
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<void>;
};
export const UserContext = React.createContext<UserContextType>({
  isLoggedIn: () => false,
  login: () => new Promise(() => {}),
});
export interface UserProviderProps {
  children: React.ReactNode;
}
axios.defaults.baseURL = config.backend_uri;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState(undefined);
  const login = async (email: string, password: string) => {
    const params = new URLSearchParams();
    const redirect_uri = `http${config.self.https ? "s" : ""}://${
      config.self.host
    }:${config.self.port}/auth/callback`;
    console.log(redirect_uri);
    params.append("client_id", config.client_id);
    params.append("redirect_uri", redirect_uri);
    params.append("response_type", "code");
    try {
      const authRes = await axios.get("/oauth/authorize?" + params.toString(), {
        auth: { password, username: email },
      });
      const code = new URL(authRes.data.redirect_uri).searchParams.get("code");
      try {
        const tokenRes = await axios.post("/oauth/token", {
          grant_type: "authorization_code",
          code,
          client_id: config.client_id,
          client_secret: config.client_secret,
          redirect_uri,
        });
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + tokenRes.data.accessToken;
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: () => (user ? true : false),
        login,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
