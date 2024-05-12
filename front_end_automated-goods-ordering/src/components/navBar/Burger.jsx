import useStore from "../../StoreZustand";
import "./Burger.css";

export const Burger = () => {
  const burger = useStore((state) => state.burger);
  const setBurger = useStore((state) => state.setBurger);
  return (
    <div>
      <input id="check" type="checkbox" onChange={() => setBurger(!burger)} />
      <label for="check" className="menuButton">
        <span className="top"></span>
        <span className="mid"></span>
        <span className="bot"></span>
      </label>
    </div>

  );
};
