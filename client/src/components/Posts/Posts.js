import React, { useEffect, useState } from 'react'
import axios from "axios";
import UnAuthorized from '../UnAuthorized/UnAuthorized';
import Navbar from '../Navbar/Navbar';
import Post from "../Post/Post";
import Footer from '../Footer/Footer';
import Loading from "../Loading/Loading";
import "./Posts.css";
import { NavLink } from 'react-router-dom';

function Posts(props) {
    const [Authorized, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState({});
    const callAuth = async () => { 
        const response = await axios.get("http://localhost:5000/posts", {
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
            // console.log(response.data)
        }
        else {
            setLoading(false);
            setAuth(false);
        }
    }
    useEffect(() => {
        callAuth();        
    }, []);
    const posts = () => {
        const data = UserData.posts;
        const array = [];
        for(const item in data) {
            // console.log(data[item].LikedBy);
            let Liked = false;
            let LikedUser = "";
            for(const i in data[item].LikedBy) {
                // console.log(data[item]);
                if(data[item].LikedBy[i] === UserData.rootUser.Email) {
                    Liked = true;
                }
                LikedUser = data[item].LikedBy[i];
            };
            array.push(
                <Post key={data[item]._id} Data={data[item]} Liked={Liked} LikedUser={LikedUser.split("@")[0]} location={props.location.pathname}
                    Profile={UserData.rootUser.Profile}
                />
            );
        }
        return array;
    }
    return (
        isLoading ? 
        <div className="profile-container">
                <Navbar isLoggedIn= "true"/>
                <Loading />
                <Footer />
            </div>
        :
        Authorized ?
            <div className="posts-container">
                <Navbar isLoggedIn= "true"/>
                <div className="posts-content-holder">
                    <NavLink to="/Account/NewPost"><i className="bi bi-plus-lg"></i> New Post</NavLink>
                    {posts()}
                </div>
                <Footer />
            </div>
        :
        <UnAuthorized />
    )
}

export default Posts;
