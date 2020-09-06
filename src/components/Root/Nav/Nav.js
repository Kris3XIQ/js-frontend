import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
    return (
        <header>
            <h2 className="logo">JSRamverk</h2>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link-item">Home</Link>
                    </li>
                    <li id="topnav-dropdown">
                        <Link to="/reports/week" className="nav-link-item">Report</Link>
                        <i className="arrow down"></i>
                        <ul className="dropdown-links">
                            <li>
                                <Link to="/reports/week/1">Kmom01</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/2">Kmom02</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/3">Kmom03</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/4">Kmom04</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/5">Kmom05</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/6">Kmom06</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
