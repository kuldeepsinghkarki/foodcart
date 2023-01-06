import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./AppLinks.module.css";

const AppLinks = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {" "}
          <li>
            {!authCtx.isLoggedIn && (
              <NavLink className={(nav) => (nav.isActive ? classes.active : "")} to="/">
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink className={(nav) => (nav.isActive ? classes.active : "")} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={(nav) => (nav.isActive ? classes.active : "")} to="/offers">
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink className={(nav) => (nav.isActive ? classes.active : "")} to="/aboutus">
              About Us
            </NavLink>
          </li>
          <li>
            {" "}
            {authCtx.isLoggedIn && (
              <button className={classes.button} onClick={logoutHandler}>
                Logout {authCtx.email}{" "}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppLinks;
