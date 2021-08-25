import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from "../../images/logo..svg";
import 'react-toastify/dist/ReactToastify.css';

function OTPPassword(props) {
    const history = useHistory();
    const [SPClass, setSPClass] = useState("bi bi-eye-fill");
    const [Password, setPassword] = useState("");
    const [RPassword, setRPassword] = useState("");
    const [IsPasswordValid, setIsPasswordValid] = useState(false);
    const [IsRPasswordValid, setIsRPasswordValid] = useState(false);
    const [Valid] = useState({});
    const [Invalid, setInvalid] = useState({
        "MozBoxShadow": `0 0 5px white`,
        "WebkitBoxShadow": `0 0 5px white`,
        "boxShadow": `0 0 5px white`
    });
    const showPassword = () => {
        const password = document.getElementById("Password");
        const Rpassword = document.getElementById("RPassword");
        if(password.type === "password") {
            password.type = "text";
            Rpassword.type = "text";
            setSPClass("bi bi-eye-slash-fill");

        }
        else {
            password.type = "password";
            Rpassword.type = "password";
            setSPClass("bi bi-eye-fill");
        }
    }
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
        if((IsPasswordValid && IsRPasswordValid) && (Password === RPassword))
        {
            const response = await axios.post("http://localhost:5000/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: {Password}
            });
            if(response.data.Status === "400") {
              toast.error(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
            else {
                toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
                setTimeout(() => {
                    history.push("/login");
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
            toogle(Password, IsPasswordValid, setIsPasswordValid);
            toogle(RPassword, IsRPasswordValid, setIsRPasswordValid);
            if(Password !== RPassword) {
                toast.error("Password Mismatched!", {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
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
                        <div id="login-password-holder">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" autoComplete="off" required
                            style={IsPasswordValid ? Valid : Invalid}
                            onChange={(event) => {setPassword(event.target.value)
                            toogle(event.target.value, IsPasswordValid , setIsPasswordValid)}} value={Password} id="Password"/>
                            <a onClick={showPassword} id="show-password" href><i className={SPClass}
                            style={{fontSize:"16px"}}></i></a>
                        </div>
                        <div id="login-password-holder">
                            <label htmlFor="RPassword">Password</label>
                            <input type="password" name="RPassword" autoComplete="off" required
                            style={IsRPasswordValid ? Valid : Invalid}
                            onChange={(event) => {setRPassword(event.target.value)
                            toogle(event.target.value, IsRPasswordValid , setIsRPasswordValid)}} value={RPassword} id="RPassword"/>
                        </div>
                        <br></br>
                        <button className="btn btn-primary" onClick={handleSubmit}>Reset</button>
                        <br></br>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer transition = {Slide} />
        </div>
    )
}

export default OTPPassword;