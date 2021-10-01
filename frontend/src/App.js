import React, { useContext } from "react";
import "./style.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./auth/home/Home";
import Login from "./auth/login/Login";
import UserHome from "./pages/home/UserHome";
import ContentHome from "./pages/contentHome/ContentHome";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import WatchVideo from "./components/videoPlay/WatchVideo";
import { AuthContext } from "./auth/authContext/AuthContext";
import Register from "./auth/register/Register";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <UserHome type="" />
        </ProtectedRoute>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        //Sign Up Page
        <Route exact path="/signup">
          {user ? <Redirect to="/login" /> : <Register />}
        </Route>
        <ProtectedRoute exact path="/movies">
          <UserHome type="movie" />
        </ProtectedRoute>
        <ProtectedRoute exact path="/series">
          <UserHome type="series" />
        </ProtectedRoute>
        <ProtectedRoute exact path="/contenthome/:movieId">
          <ContentHome />
        </ProtectedRoute>
        <ProtectedRoute exact path="/watch/:movieId">
          <WatchVideo />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default App;
