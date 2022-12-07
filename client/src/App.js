import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Fragment } from "react";
import { Route, Routes } from 'react-router-dom'
import StoresCollab from './Pages/StoresCollab';
import SellandBidding from './Pages/SellandBidding';

function App() {
  return (
    <Fragment>


      <Routes>
        <Route path='/stores' element={<StoresCollab />}></Route>
        <Route path='/sell&bid' element={<SellandBidding />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
