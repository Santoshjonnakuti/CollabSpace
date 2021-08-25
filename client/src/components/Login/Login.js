import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from "../../images/logo..svg";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
    const history = useHistory();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [SPClass, setSPClass] = useState("bi bi-eye-fill");
    const [IsUsernameValid, setIsUsernameValid] = useState(false);
    const [IsPasswordValid, setIsPasswordValid] = useState(false);
    const [Valid] = useState({});
    const [Invalid, setInvalid] = useState({
        "MozBoxShadow": `0 0 5px white`,
        "WebkitBoxShadow": `0 0 5px white`,
        "boxShadow": `0 0 5px white`
    });

    const showPassword = () => {
        const password = document.getElementById("Password");
        if(password.type === "password") {
            password.type = "text";
            setSPClass("bi bi-eye-slash-fill");

        }
        else {
            password.type = "password";
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
        if(IsUsernameValid && IsPasswordValid)
        {
            const response = await axios.post("http://localhost:5000/login-user", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: {Username, Password}
            });
            if(response.data.Status === "400") {
              toast.error(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
            else {
                toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
                setTimeout(() => {
                    history.push("/Account/Feed");
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
            toogle(Username, IsUsernameValid, setIsUsernameValid);
            toogle(Password, IsPasswordValid, setIsPasswordValid);
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
                    <h3>Login</h3>
                    <form id="login-form" method="POST">
                        <div>
                            <label htmlFor="Username">Email</label>
                            <input type="email" name="Username" autoComplete="off" required
                            style={IsUsernameValid ? Valid : Invalid}
                            onChange={(event) => {setUsername(event.target.value)
                            toogle(event.target.value, IsUsernameValid, setIsUsernameValid)}} value={Username} id="Username"/>
                        </div>
                        <div id="login-password-holder">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" autoComplete="off" required
                            style={IsPasswordValid ? Valid : Invalid}
                            onChange={(event) => {setPassword(event.target.value)
                            toogle(event.target.value, IsPasswordValid , setIsPasswordValid)}} value={Password} id="Password"/>
                            <a onClick={showPassword} id="show-password" href><i className={SPClass}
                            style={{fontSize:"16px"}}></i></a>
                        </div>
                        <br></br>
                        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                        <br></br>
                    </form>
                    <NavLink to="/forgotPassword" className="border-0 mb-3" style={{textDecoration:"none", background:"none"}}>
                    Forgot Password ?</NavLink>
                </div>
            </div>
            <Footer />
            <ToastContainer transition = {Slide} />
        </div>
    )
}

export default Login;