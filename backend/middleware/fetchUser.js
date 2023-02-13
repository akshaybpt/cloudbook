const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SCERET = process.env.JWT_KEY; //store in env variable // not to be shown to anyone


const fetchuser=(req,res,next)=>{


    // get the user details form the tocken 

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SCERET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports=fetchuser;

