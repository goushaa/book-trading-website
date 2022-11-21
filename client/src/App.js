import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Fragment } from "react";
import NavbarClient from './components/NavbarClient';


function App() {
  return (
    <Fragment>
      <NavbarClient />
      <h1>Client Side</h1>
    </Fragment>
  );
}

export default App;
