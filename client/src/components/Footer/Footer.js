import React from 'react';
import GraySclaLogo from "../../images/logo..svg";
import "./Footer.css";
import 'bootstrap-icons/font/bootstrap-icons.css'


function Footer() {
    return(
        <footer style={{background: "#e0e0e0"}}>
            <div className="footer-container">
                <div>
                    <img src={GraySclaLogo} alt="logo" height="24px" style={{filter: 'grayscale'}}/>
                </div>
                <div>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-facebook"></i></a>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-twitter"></i></a>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-google"></i></a>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-instagram"></i></a>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-linkedin"></i></a>
                    <a href="#!" className="social-media-icons">
                        <i className="bi bi-github"></i></a>
                </div>
                <div>
                    &#169; 2021 CollabSpace
                </div>
            </div>
        </footer>
    )
}

export default Footer;