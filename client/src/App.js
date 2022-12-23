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
import Promotions from "./Pages/Promotions";
import TestAddbook from "./Components/TestAddbook";
import DriverSignupPage from "./Pages/DriverSignupPage";
import SuperAdminPage from "./Pages/SuperAdminPage";
import AdminViewUserPage from "./Pages/AdminViewUserPage";
import AdminViewStorePage from "./Pages/AdminViewStorePage";
import AdminViewDriverPage from "./Pages/AdminViewDriverPage";
import AdminViewCouponPage from "./Pages/AdminViewCouponPage";
import StorePage from "./Pages/StorePage";

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
        <Route path="/addBook" element={<TestAddbook />}></Route>
        <Route path="/driversignup" element={<DriverSignupPage />}></Route>
        <Route path="/superadmin" element={<SuperAdminPage />}></Route>
        <Route path="/users/:id" element={<AdminViewUserPage />}></Route>
        <Route path="/stores/:id" element={<StorePage />}></Route>
        <Route path="/drivers/:ssn" element={<AdminViewDriverPage />}></Route>
        <Route path="/coupons/:code" element={<AdminViewCouponPage />}></Route>
        <Route path="/store/:id" element={<StorePage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
