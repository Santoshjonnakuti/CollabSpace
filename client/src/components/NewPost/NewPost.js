import React, {useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast, Slide} from "react-toastify";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import UnAuthorized from "../UnAuthorized/UnAuthorized";
import "./NewPost.css";
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";


function NewPost(props) {
    const history = useHistory();
    const [Authorized, setAuth] = useState(true);
    const [UserData, setUserData] = useState({});
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [Valid] = useState({});
    const [Invalid, setInvalid] = useState({
        "MozBoxShadow": `0 0 5px white`,
        "WebkitBoxShadow": `0 0 5px white`,
        "boxShadow": `0 0 5px white`
    });
    const [PostImage, setPostImage] = useState({});
    const [isImage, setIsImage] = useState(false);
    const toogle = (target, stateValue, ValuesetState) => {
        if(target.length > 0) {
            ValuesetState(true)
        }
        else {
            ValuesetState(false)
        }
    }
    const postPost = async (event) => {
        event.preventDefault();
        console.log(PostImage);
        const fd = new FormData();
        fd.append("Title", Title);
        fd.append("Description", Description);
        if(isImage) {
            fd.append("PostImage", PostImage, PostImage.name);
        }
        console.log(fd);
        fetch("http://localhost:5000/newPost", {
            method: "POST",
            credentials:"include",
            body: fd,
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.Status === "200") {
                toast.success(result.Message, {position:"top-center", autoClose:3000, hideProgressBar:true});
                setTimeout(() => {
                    history.push("/Account/Posts");
                }, 3000);
            }
            else {
                toast.error(result.Message, {position:"top-center", autoClose:3000, hideProgressBar:true});
                setInvalid({
                    "border": "1px solid red",
                    "MozBoxShadow": `0 0 5px red`,
                    "WebkitBoxShadow": `0 0 5px red`,
                    "boxShadow": `0 0 5px red`
                })
                toogle(Title, isTitleValid, setIsTitleValid);
                toogle(Description, isDescriptionValid, setIsDescriptionValid);
            }
        })
        .catch((error) => {
            toast.error("Error!", {position:"top-center", autoClose:3000, hideProgressBar:true});
            setInvalid({
                "border": "1px solid red",
                "MozBoxShadow": `0 0 5px red`,
                "WebkitBoxShadow": `0 0 5px red`,
                "boxShadow": `0 0 5px red`
            })
            toogle(Title, isTitleValid, setIsTitleValid);
            toogle(Description, isDescriptionValid, setIsDescriptionValid);
        });
    }
    const callFeed = async () => { 
        const response = await axios.get("http://localhost:5000/auth", {
        method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        if(response.status === 200) {
            setAuth(true);
            setUserData(response.data);
        }
        else {
            setAuth(false);
        }
    }
    useEffect(() => {
        callFeed();
        
    }, []);
    return (
        Authorized ?
        <div className="new-post-container">
            <Navbar isLoggedIn= "true" UserData={UserData} />
            <div className="new-post-card-holder">
                <div className="new-post-card">
                    <h3>New Post</h3>
                    <form method="POST">
                    <div>
                        <input type="text" placeholder="Title" required onChange = {(event) => {setTitle(event.target.value)
                        toogle(event.target.value, isTitleValid, setIsTitleValid)} } value={Title}
                        style={isTitleValid ? Valid : Invalid}
                        />
                    </div>
                    <div>
                        <textarea  placeholder="Description" cols={28} rows ={10} required
                            onChange = {(event) => {setDescription(event.target.value)
                            toogle(event.target.value, isDescriptionValid, setIsDescriptionValid)}} value = {Description}
                            style={isDescriptionValid ? Valid : Invalid}
                            />
                    </div>
                    <div>
                        <label>
                            <i className="bi bi-card-image">
                                <input type="file" style={{display:"none"}} accept=".jpg, .png"
                                onChange={(event) => {setPostImage(event.target.files[0])
                                setIsImage(true)}}/>
                            </i>
                            Upload Image
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={postPost}>Post</button>
                    </form>
                </div>
                
            </div>
            <Footer />
            <ToastContainer transition = {Slide} />
        </div>
        :
        <UnAuthorized />
    )

}
export default NewPost;