const jwt = require('jsonwebtoken');
const secretKey = '41322884jm';

const verifyToken = (req, res, next) => {
    console.log('header:',req.header('auth-token'))
    const token = req.header('auth-token')
    console.log('verify token:',token)
    if (!token) return res.status(401).json({error: 'Denied access' })
    try {
        const verified = jwt.verify(token, secretKey)
        req.user = verified 
        next()
    } catch (error){
        res.status(400).json({error: 'invalid token.'})
    }
}

module.exports = verifyToken;