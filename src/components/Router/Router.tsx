import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Bars from "../Bars";
import Login from "../Login";
import { useUser } from "../UserProvider";

export interface RouterProps {}
export default function Router(props: RouterProps) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Authorized>
            <Bars />
          </Authorized>
        }
      >
        <Route path="" element={<>Home component here</>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function Authorized({ children }: { children: JSX.Element }) {
  const user = useUser();
  let location = useLocation();

  if (!user.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
