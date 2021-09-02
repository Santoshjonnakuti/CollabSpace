const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const DBConnection = require("./Database/DBConnection/DBConnection");
const User = require("./Database/Models/User");
const Authenticate = require("./Middleware/Auth");
const Post = require("./Database/Models/Post");

const app = express();
dotenv.config({path : './config.env' });
const corsConfig = {
    origin: true,
    credentials: true,
  };
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));  
app.use(express.json());
app.use(cookieParser());

DBConnection();

app.post("/signup-user", async (req, res) => {

    const {FirstName, LastName, Email, Password, Country, Gender} = req.body.body;
    let user = {};
    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Gender = Gender;
    user.Country = Country;
    user.Email = Email;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    user.Joined = `${dd}/${mm}/${yyyy}`;
    user.Posts = "0";
    user.Likes = "0";
    const PasswordHash = await bcrypt.hash(Password, 12);
    user.Password = PasswordHash;
    try {
        let userModel = new User(user);
        const token = await jwt.sign({_id: user._id, Username: user.Email}, process.env.SECRET_KEY);
        userModel.tokens = userModel.tokens.concat({token: token});
        await userModel.save();
        res.send({"Status": "200", "Message":"Signup Successful..."});
    } catch (error) {
        res.send({"Status":"400", "Message":"Error"});
    }


});

