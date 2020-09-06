// import React from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

// import Home from "./Home.js";
// import Report from "./OldReports.js";

// //import './App.css';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <header>
//                     <h2 class="logo">JSRamverk</h2>
//                     <nav>
//                         <ul className="nav_links">
//                             <li>
//                                 <Link to="/">Home</Link>
//                             </li>
//                             <li id="topnav-dropdown">
//                                 <Link to="/reports/week">Reports</Link>
//                                 <i class="arrow down"></i>
//                                 <ul className="dropdown_links">
//                                     <li>
//                                         <Link to="/reports/week/1">Kmom01</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/reports/week/2">Kmom02</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/reports/week/3">Kmom03</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/reports/week/4">Kmom04</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/reports/week/5">Kmom05</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/reports/week/6">Kmom06</Link>
//                                     </li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </nav>
//                 </header>
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route path="/reports/week/:reportNr" component={Report} />
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// export default App;
