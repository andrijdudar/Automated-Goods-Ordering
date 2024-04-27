import { NavLink } from "react-router-dom";
import './NavButtons.css';
import cn from 'classnames';

const getLinkClass = ({ isActive }) =>
  cn('nav-button-link', { 'has-border': isActive });

export const NavButtons = () => {
  return (
    <ul className="nav-buttons">
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
