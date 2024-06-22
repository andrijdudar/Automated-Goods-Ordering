import { NavLink } from "react-router-dom";
import './NavButtons.css';
import cn from 'classnames';

const getLinkClass = ({ isActive }) =>
  cn('nav-button-link', { 'has-border': isActive });
// const getLinkClassSettings = ({ isActive }) =>
//   cn('nav-button-link-settings', 'grid-start', { 'has-border': isActive });

export const NavButtons = () => {
  return (
    <ul className='nav-buttons grid-center'>
      {/* <li> */}
        {/* <NavLink className={getLinkClassSettings} to="/admin">
          <img width="25" height="25" src="https://img.icons8.com/glyph-neue/64/FAB005/user-lock.png" alt="user-lock" />
        </NavLink> */}
      {/* </li> */}
      <li>
        <NavLink className={getLinkClass} to="/">
          Стоп Лист
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/menu">
          Меню
        </NavLink>
      </li>
    </ul>
  );
};
