const User = require('../models/user')
const bcryptjs = require('bcryptjs')

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    User.findByCredential(email, password)
        .then((user) => {
            return user.generateToken()   
        })
        .then((token) => {
            res.header('x-auth', token).send({})
            //res.setHeader('x-auth', token).send({})
        })
        .catch((err) => {
            res.send(err)
        })
}