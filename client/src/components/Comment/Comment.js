import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import defaultOther from "../../images/default-other.png";
import defaultMale from "../../images/default-male.jpg";
import defaultFemale from "../../images/default-female.jpg";
import 'react-toastify/dist/ReactToastify.css';
import "./Comment.css";

function Com(props) {
    console.log(props);
    const [Heart, setHeart] = useState("bi bi-heart");
    const [isReplying, setIsReplying] = useState(false);
    const [Reply, setReply] = useState("");
    const [ReplyCancel, setReplyCancel] = useState("Reply");
    const [Replies, setReplies] = useState(props.Replies);
    const [showReplies, setShowReplies] = useState(false);
    const [showHideReplies, setShowHideReplies] = useState("View Replies")
    const getProfile = (Gender) => {
        if(Gender === "Male") {
            return defaultMale;
        }
        else if(Gender === "Female") {
            return defaultFemale;
        }
        return defaultOther;
    }
    const likeDislikeComment = async () => {
        if(Heart === "bi bi-heart") {
            setHeart("bi bi-heart-fill");
            await axios.post("http://localhost:5000/updateCommentLike", {
            method :"POST",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "inculde",
            body : { "_id" : props.PostId, "isLiked": true, "comment_id":props._id }
        });
        }
        else {
            setHeart("bi bi-heart");
            await axios.post("http://localhost:5000/updateCommentLike", {
            method :"POST",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "inculde",
            body : { "_id" : props.PostId, "isLiked": false, "comment_id":props._id }
        });
        }
    }
    const reply = (event) => {
        event.preventDefault();
        setIsReplying(!isReplying);
        if(ReplyCancel === "Reply") {
            setReplyCancel("Cancel");
        }
        else {
            setReplyCancel("Reply");
        }
    }
    const postReply = async () => {
        const response = await axios.post("http://localhost:5000/updateCommentReply", {
            method :"POST",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "inculde",
            body : { "_id" : props.PostId, "comment_id":props._id, "Reply": Reply }
        });
        if(response.status === 200) {
            toast.success(response.data.Message, {position: "top-center", autoClose: 3000, hideProgressBar: true});
            setReplies(response.data.Replies);
            setReply("");
        }
        else {
            toast.error(response.data.Message, {position:"top-center", autoClose: 3000, hideProgressBar: true});
            setReply("");
            
        }
    }

    const CommentReplies = () => {
        let array = [];
        if(showReplies) {
            for(const CommentReply in Replies) {
                console.log(Replies[CommentReply]);
                array.push(
                    <div key={Replies[CommentReply]._id} style={{paddingLeft:"60px"}}>
                        <div>
                            <p style={{textAlign:"center", display:"flex", alignItems:"center"}}>
                                <img src={getProfile(Replies[CommentReply].Gender)} height="32px" width="32px" alt="profile"
                                style={{borderRadius: "50%"}}></img>&nbsp;
                                {Replies[CommentReply].Name}
                            </p>
                        </div>
                        <p style={{paddingLeft:"37px"}}>
                            {Replies[CommentReply].UserReply}
                        </p>
                    </div>
                )
            }
            if(array.length < 1) {
                    array.push(<div style={{paddingLeft:"60px"}}>No Replies Yet...</div>);
            }
        }
        return array;
    }

    const toogleReplies = () => {
        setShowReplies(!showReplies);
        if(showHideReplies === "View Replies") {
            setShowHideReplies("Hide Replies");
        }
        else {
            setShowHideReplies("View Replies");
        }
    }

    useEffect(() => {
        if(props.Liked) {
            setHeart("bi bi-heart-fill");
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div>
                <p style={{textAlign:"center", display:"flex", alignItems:"center"}}>
                    <img src={getProfile(props.Gender)} height="32px" width="32px" alt="profile"
                    style={{borderRadius: "50%"}}></img>&nbsp;
                    {props.Name}
                </p>
            </div>
            <p style={{paddingLeft:" 37px"}}>
                {props.UserComment}
            </p>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button style={{background:"none", border:"0px", display:"flex", alignItems:"center"}}
                onClick={likeDislikeComment}>
                    <i className={Heart} style={{color:"red"}}>&nbsp;</i><span style={{color:"gray",
                    fontSize:"14px"}}>Like</span>
                </button>
                <button onClick={toogleReplies} style={{background:"none", border:"0px",
                 display:"flex", alignItems:"center", color:"gray"}}>{showHideReplies}</button>
                <button style={{background:"none", border:"0px", display:"flex", alignItems:"center"}}
                onClick={reply}>
                    <span style={{color:"gray",fontSize:"14px"}}><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                    width="24px" role="img">
                        <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5
                        a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 
                        4.475 6 6.36V15.5z"></path>
                    </svg>{ReplyCancel}</span>
                </button>
            </div>
            <div className="comment-reply-container" style={{marginTop:" 20px"}}>
                {CommentReplies()}
            </div>
            <hr/>
            {isReplying ?
                <div className="comment-section-new-comment">
                            <input type="text" placeholder="Reply" className="comment-reply" required
                                onChange={(event) => {setReply(event.target.value)}} value={Reply}
                            />
                            <button className="btn btn-secondary" style={{background:"gray"}}
                            onClick={postReply}>Reply</button>
                        </div>
            :
                <div>
                    
                </div>
            }
            <ToastContainer transition = {Slide} />
        </div>
    );
};

export default Com;