
import { NavButtons } from "./NavButtons";
import "./NavBar.css";
import { Burger } from "./Burger.jsx";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const getLinkClassSettings = ({ isActive }) =>
    cn('nav-button-link-settings', 'grid-start', { 'has-border': isActive });
  return (
    <nav
      className={cn("nav")}
      role="navigation"
      aria-label="main navigation"
    >
      <NavLink className={getLinkClassSettings} to="/admin">
        <img width="25" height="25" src="https://img.icons8.com/glyph-neue/64/FAB005/user-lock.png" alt="user-lock" />
      </NavLink>
      <NavButtons />
      <Burger />
    </nav>
  )
};
