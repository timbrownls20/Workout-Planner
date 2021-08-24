/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand mx-4" href="#">
                Workout Planner
            </a>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/" >Workouts</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/exercise" >Exercises</Link>
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;
