import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// style sheets
import './index.css';

// pages
import App from './App';
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import ShowMovie from './pages/ShowIndMovie'

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<ShowMovie />} />
        </Routes>
    </BrowserRouter>,
  rootElement   
);
