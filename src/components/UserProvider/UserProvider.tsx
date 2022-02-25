import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { omit } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";

export type UserContextType = {
  data?: User;
  services: ServiceUser[];
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  connectService: (service: Service) => Promise<void>;
  serviceCode: (service: Service, code: string) => Promise<void>;
  fetch: () => Promise<void>;
};
export const UserContext = React.createContext<UserContextType>({
  isLoggedIn: () => false,
  login: async () => undefined,
  connectService: async () => undefined,
  fetch: async () => undefined,
  serviceCode: async (code: string) => undefined,
  services: [],
});
export const services = ["youtube", "spotify"] as const;
export type Service = typeof services[number];
library.add(faSpotify, faYoutube);

export interface UserProviderProps {
  children: React.ReactNode;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
export type ServiceUser = Omit<User, "id"> & {
  service: Service;
  image: string;
};
axios.defaults.baseURL = config.backend_uri;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default function UserProvider(props: UserProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [services, setServices] = useState<ServiceUser[]>([]);
  const redirect_uri = (service: Service) =>
    `http${config.self.https ? "s" : ""}://${config.self.host}:${
      config.self.port
    }/auth/${service}`;
  const connectService = async (service: Service) => {
    const res = await axios.get(
      `http://localhost:3000/auth/${service}/login?redirect_uri=` +
        redirect_uri(service)
    );
    window.location.href = res.data.object.redirect_uri;
  };
  const serviceCode = async (service: Service, code: string) => {
    try {
      const res = await axios.post(`auth/${service}/code`, {
        code: code,
        redirect_uri: redirect_uri(service),
      });
      setServices([...services, res.data.object]);
    } catch (e) {
      throw e;
    }
  };

  const fetch = async () => {
    const userRes = await axios.get("user");
    setUser(omit(userRes.data.object, "service_connections") as User);
    setServices(userRes.data.object.service_connections);
  };

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
        window.localStorage.setItem(
          "pm_at",
          tokenRes.data.access_token +
            "," +
            moment().add(tokenRes.data.expires_in).toISOString()
        );
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + tokenRes.data.access_token;
        try {
          await fetch();
          navigate("/");
        } catch (e) {
          throw e;
        }
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
        fetch,
        login,
        services,
        connectService,
        serviceCode,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
