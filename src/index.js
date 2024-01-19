/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import Home from "views/pages/Home/Home";
import About from "views/pages/About/About";
import Services from "views/pages/Services/Services";
import Contact from "views/pages/Contact/Contact";
import Login from "views/pages/Login/Login";
import Admin from "views/pages/Admin/Admin";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/our-services' element={<Services />} />
      <Route path='/contact-us' element={<Contact />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
