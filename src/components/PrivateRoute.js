import { Navigate, Outlet } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";
import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loggedIn, checkState } = useAuthState();
  if (checkState) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
