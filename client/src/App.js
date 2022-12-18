import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import StoresCollab from "./Pages/StoresCollab";
import SellandBidding from "./Pages/SellandBidding";
import HomePageLogIn from "./Pages/HomePageLogIn";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import CustomerHomePage from "./Pages/CustomerHomePage";
import Admin from "./Pages/Admin";
import Promotions from "./Pages/Promotions"

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePageLogIn />}></Route>
        <Route path="/Stores" element={<StoresCollab />}></Route>
        <Route path="/Sell&Bid" element={<SellandBidding />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Home" element={<CustomerHomePage />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Promotions" element={<Promotions />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
