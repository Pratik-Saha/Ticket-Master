const User = require('../app/models/user')

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    if(token){
        User.findByToken(token)
            .then((user) => {
                req.user = user,
                req.token = token
                next()
            })
            .catch((err) => {
                res.status(401).json({
                    notice: err
                })
            })
    }else{
        res.status(401).json({
            notice: 'Token not available'
        })
    }
    
}

module.exports = authenticateUser