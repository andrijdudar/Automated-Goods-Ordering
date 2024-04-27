/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from "react";
import useStore from "../../StoreZustand";
import { getIngredientOrders } from "../../utils/fetch";
import "./Ordering.css";
import { useLocalStorage } from '../../utils/useLocalStorege';

const Ordering = () => {
  const [ordersLS, setOrdersLS] = useLocalStorage('orders', []);
  const setOrders = useStore((state) => state.setOrders);
  useEffect(() => {
    getIngredientOrders()
      .then((data) => {
        console.log(data);
        setOrdersLS(data);
        setOrders(data);
      })
      .catch(() => {
        console.log("error in getIngredientOrders in Ordering.jsx");
      });
  }, []);
  return (
    <div>
      <h2 className="order">Ordering</h2>
      <p>{ordersLS}</p>
    </div>
  );
}
export default Ordering;
