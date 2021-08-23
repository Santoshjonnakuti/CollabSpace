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
        const response = await axios.post("http://localhost:5000/newPost", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
            body : {Title, Description}});
        console.log(response.status);
        if(response.status === 200) {
            setUserData(response.data);
            toast.success("Posted Successfully!", {position: "top-center", autoClose: 3000, hideProgressBar: true});
            setTimeout(() => {
                history.push("/Account/Posts");
            }, 3000);

        }
        else {
            console.log("Error!");
            // toast.error("Error!", {position: "top-center", autoClose: 3000, hideProgressBar: true});
            setInvalid({
                "border": "1px solid red",
                "MozBoxShadow": `0 0 5px red`,
                "WebkitBoxShadow": `0 0 5px red`,
                "boxShadow": `0 0 5px red`
            })
            toogle(Title, isTitleValid, setIsTitleValid);
            toogle(Description, isDescriptionValid, setIsDescriptionValid);

        }
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
                        <textarea  placeholder="Description" cols={24} rows ={10} required
                            onChange = {(event) => {setDescription(event.target.value)
                            toogle(event.target.value, isDescriptionValid, setIsDescriptionValid)}} value = {Description}
                            style={isDescriptionValid ? Valid : Invalid}
                            />
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