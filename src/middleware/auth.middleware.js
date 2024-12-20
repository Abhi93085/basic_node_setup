const jwt = require('jsonwebtoken');
class AuthMiddleware {
    static verifyToken(req,res,next) {
        try {
            const token= req.header('Authorization');
            if(!token) {
                return res.status(401).json({message: 'Authorization token is missing'});
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.id=decoded.id;
            next();
        } catch (error) {
            return res.status(401).json({message: 'Token Verfication failed'});
        }
    }

}

module.exports= AuthMiddleware;