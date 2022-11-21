import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Fragment } from "react";
import NavBarAdmin from './components/NavBarAdmin';

function App() {
  return (
    <Fragment>
      <NavBarAdmin />
      <h1> Admin </h1>
    </Fragment>

  );
}

export default App;
