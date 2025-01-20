const jwt = require('jsonwebtoken');
const secretKey = '41322884jm';

const verifyToken = (req, res, next) => {
    console.log('header:',req.header('Authorization'))
    const authHeader = req.header('Authorization')

    if(!authHeader) {
        return res.status(401).json({error: 'denied acess'});
    }

    const parts = authHeader.split(' ');

    if(parts.length != 2 || parts[0] !== 'Bearer') {
        return res.status(401).json ({error: 'Invalid authorization header format'})
    }

    const token = parts[1];
    console.log('verify token:',token)

    try {
        const verified = jwt.verify(token, secretKey)
        req.user = verified 
        next()
    } catch (error){
        res.status(401).json({error: 'invalid token.'})
    }
}

module.exports = verifyToken;