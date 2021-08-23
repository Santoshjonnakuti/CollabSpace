import React from 'react'
import Navbar from '../Navbar/Navbar';
import { NavLink } from 'react-router-dom';
import Footer from "../Footer/Footer";
import "./Home.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo..svg";


const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <div className="innerContainer">
                <p>Welcome to our Community</p><br /><br/>
                <div>
                    <img src={logo} 
                    alt = "logo"  height="32px"/>
                    <div className="content-holder">
                        <br />
                        <p>CollabSpace helps you to connect </p>
                        <p>with the people in your life.</p>
                    </div>
                </div>    
                <div className="button-holder">
                    <br /><br />
                    <NavLink to="/login" className="btn btn-primary btn-lg" style={{background: "dodgerblue"}}>Login</NavLink>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
