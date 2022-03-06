import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Bars from "../Bars";
import Home from "../Home";
import Login from "../Login";
import PlaylistsProvider from "../PlaylistsProvider";
import { useUser } from "../UserProvider";
import { Service } from "../UserProvider/UserProvider";

export interface RouterProps {}
export default function Router(props: RouterProps) {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("pm_at");
    if (token) {
      const s = token.split(",");
      if (!moment().isAfter(moment(s[1]))) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + s[0];
        user.fetch().then(() => setLoaded(true));
      } else {
        setLoaded(true);
      }
    } else {
      setLoaded(true);
    }
  }, []);
  return (
    <>
      {loaded ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Authorized>
                <PlaylistsProvider>
                  <Bars />
                </PlaylistsProvider>
              </Authorized>
            }
          >
            <Route path="/auth/:service" element={<AuthCallback />} />
            <Route path="" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      ) : (
        <></>
      )}
    </>
  );
}

function AuthCallback() {
  const user = useUser();
  const params = useParams();
  const serachParams = useSearchParams();
  useEffect(() => {
    user.serviceCode(
      params.service as Service,
      serachParams[0].get("code") as string
    );
  }, []);
  return <Navigate to="/" replace />;
}

function Authorized({ children }: { children: JSX.Element }) {
  const user = useUser();
  let location = useLocation();

  if (!user.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
