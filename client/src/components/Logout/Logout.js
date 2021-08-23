import React, { useEffect, useState } from "react";
import axios from "axios";
import {useHistory}from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

function Logout(props) {
    // const [Authorized, setAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const callLogout = async () => {
        const response = await axios.get("http://localhost:5000/logout", {
        method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        if(response.status === 200) {
            setIsLoading(false);
            history.push("/login");
        }
    }
    useEffect(() => {
        callLogout();
    });
    return (
        isLoading ?
        <div className="profile-container">
            <Navbar isLoggedIn= "true"/>
            <Loading />
            <Footer />
        </div>
        :
        <div>
            Logout!
        </div>
    )
}

export default Logout;