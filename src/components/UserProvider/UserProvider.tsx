import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { omit } from "lodash";
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
//library.add(faSpotify, faYoutube);

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
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [services, setServices] = useState<ServiceUser[]>([]);

  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()


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
    //const userRes = await axios.get("user");
    //setUser(omit(userRes.data.object, "service_connections") as User);
    //setServices(userRes.data.object.service_connections);
  };

  const login = async () => {
    try {
      const session = await ory.toSession();
      console.log(session.data);
      setSession(session.data);
      ory.createBrowserLogoutFlow().then(({data}) => setLogoutUrl(data.logout_url))
      axios.get("/")
 
    } catch  (e){
      ory.createBrowserLoginFlow({returnTo: "http://localhost:3000"}).then(({data}) => window.location.replace(data.request_url))
    } 
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: () => (session ? true : false),
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
