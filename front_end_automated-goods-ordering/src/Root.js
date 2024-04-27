import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { Context } from './Context';
import StopList from './components/StopList/StopList';
import { Menu } from './components/Menu/Menu';
import { CocktailForm } from './components/cocktails/CocktailForm';
import Ordering from './components/Ordering/Ordering';
// import SideBar from './components/SideBar/SideBar';


export const Root = () => (
  <Router>
    <Context>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/" element={<SideBar />} /> */}
          <Route index element={<StopList />} />
          <Route path="list" element={<Navigate to="/" replace={true} />} />
          <Route path="menu" element={<Menu />}/>
            {/* <Route path="" element={<SideBar />} /> */}
          <Route path="newdish" element={<CocktailForm />} />
          <Route path="ordering" element={<Ordering />} />
          <Route path="*" element={<h1>Сторінку не знайдено</h1>} />
        </Route>
      </Routes>
    </Context>
  </Router>
);
