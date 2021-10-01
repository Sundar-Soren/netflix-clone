import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth/authContext/AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        ) : (
          children
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;
