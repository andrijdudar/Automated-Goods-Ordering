import { useEffect } from "react";
import useStore from "../../StoreZustand";
import "./Burger.css";
import cn from "classnames";
import { useLocation } from "react-router-dom";

export const Burger = () => {
  const location = useLocation();
  const burger = useStore((state) => state.burger);
  const setBurger = useStore((state) => state.setBurger);

  useEffect(() => {
    const checkbox = document.getElementById('check');
    if (checkbox) {
      checkbox.checked = burger;
    }
  }, [burger]);

  return (
    <div className={cn('grid-end', 'burger', {
      'burger-visible': location.pathname === '/menu' || location.pathname === '/admin'
    })}>
      <input id="check" type="checkbox" onChange={() => setBurger(!burger)} />
      <label htmlFor="check" className="menuButton">
        <span className="top"></span>
        <span className="mid"></span>
        <span className="bot"></span>
      </label>
    </div>

  );
};
