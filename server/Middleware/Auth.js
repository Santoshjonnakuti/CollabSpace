const jwt = require("jsonwebtoken");
const User = require("../Database/Models/User");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id: verifiedToken._id, "tokens.token": token});
        if(rootUser) {
            req.token = token;
            req._id = rootUser._id;
            req.rootUser = rootUser;
        }
        next();
    } catch (error) {
        console.log(error);

        res.send({"Authorized": false});
    }

}

module.exports = Authenticate
