import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Profile.css";
import defaultOther from "../../images/default-other.png";
import defaultMale from "../../images/default-male.jpg";
import defaultFemale from "../../images/default-female.jpg";
import UnAuthorized from '../UnAuthorized/UnAuthorized';
import Loading from '../Loading/Loading';

function Profile() {
    const [Authorized, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState({});
    const [Likes, setLikes] = useState(0);
    const [Liked, setLiked] = useState(0);
    const [Commented, setCommented] = useState(0);
    const callFeed = async () => { 
        const response = await axios.get("http://localhost:5000/profile", {
        method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        if(response.status === 200 && response.data.Authorized) {
            setLoading(false);
            setAuth(true);
            setUserData(response.data.rootUser);
            setLiked(response.data.Liked);
            setCommented(response.data.Commented);
            let lk = 0;
            for(const post in response.data.posts) {
                lk = lk + parseInt(response.data.posts[post].Likes);
            }
            setLikes(lk);
        }
        else {
            setLoading(false)
            setAuth(false);
        }
    }
    useEffect(() => {
        callFeed();
        
    }, []);
    const getProfile = () => {
        if(UserData.Gender === "Male") {
            return defaultMale;
        }
        else if(UserData.Gender === "Female") {
            return defaultFemale;
        }
        return defaultOther;
    }
    return(
        isLoading ? 
        <div className="profile-container">
            <Navbar isLoggedIn= "true" UserData={UserData} />
            <Loading />
            <Footer />
        </div> 
        :
        Authorized ? 
        <div className="profile-container">
            <Navbar isLoggedIn= "true" UserData={UserData} />
            <div className="profile-card-container">
                <div className="profile-card-outer">
                    <div className="profile-card">
                        <div className="profile-card-left">
                            <img src={getProfile()} alt="profile" height="200px" width="auto"></img>
                            <div>
                                <br></br>
                                <div className="profile-card-left-content">
                                    <div>
                                        <p className="profile-card-left-content-label">
                                            Posts
                                        </p>
                                        <p className="profile-card-left-content-value">
                                            {UserData.Posts}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="profile-card-left-content-label">
                                            Likes
                                        </p>
                                        <p className="profile-card-left-content-value">
                                            {Likes}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-right">
                            <div>
                                <h3>{UserData.FirstName} {UserData.LastName}</h3>
                            {UserData.Email}
                                <hr />
                            </div>
                            <div className="profile-card-right-content">
                                <div>
                                    <p className="profile-card-right-content-label">
                                        Gender
                                    </p>
                                    <p className="profile-card-right-content-value">
                                        {UserData.Gender}
                                    </p>
                                </div>
                                <div>
                                    <p className="profile-card-right-content-label">
                                        Country
                                    </p>
                                    <p className="profile-card-right-content-value">
                                        {UserData.Country}
                                    </p>
                                </div>
                                <div>
                                    <p className="profile-card-right-content-label">
                                        Joined on
                                    </p>
                                    <p className="profile-card-right-content-value">
                                        {UserData.Joined}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="activity">
                        <h3>Activity</h3>
                        <div>
                            <p className="profile-card-right-content-label">
                                Liked
                            </p>
                            <p className="profile-card-right-content-value">
                                {Liked} Posts
                            </p>
                        </div>
                        <div>
                            <p className="profile-card-right-content-label">
                                Commented On
                            </p>
                            <p className="profile-card-right-content-value">
                                {Commented} Posts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div> 
        :
        <UnAuthorized />
    )
}

export default Profile;