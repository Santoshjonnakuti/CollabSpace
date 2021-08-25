import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from "../../images/logo..svg";
import 'react-toastify/dist/ReactToastify.css';

function OTPEntry(props) {
    const history = useHistory();
    const [OTP, setOTP] = useState("");
    const [IsOTPValid, setIsOTPValid] = useState(false);
    const [Valid] = useState({});
    const [Invalid, setInvalid] = useState({
        "MozBoxShadow": `0 0 5px white`,
        "WebkitBoxShadow": `0 0 5px white`,
        "boxShadow": `0 0 5px white`
    });

    const toogle = (target, stateValue, ValuesetState) => {
        if(target.length > 0) {
            ValuesetState(true)
        }
        else {
            ValuesetState(false)
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if(IsOTPValid)
        {
            const response = await axios.post("http://localhost:5000/otpEntry", {
                method: "POST",
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json",
                },
                credentials: "inculde",
                body: {OTP}
            });
            if(response.data.Status === "400") {
              toast.error(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
            else {
                toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
                setTimeout(() => {
                    history.push("/forgotPassword/reset");
                }, 3000);
    
            }
        }
        else {
            setInvalid({
                "border": "1px solid red",
                "MozBoxShadow": `0 0 5px red`,
                "WebkitBoxShadow": `0 0 5px red`,
                "boxShadow": `0 0 5px red`
            })
            toogle(OTP, IsOTPValid, setIsOTPValid);
        }
    }
    return (
        <div className="login-container">
            <Navbar />
            <div className="login-inner-container">
                <img src={logo} alt="logo" height="32px"></img>
                <br />
                <p>CollabSpace Connect with people</p>
                <div className="login-card">
                    <br />
                    <h4>Forgot Password</h4><br />
                    <form id="login-form" method="POST">
                        <div>
                            <label htmlFor="OTP">Enter OTP</label>
                            <input type="password" name="OTP" autoComplete="off" required
                            style={IsOTPValid ? Valid : Invalid}
                            onChange={(event) => {setOTP(event.target.value)
                            toogle(event.target.value, IsOTPValid, setIsOTPValid)}} value={OTP} id="OTP"/>
                        </div>
                        <br></br>
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        <br></br>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer transition = {Slide} />
        </div>
    )
}

export default OTPEntry;