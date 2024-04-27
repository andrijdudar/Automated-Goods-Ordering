
import { NavButtons } from "./NavButtons";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav
      className="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="nav-h">
        <h1 className="logo-text">Dynamo Blues</h1>
        <NavButtons />
      </div>
    </nav>
  )
};
