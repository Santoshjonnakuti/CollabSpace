import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from "../../images/logo..svg";
import 'react-toastify/dist/ReactToastify.css';

function OTPEmail(props) {
    const history = useHistory();
    const [Email, setEmail] = useState("");
    const [IsEmailValid, setIsEmailValid] = useState(false);
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
        if(IsEmailValid)
        {
            const response = await axios.post("http://localhost:5000/forgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: {Email}
            });
            if(response.data.Status === "400") {
              toast.error(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
            else {
                toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
                setTimeout(() => {
                    history.push("/forgotPassword/otpEntry");
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
            toogle(Email, IsEmailValid, setIsEmailValid);
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
                    <h4>Forgot Password</h4><br/>
                    <form id="login-form" method="POST">
                        <div>
                            <label htmlFor="Email">Enter Email</label>
                            <input type="text" name="Email" autoComplete="off" required
                            style={IsEmailValid ? Valid : Invalid}
                            onChange={(event) => {setEmail(event.target.value)
                            toogle(event.target.value, IsEmailValid, setIsEmailValid)}} value={Email} id="Email"/>
                        </div>
                        <br></br>
                        <button className="btn btn-primary" onClick={handleSubmit}>Send OTP</button>
                        <br></br>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer transition = {Slide} />
        </div>
    )
}

export default OTPEmail;