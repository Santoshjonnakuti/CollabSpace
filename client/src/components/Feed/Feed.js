import React, { useEffect, useState } from 'react'
import axios from "axios";
import UnAuthorized from '../UnAuthorized/UnAuthorized';
import Post from "../Post/Post";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "./Feed.css";
import Loading from '../Loading/Loading';

function Feed(props) {
    const [Authorized, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState({});
    const callFeed = async () => { 
        const response = await axios.get("http://localhost:5000/feed", {
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
            setUserData(response.data);
        }
        else {
            setLoading(false);
            setAuth(false);
        }
    }
    useEffect(() => {
        callFeed();
        
    }, []);
    const feed = () => {
        const data = UserData.feed;
        const array = [];
        for(const item in data) {
            let Liked = false;
            let LikedUser = "";
            for(const i in data[item].LikedBy) {
                if(data[item].LikedBy[i] === UserData.rootUser.Email) {
                    Liked = true;
                }
                LikedUser = data[item].LikedBy[i];
            };
            array.push(
                <Post key={data[item]._id} Data={data[item]} Liked={Liked} LikedUser={LikedUser.split("@")[0]} location={props.location.pathname}/>
            );
        }
        return array;
    }
    return (
        isLoading ?
        <div className="feed-container">
            <Navbar isLoggedIn= "true" UserData={UserData} />
            <Loading />
            <Footer/>
        </div>
        :
        Authorized ?
        <div className="feed-container">
            <Navbar isLoggedIn= "true" UserData={UserData} />
            <div className="feed-content-holder">
                {feed()}
            </div>
            <Footer/>
        </div>
        :
        <UnAuthorized />
    )
}

export default Feed;
