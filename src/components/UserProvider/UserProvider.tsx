import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { omit, map } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import {Configuration, FrontendApi, IdentityApi, OAuth2Api, Session} from "@ory/client";


export type UserContextType = {
  data?: User;
  services: ServiceUser[];
  isLoggedIn: () => boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};
export const UserContext = React.createContext<UserContextType>({
  isLoggedIn: () => false,
  login: async () => undefined,
  logout: async () => undefined,
  services: [],
});
export const services = ["youtube", "spotify"] as const;
export type Service = typeof services[number];
//library.add(faSpotify, faYoutube);

export interface UserProviderProps {
  children: React.ReactNode;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
export type ServiceUser= Omit<User, "id"> & {
  service: Service;
  image: string;
};
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

  //const basePath =  "http://localhost:4000/.ory";
const ory = new FrontendApi(new Configuration({
  basePath:"http://localhost:4000",
   baseOptions: {
    withCredentials: true,
   }
}))


export default function UserProvider(props: UserProviderProps) {
  const [services, setServices] = useState<ServiceUser[]>([]);

  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")


  const redirect_uri = (service: Service) =>
    `http${config.self.https ? "s" : ""}://${config.self.host}:${
      config.self.port
    }/auth/${service}`;



  const login = async () => {
    try {
      const session = await ory.toSession({});
      setSession(session.data);
      ory.createBrowserLogoutFlow().then(({data}) => setLogoutUrl(data.logout_url))
      const user: {name: string,email: string, providers: {name: Service |  "google", user_data: {image: string, id: string, name: string, email: string}}[]} = (await axios.get("/user")).data;
      setName(user.name);
      setEmail(user.email);
      console.log("testtttttt");
      setServices(map(user.providers, (p) => ({service: p.name == "google" ? "youtube" : p.name, ...omit(p.user_data, "id") })));
      //setServices(map(user.providers, (p) => ({service: p.name, ...p.user_data })));
    } catch  (e){
        console.log(e);
     // ory.createBrowserLoginFlow({returnTo: "http://localhost:3000"}).then(({data}) => window.location.replace(data.request_url))
    } 
  };


  const logout = async () => {
    window.location.replace(logoutUrl as string);
  }
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: () => (session ? true : false),
        login,
        logout,
        services,
        data: {
            id: session?.identity.id ?? "",
            name: session?.identity.traits.name ?? "",
            email: session?.identity.traits.email ?? "",
        }
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
