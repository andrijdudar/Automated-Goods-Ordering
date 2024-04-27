import "./Menu.css";
import { MenuCards } from "./MenuCards";
import SideBar from "./SideBar";

export const Menu = () => {
  return (
    <div className="menu">
      <SideBar />
      <MenuCards />
    </div>
  );
};
