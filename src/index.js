import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Root from "./components/Root";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('app')
);

// import Root from "./components/Root";

// render(
//   <BrowserRouter>
//     <Root />
//   </BrowserRouter>,
//   document.getElementById("app")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
