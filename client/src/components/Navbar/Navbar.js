import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo..svg";

function Navbar(props) {
    return (
        props.isLoggedIn === "true" ? 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={logo}
                alt="logo" height="32px"></img></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <p>Welcome {props.UserData.FirstName + " " + props.UserData.LastName}</p> */}

                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active fs-5" aria-current="page" to="/Account/Feed">Feed</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fs-5" to="/Account/Posts">Posts</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fs-5" to="/Account/Profile">Profile</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                        <label className="nav-link fs-5">Welcome {props.UserData.FirstName + " " + props.UserData.LastName} !</label>
                    </li> */}
                    <li className="nav-item">
                        <NavLink className="nav-link fs-5" to="/Account/logout">Logout</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav> 
        :
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={logo}
                alt="logo" height="32px"></img></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active fs-5" aria-current="page" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5" to="/signup">Sign up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
