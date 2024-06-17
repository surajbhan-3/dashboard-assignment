const jwt = require("jsonwebtoken");

const AuthenticationMiddleware =  async(req,res, next)=>{

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "No token provided", result: false });
}
    const token = authHeader.split(" ")[1];
    try {
        const decodeToken = jwt.verify(token,process.env.SECRET);
        req.body.userId = decodeToken.userId;
        console.log(req.body.userId)
        next();
    } catch (error) {
        return res.status(401).send({message:"Authentication failed", Error:error.message, result:false})
    }
}




module.exports = {AuthenticationMiddleware}