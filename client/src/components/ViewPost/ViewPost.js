import React, { useEffect, useState } from 'react'
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import UnAuthorized from '../UnAuthorized/UnAuthorized';
import Post from "../Post/Post";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import Com from '../Comment/Comment';
// import defaultOther from "../../images/default-other.png";
// import defaultMale from "../../images/default-male.jpg";
// import defaultFemale from "../../images/default-female.jpg";
import "./ViewPost.css";
import 'react-toastify/dist/ReactToastify.css';


function ViewPost(props) {
   let isFeed = false;
    let _id = props.location.pathname.substring(24, );
    // const [Heart, setHeart] = useState("bi bi-heart");
    if(props.location.pathname.includes("/Account/Feed")) {
        _id = props.location.pathname.substring(24, );
        isFeed = true;
    }
    else {
        _id = props.location.pathname.substring(25, );
    }
    const [Authorized, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState({});
    const [Comment, setComment] = useState("");
    const [Comments, setComments] = useState({});
    const [isComments, setIsComments] = useState(false);
    const callPost = async () => { 
        const response = await axios.post("http://localhost:5000/getPost", {
        method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            body: {"_id":_id, "Feed": isFeed},
            credentials: "include"
        });
        if(response.status === 200 && response.data.Authorized) {
            setLoading(false);
            setAuth(true);
            setUserData(response.data);
            if(response.data.post) {
                setComments(response.data.post[0].Comments);
                if(response.data.post[0].Comments.length > 0) {
                    setIsComments(true);
                }

            }
            // console.log(response.data.post[0].Comments)
            
            // console.log(isComments);
        }
        else {
            setLoading(false);
            setAuth(false);
        }
    }
    useEffect(() => {
        callPost();
        // eslint-disable-next-line
    }, []);
    const post = () => {
        const data = UserData.post;
        const array = [];
        for(const item in data) {
            let Liked = false;
            for(const i in data[item].LikedBy) {
                if(data[item].LikedBy[i] === UserData.rootUser.Email) {
                    Liked = true;
                }
            };
            array.push(
                <Post key={data[item]._id} Data={data[item]} Liked={Liked} viewPost={true} location={props.location.pathname}/>
            );
        }
        return array;
    }
    const postComment = async () => {
        const response = await axios.post("http://localhost:5000/addComment", {
        method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            body: {"_id":_id, "UserComment":Comment},
            credentials: "include"
        });
        if(response.status === 200) {
            // console.log(response.data);
            setComments(response.data.Comments);
            getComments();
            setComment("");
            toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            setComments(response.data.Comments);
            setIsComments(true);
            getComments();
        }
        else {
            toast.error(response.data.Message, {position:"top-center", autoClose:3000, hideProgressBar:true});
        }
    }

    // const getProfile = (Gender) => {
    //     if(Gender === "Male") {
    //         return defaultMale;
    //     }
    //     else if(Gender === "Female") {
    //         return defaultFemale;
    //     }
    //     return defaultOther;
    // }

    const getComments = () => {
        let array = [];
        for(const comment in Comments) {
            // console.log(Comments[comment]);
            let Liked = false;
            let Replies = {};
            for(const i in Comments[comment].LikedBy) {
                Replies = Comments[comment].Replies;
                if(Comments[comment].LikedBy[i] === UserData.rootUser.Email) {
                    Liked = true;
                }
            };
            array.push(
                <div key={Comments[comment]._id}>
                    <Com Name={Comments[comment].Name} Gender={Comments[comment].Gender} UserComment={Comments[comment].UserComment}
                        PostId= {_id} _id={Comments[comment]._id} Liked={Liked} Replies={Replies}
                    />
                </div>
            )
            // console.log(Comments[comment]);
        }
        return array;
    }

    return (
        isLoading ?
            <div className="view-post-container">
                <Navbar  isLoggedIn="true"/>
                <div className="view-post-inner-container">
                    <Loading />
                </div>
                <Footer />
            </div>
        :
        Authorized ?
            <div className="view-post-container">
                <Navbar isLoggedIn="true" />
                <div className="view-post-inner-container">
                    <div className="view-post-post-container">
                        {post()}
                    </div>
                    <div className="view-post-comment-section">
                        {isComments ?
                            <div className="comment-section-content">
                                {getComments()}
                            </div>
                        :
                            <div className="comment-section-content">
                                No Comments Yet
                            </div>
                        }
                        <div className="comment-section-new-comment">
                            <input type="text" placeholder="Add Comment..." className="comment-input" required
                            onChange={(event) => setComment(event.target.value)} value={Comment}
                            />
                            <button className="btn btn-primary" onClick={postComment}>Post</button>
                        </div>
                    </div>
                </div>
                <Footer />
                <ToastContainer transition = {Slide} />

            </div>
        :
            <UnAuthorized />
    )

};

export default ViewPost;