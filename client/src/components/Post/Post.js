import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import defaultOther from "../../images/default-other.png";
import defaultMale from "../../images/default-male.jpg";
import defaultFemale from "../../images/default-female.jpg";
import logo from "../../images/favicon.ico";
import "./Post.css";
import 'react-toastify/dist/ReactToastify.css';

function Post(props) {
    // console.log(props);
    const history = useHistory();
    const [Likes, setLikes] = useState(props.Data.Likes);
    const [isLiked, setIsLiked] = useState(props.Liked);
    const [Toast, setToast] = useState("none");
    const toogleLike = async () => {
        setIsLiked(!isLiked)
        const Time = props.Data.postedOn;
        if(!isLiked) {
            const updated = parseInt(Likes) + 1;
            setLikes(updated)
        }
        else {
            setLikes(parseInt(Likes) - 1);
        }
        await axios.post("http://localhost:5000/updateLike", {
            method :"POST",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "inculde",
            body : { isLiked : !isLiked, Time : Time, User : props.Data.Email}
        });
    }
    const getProfile = () => {
        // console.log(props.Data);
        if(props.Data.Gender === "Male") {
            return defaultMale;
        }
        else if(props.Data.Gender === "Female") {
            return defaultFemale;
        }
        return defaultOther;
    }
    const deletePost = async () => {
        const response = await axios.post("http://localhost:5000/deletePost", {
            method :"POST",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "inculde",
            body : { "_id":props.Data._id}
        });
        if(response.status === 200 ) {
            toast.success("Post Deleted Successfully!", {position: "top-center", autoClose: 3000, hideProgressBar: true});
            setTimeout(() => {history.push("/Account/Posts")},
            3000);
        }
        else {
            toast.error("An Error Occurred!", {position:"top-center", autoClose:3000, hideProgressBar:true});
        }
        
    }
    return (
        <div className="posts-inner-container">
            <div className="posts-post-container">
                <div className="post-container-profile-container">
                    <div className="post-profile-container-img">
                        <img src={getProfile()} height="32px" width="32px" alt="profile"></img>
                    </div>&nbsp;&nbsp;
                    <div className="post-profile-container-user">
                        <p>{props.Data.Name}</p>
                        <p id="username">{props.Data.Email}</p>
                    </div>
                    <div className="three-dot-container">
                    {props.viewPost && props.location.includes("/Account/Posts")?
                    <div className="dropdown">
                        <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        style={{background:"none"}}>
                        <div className="circle">
                        </div>
                        <div className="circle">
                        </div>
                        <div className="circle">
                        </div>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item">Edit</button></li>
                            <li><button className="dropdown-item" onClick={() => {
                                setToast("block");
                            }}>Delete</button></li>
                        </ul>
                        </div>
                    :
                    <div className="three-dot-container"></div>
                    }
                    </div>
                </div>
                <hr />
                <div className="post-content">
                <p id="posts-title">
                    {props.Data.Title}
                </p>
                    <p>
                       {props.Data.Description}
                    </p>
                </div>
                <hr />
                <div className="posts-like-button-holder">
                    {isLiked ?
                        <i className="fa fa-thumbs-up" onClick={toogleLike} style={{color:"dodgerblue", fontSize: "30px",
                        display:"flex", alignItems:"center"}}>{Likes >= 2 ?
                            <span style={{fontSize: "14px", color:"gray"}}>&nbsp;Liked by You and {Likes - 1} Others</span>
                        :
                            <span style={{fontSize: "14px", color:"gray"}}>&nbsp;Liked by You</span>
                        }
                        </i>
                        :
                        <i className="fa fa-thumbs-up" onClick={toogleLike} style={{ fontSize:"30px",
                        display:"flex", alignItems:"center"}}>
                            {Likes > 1 ?
                                <span style={{fontSize: "14px", color:"gray"}}>&nbsp;Liked by {props.LikedUser} and {Likes - 1} Others</span>
                            :
                                <span style={{fontSize: "14px", color:"gray"}}>&nbsp;Liked by {Likes} Others</span>
                            }
                        </i>
                    }
                    {props.viewPost ? 
                        <NavLink to={props.location +"/View/Post/" + props.Data._id} disabled>
                            {/* <i className="fa fa-comment" style={{color:"gray", fill:"none", fontSize:"20px"}}>Comment</i> */}
                        </NavLink>
                    :
                    <NavLink to={props.location +"/View/Post/" + props.Data._id} style={{color:"black" ,textDecoration:"none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                    width="24px" role="img">
                        <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5
                        a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 
                        4.475 6 6.36V15.5z"></path>
                    </svg>Comment
                    </NavLink>}
                </div>
            </div>
            <div className="toast-outer-container" style={{display:Toast}}>
                <div className="toast-inner-container">
                    <div className="toast-inner-inner-container">
                        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center">
                            <div className="toast-show bg-light" role="alert" aria-live="assertive" aria-atomic="true" style={{MozBoxShadow: "0 0 3px #888",
                                WebKitBoxShadow: "0 0 3px #888",
                                boxShadow: "0 0 3px #888"}}>
                                    <div className="toast-header bg-light">
                                        <img src={logo} className="rounded me-2" alt="Logo" width="auto" height="24px" />
                                        <strong className="me-auto">CollabSpace</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"
                                        onClick={() => setToast("none")}></button>
                                    </div>
                                    <div className="toast-body bg-light">
                                        Are You sure you want to Delete this Post ?
                                    </div>
                                    <div className="mt-2 pt-2 border-top d-flex justify-content-end bg-light">
                                        <button type="button" className="btn btn-primary btn-sm me-3 mb-2"
                                        onClick={() => {
                                            deletePost();
                                            setToast("none");
                                        }}>Yes</button>
                                        <button type="button" className="btn-light mb-2 me-3" data-bs-dismiss="toast" 
                                        style={{background:"#e0e0e0", border:"0px", borderRadius:"5px" }}
                                        onClick={() => setToast("none")}>No</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer transition = {Slide} />
        </div>
    )
}

export default Post;
