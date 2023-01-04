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
import MergesProvider from "../MergesProvider";
import PlaylistsProvider from "../PlaylistsProvider";
import { useUser } from "../UserProvider";
import { Service } from "../UserProvider/UserProvider";

export interface RouterProps {}
export default function Router(props: RouterProps) {
  const user = useUser();
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    user.login();
  }, []);
  console.log("test")
  return (
    <>
      {user.isLoggedIn() ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
                <PlaylistsProvider>
                  <MergesProvider>
                    <Bars />
                  </MergesProvider>
                </PlaylistsProvider>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      ) : (
        <>not logged in</>
      )}
    </>
  );
}

function Authorized({ children }: { children: JSX.Element }) {
  const user = useUser();
  let location = useLocation();

  user.login();
  return children;
}
