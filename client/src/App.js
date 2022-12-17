import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Fragment } from "react";
import { Route, Routes } from 'react-router-dom'
import StoresCollab from './Pages/StoresCollab';
import SellandBidding from './Pages/SellandBidding';
import SignUp from './Pages/SignUp'
import LogIn from './Pages/LogIn'
import Promotions from './Components/PromotionsForm';
import HomePageLogIn from './Pages/HomePageLogIn';
import Admin from './Pages/Admin'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/stores' element={<StoresCollab />}></Route>
        <Route path='/sell&bid' element={<SellandBidding />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/Promotions' element={<Promotions />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/' element={<HomePageLogIn />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;