app.post("/login-user", async (req, res) => {
    const {Username, Password} = req.body.body;
    try {
        const user = await User.findOne({"Email" : Username});
        if(!user || user.length === 0) {
            res.json({"Status": "400", "Message": "Invalid Username/Password"});
        }
        else {
            if(bcrypt.compareSync(Password, user.Password)) {
                const token = await jwt.sign({_id: user._id, Username: user.Email}, process.env.SECRET_KEY);
                res.cookie("jwtoken", token, {
                    httpOnly: true
                });
                user.tokens = user.tokens.concat({token:token});
                await user.save();
                res.send({"Status": "200", "Username": Username, "Message": `User Logged in Successfully...\n${Username}`});
            }
            else {
                res.json({"Status": "400", "Message": "Invalid Username/Password"});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({"Status": "400", "Message": "Error!"});   
    }
});

app.get("/auth", Authenticate, async(req, res) =>{
    if(!req.rootUser) {
        res.status(401).send({});
    }
    else {
        res.status(200).send(req.rootUser);
    }
})

app.get("/feed", Authenticate, async(req, res) => {
    if(!req.rootUser) {
        res.status(401).send({});
    }
    else {
        const feed = await Post.find({$nor:[{$and:[{'Email':req.rootUser.Email}]}]}).sort({"postedOn": -1});
        const rootUser = req.rootUser;
        const Authorized = true;
        res.status(200).send({rootUser, feed, Authorized});
    }
});

app.get("/posts", Authenticate, async(req, res) => {
    if(!req.rootUser) {
        res.status(401).send({});
    }
    else {
        const posts = await Post.find({"Email" : req.rootUser.Email}).sort({"postedOn": -1});
        // console.log(posts);
        const rootUser = req.rootUser;
        const Authorized = true;
        res.status(200).send({rootUser, posts, Authorized});
    }
});

app.get("/profile", Authenticate, async(req, res) => {
    if(!req.rootUser) {
        res.status(401).send({});
    }
    else {
        const posts = await Post.find({"Email": req.rootUser.Email});
        const rootUser = req.rootUser;
        const Posts = await Post.find({});
        let Liked = 0;
        let Commented = 0;
        for(const post in Posts) {
            for(const likedUser in Posts[post].LikedBy) {
                if(Posts[post].LikedBy[likedUser] === req.rootUser.Email) {
                    Liked += 1;
                }
            }
            for(const comment in Posts[post].Comments) {
                if(Posts[post].Comments[comment].Email === req.rootUser.Email) {
                    Commented += 1;
                }
            }
        }
        const Authorized = true;
        res.status(200).send({rootUser, posts, Authorized, Liked, Commented});
    }
});

app.post("/newPost", Authenticate, async(req, res) => {
    if(!req.rootUser) {
        res.status(401).send({});
    }
    else {
        const {Title, Description} = req.body.body;
        let post = {};
        post.Name = req.rootUser.FirstName + " " + req.rootUser.LastName;
        post.Email = req.rootUser.Email;
        post.Gender = req.rootUser.Gender;
        post.Title = Title;
        post.Description = Description;
        post.Likes = 0;
        post.postedOn = new Date();
        try {
            let postModel = new Post(post);
            await postModel.save();
            const user = await User.findOne({"Email" : req.rootUser.Email});
            user.Posts = parseInt(user.Posts) + 1;
            await user.save();
            res.status(200).send(req.rootUser);
        } catch (error) {
            res.status(201).send(req.rootUser);
        }
    }
});

app.post("/updateLike", Authenticate, async (req, res) => {
    if(req.rootUser) {
        const {isLiked, Time, User} = req.body.body;
        const post = await Post.findOne({"Email" : User, "postedOn" : Time});
        if(isLiked) {
            post.Likes = parseInt(post.Likes) + 1;
            try {
                await post.save();
                await Post.findOneAndUpdate({"Email": User, "postedOn": Time}, {
                    $addToSet: {
                        LikedBy: req.rootUser.Email,
                    },
                });

            } catch (error) {
                console.log(error);
            }
        }
        else {
            post.Likes = parseInt(post.Likes) - 1;
            try {
                await post.save();
            } catch (error) {
                console.log(error);
            }
            await Post.findOneAndUpdate({"Email": User, "postedOn": Time}, {
                $pull: {
                    LikedBy: req.rootUser.Email,
                },
            })
        }
    }
});

app.post("/getPost",Authenticate, async (req, res) => {
    const {_id, Feed} = req.body.body;
    if(!Feed) {
        if(_id) {
            const post = await Post.find({"_id" : _id, "Email":req.rootUser.Email});
            if(post.length > 0) {
                const rootUser = req.rootUser;
                const Authorized = true;
    
                res.status(200).send({rootUser, post, Authorized});
            }
            else {
    
                res.send({"Authorized": false});
            }
        }
    }
    else {
        if(_id) {
            const post = await Post.find({"_id" : _id});
            if(post.length > 0) {
                const rootUser = req.rootUser;
                const Authorized = true;
                res.status(200).send({rootUser, post, Authorized});
            }
            else {
                res.send({"Authorized": false});
            }
        }
    }
});

app.post("/addComment", Authenticate, async (req, res) => {
    const {_id} = req.body.body;
    if(_id) {
        const post = await Post.find({"_id" : _id});
        let comment = {};
        comment.Name = req.rootUser.FirstName + " " + req.rootUser.LastName;
        comment.Email = req.rootUser.Email;
        comment.Gender = req.rootUser.Gender;
        comment.postedOn = new Date();
        comment.UserComment = req.body.body.UserComment;
        post[0].Comments = post[0].Comments.concat(comment);
        await post[0].save();
        res.send({"Message" : "Comment Posted Successfully!", "Comments": post[0].Comments});
    }
});

app.post("/deletePost", Authenticate, async(req, res) => {
    const {_id} = req.body.body;
    if(_id) {
        const post = await Post.findOneAndDelete({"_id":_id});
        const user = await User.findOne({"Email" : req.rootUser.Email});
        user.Posts = parseInt(user.Posts) - 1;
        await user.save();
        res.status(200).send({"Success":true});
    }
});

function removeItem(ARRAY, item) {
    ARRAY = ARRAY.filter(i => i != item);
    return ARRAY;
}
app.post("/updateCommentLike", Authenticate, async (req, res) => {
    if(req.rootUser) {
        const {_id, isLiked, comment_id} = req.body.body;
        const post = await Post.findOne({"_id":_id});
        if(isLiked) {
            try {
                let Index = 0;
                for(const comment in post.Comments) {
                    if(comment_id.includes(post.Comments[comment]._id)) {
                        Index = comment;
                        post.Comments[Index].LikedBy = post.Comments[Index].LikedBy.concat(req.rootUser.Email);
                        await post.save();
                        break;
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                let Index = 0;
                for(const comment in post.Comments) {
                    if(comment_id.includes(post.Comments[comment]._id)) {
                        Index = comment;
                        break;
                    }
                }
                post.Comments[Index].LikedBy = removeItem(post.Comments[Index].LikedBy, req.rootUser.Email);
                await post.save();
            } catch(error) {
                console.log(error);
            }
        }
    }
});

app.post("/updateCommentReply", Authenticate, async (req, res) => {
    if(req.rootUser) {
        const {_id, comment_id, Reply} = req.body.body;
        const post = await Post.findOne({"_id":_id});
        try {
            let Index = 0;
            for(const comment in post.Comments) {
                if(comment_id.includes(post.Comments[comment]._id)) {
                    Index = comment;
                    let reply = {};
                    reply.Name = req.rootUser.FirstName + " " + req.rootUser.LastName;
                    reply.Email = req.rootUser.Email;
                    reply.Gender = req.rootUser.Gender;
                    reply.postedOn = new Date();
                    reply.UserReply = Reply;
                    post.Comments[Index].Replies = post.Comments[Index].Replies.concat(reply);
                    await post.save();
                    break;
                }
            }
            const Replies = post.Comments[Index].Replies;
            res.send({"Message" : "Reply Posted Successfully!", "Replies": Replies});
        } catch (error) {
            console.log(error);
            res.send({"Message": "Error!"});
        }
    }
});

app.post("/forgotPassword", async(req, res) => {
    const {Email} = req.body.body;
    if(!Email) {
        res.send({"Status": "400", "Message": "Error"});
        
    }
    const user = await User.findOne({"Email": Email});
    if(!user) {
        res.send({"Status": "400", "Message":"User Does not Exist"});
    }
    else {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const token = await jwt.sign({Email: Email, OTP: OTP}, process.env.SECRET_KEY, {
            expiresIn : 600000 
        });
        res.cookie("jwtokenOTP", token, {
            httpOnly: true
        });
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'portalexamination@gmail.com',
                  pass: process.env.PASSWORDMAIL
                }
              });
              
              var mailOptions = {
                from: 'portalexamination@gmail.com',
                to: Email,
                subject: 'Resetting Your Password for CollabSpace',
                text: `Please Do not share your otp.\nYour OTP is ${OTP}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        } catch (error) {
            res.send({"Status": "400", "Message": "Error"}); 
        }
        res.send({"Status": 200, "Message": "OTP sent Successfully..."});
    }

})

app.post("/otpEntry", async (req, res) => {
    let {OTP} = req.body.body;
    try {
        const token = jwt.verify(req.cookies.jwtokenOTP, process.env.SECRET_KEY);
        OTP = parseInt(OTP);
        if(OTP === token.OTP) {
            res.send({"Status": 200, "Message":"OTP Validated!"});
        }
        else {
            res.send({"Status": "400", "Message":"Invalid OTP"});
        }
    } catch (error) {
        res.send({"Status": "400", "Message":"Error!"});
    }
});

app.post("/resetPassword", async(req, res) => {
    const {Password} = req.body.body;
    let token = {};
    try {
        token = jwt.verify(req.cookies.jwtokenOTP, process.env.SECRET_KEY);
    }
    catch(error) {
        res.send({"Status":"400", "Message":"Error!"});
    }
    const Email = token.Email;
    const user = await User.findOne({"Email": Email});
    if(user) {
        user.Password = await bcrypt.hash(Password, 12);
        await user.save();
        res.clearCookie('jwtokenOTP', {path: "/"});
        res.send({"Status": 200, "Message": "Password Reset Success..."});
    }
});

app.get("/logout", async(req, res) => {
    res.clearCookie('jwtoken', {path :"/"});
    res.status(200).send("Logged Out!");

});

app.listen(5000, () => console.log("Server Started...\nListening on port 5000...")); 