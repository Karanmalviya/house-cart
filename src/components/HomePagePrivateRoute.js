// import { Navigate, Outlet } from "react-router-dom";
// import useAuthState from "../hooks/useAuthState";
// import Spinner from "./Spinner";

// export default function HomePagePrivateRoute() {
//   const { loggedIn, checkState } = useAuthState();
//   if (checkState) {
//     console.log("HOMEPAGE PRIVATE ROUTE");
//     return <Spinner />;
//   }
//   return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
// }
