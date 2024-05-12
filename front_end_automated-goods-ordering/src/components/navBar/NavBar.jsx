
import { NavButtons } from "./NavButtons";
import "./NavBar.css";
import { Burger } from "./Burger.jsx";
import cn from "classnames";
import useStore from "../../StoreZustand.js";

export const NavBar = () => {
  const burger = useStore((state) => state.burger);
  return (
    <nav
      className={cn("nav", { 'nav-active-burger': burger })}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="nav-h">
        <div className="nav-logoburger">
          <h1 className="logo-text">Dynamo Blues</h1>
          <Burger />
        </div>
        <NavButtons />
      </div>
    </nav>
  )
};
