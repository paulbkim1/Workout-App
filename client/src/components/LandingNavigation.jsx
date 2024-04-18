import { useState } from "react";
import classes from "./LandingNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ to, children, onClick }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? classes.active : undefined)}
      onClick={onClick}
    >
      {children}
    </NavLink>
  </li>
);

const LandingNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiration");
    navigate("/");
  };

  const toggleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

  const navItems = [
    { to: "dashboard", label: "Dashboard" },
    { to: "workout-plan", label: "Workout Plan" },
    { to: "muscle-groups", label: "Muscle Groups" },
    { to: "exercises", label: "Exercises" },
  ];

  return (
    <header className={classes.header}>
      <button className={classes.menuButton} onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faBars} size="xl" color="white" />
      </button>
      <NavLink className={classes.logo} to="dashboard">
        HappyLifts
      </NavLink>
      {isDrawerOpen && (
        <div className={classes.overlay} onClick={toggleDrawer}></div>
      )}
      <nav className={`${classes.nav} ${isDrawerOpen ? classes.open : ""}`}>
        <button className={classes.closeButton} onClick={toggleDrawer}>
          x
        </button>
        <h1>Menu</h1>
        <ul>
          {navItems.map((item, index) => (
            <NavItem key={index} to={item.to} onClick={toggleDrawer}>
              {item.label}
            </NavItem>
          ))}
          <li>
            <button className={classes.logoutButton} onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LandingNavigation;
