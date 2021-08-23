import React, {useState } from 'react'
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import Navbar from '../Navbar/Navbar'
import logo from "../../images/logo..svg";
import "./Signup.css";
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import Footer from '../Footer/Footer';


function Signup(props) {

    const history = useHistory();

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Country, setCountry] = useState("");
    const [Gender, setGender] = useState("");
    const [IsFirstNameValid, setIsFirstNameValid] = useState(false);
    const [IsLastNameValid, setIsLastNameValid] = useState(false);
    const [IsEmailValid, setIsEmailValid] = useState(false);
    const [IsPasswordValid, setIsPasswordValid] = useState(false);
    const [IsCountryValid, setIsCountryValid] = useState(false);
    const [IsGenderValid, setIsGenderValid] = useState(false);
    const [Valid] = useState({});
    const [Invalid, setInvalid] = useState({
    "MozBoxShadow": `0 0 5px white`,
    "WebkitBoxShadow": `0 0 5px white`,
    "boxShadow": `0 0 5px white`
});
    async function handleSubmit(event) {
        event.preventDefault();
        if(IsFirstNameValid && IsLastNameValid && IsEmailValid &&
             IsPasswordValid && IsCountryValid&& IsGenderValid )
        {
            const response = await axios.post("http://localhost:5000/signup-user", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: {FirstName, LastName, Email, Gender, Password, Country}
            });
            if(response.data.Status === "400") {
                toast.error(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            }
            else {
                toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
                setTimeout(function(){
                    history.push('/login');
                 }, 3000);
            }
        }
        else {
            setInvalid({
                "border": "1px solid red",
                "MozBoxShadow": `0 0 5px red`,
                "WebkitBoxShadow": `0 0 5px red`,
                "boxShadow": `0 0 5px red`
            });
            toogle(FirstName, IsFirstNameValid, setIsFirstNameValid);
            toogle(LastName, IsLastNameValid, setIsLastNameValid);
            toogle(Email, IsEmailValid, setIsEmailValid);
            toogle(Password, IsPasswordValid, setIsPasswordValid);
            toogle(Country, IsCountryValid, setIsCountryValid);
            toogle(Gender, IsGenderValid, setIsGenderValid);

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
    return (
        <div className="signup-container">
            <Navbar />
            <div className="signup-inner-container">
                <img src={logo} alt="logo" height="32px"></img>
                <br />
                <p>Join Now and collabarate with others</p>

                <div className="signup-card">
                    <h3>Signup</h3>
                    <form id="signup-form" method="POST">
                        <div>
                            <label htmlFor="FirstName">First Name</label>
                            <input type="text" name="FirstName" autoComplete="off" required
                            style={IsFirstNameValid ? Valid : Invalid}
                            onChange={(event) => {setFirstName(event.target.value) 
                            toogle(event.target.value, IsFirstNameValid, setIsFirstNameValid)}} value={FirstName} id="FirstName"/>
                        </div>
                        <div>
                            <label htmlFor="LastName">Last Name</label>
                            <input type="text" name="LastName" autoComplete="off" required
                            style={IsLastNameValid ? Valid : Invalid}
                            onChange={(event) => {setLastName(event.target.value)
                            toogle(event.target.value, IsLastNameValid, setIsLastNameValid)}} value={LastName} id="LastName"/>
                        </div>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="Email" autoComplete="off" required
                            style={IsEmailValid ? Valid : Invalid}
                            onChange={(event) => {setEmail(event.target.value)
                            toogle(event.target.value, IsEmailValid, setIsEmailValid)}} value={Email} id="Email"/>
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" autoComplete="off" required
                            style={IsPasswordValid ? Valid : Invalid}
                            onChange={(event) => {setPassword(event.target.value)
                            toogle(event.target.value, IsPasswordValid, setIsPasswordValid)}} value={Password} id="Password"/>
                        </div>
                        <div>
                            <label htmlFor="Country">Country</label>
                            <input type="text" name="Country" autoComplete="off" required
                            style={IsCountryValid ? Valid : Invalid}
                            onChange={(event) => {setCountry(event.target.value)
                            toogle(event.target.value, IsCountryValid, setIsCountryValid)}} value={Country} id="Country"/>
                        </div>
                        <div>
                            <label htmlFor="Gender">Gender</label>
                            <select id="Gender" required style={IsGenderValid ? Valid : Invalid}
                            onChange={(event) => {setGender(event.target.value)
                            toogle(event.target.value, IsGenderValid, setIsGenderValid)}} valud={Gender} name="Gender">
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <br></br>
                        <button className="btn btn-primary" onClick={handleSubmit}>Agree & Join</button>
                        <p id="user-agreement-agree">
                            By clicking Agree & Join, you agree to the CollabSpace <a href="/userAgreement" target="_blank">User Agreement</a>, 
                            <a href="/privacypolicy" target="_blank">Privacy Policy</a>, and <a href="/cookiepolicy" target="_blank">Cookie Policy</a>.
                        </p>
                        <br></br>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer transition={Slide} />
        </div>
    )
}

export default Signup
