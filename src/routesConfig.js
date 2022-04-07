import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ControlPanel from "./Pages/ControlPanel";
import NewDonation from "./Pages/NewDonation";
import EditDonation from "./Pages/EditDonation";
import AboutUs from "./Pages/AboutUs";
import Collections from "./Pages/Collections";

function RoutesConfig() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact={true} path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/painel" element={<ControlPanel />} />
        <Route path="/new-donation" element={<NewDonation />} />
        <Route path="/edit-donation" element={<EditDonation />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesConfig;
