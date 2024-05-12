import { NavLink } from "react-router-dom";
import './NavButtons.css';
import cn from 'classnames';
import useStore from "../../StoreZustand";

const getLinkClass = ({ isActive }) =>
  cn('nav-button-link', { 'has-border': isActive });

export const NavButtons = () => {
  const burger = useStore((state) => state.burger);
  return (
    <ul className={burger ? 'nav-buttons-active' : 'nav-buttons'}>
      <li className="nav-button ">
        <NavLink className={getLinkClass} to="/">
          Стоп Лист
        </NavLink>
      </li>
      <li className="nav-button">
        <NavLink className={getLinkClass} to="/menu">
          Меню
        </NavLink>
      </li>
      <li className="nav-button">
        <NavLink className={getLinkClass} to="/ordering">
          Замовлення
        </NavLink>
      </li>
    </ul>
  );
};
