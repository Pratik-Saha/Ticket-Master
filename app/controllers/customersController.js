const Customer = require('../models/customer')

module.exports.list = (req, res) => {
    Customer.find({ user: req.user._id })
        .then((customers) => {
            res.send(customers)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Customer.findOne({ _id: id, user: req.user._id })
        .then((customer) => {
            if(customer){
                res.send(customer)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const customer = new Customer(body)
    customer.user = req.user._id
    customer.save()
        .then((customer) => {
            res.send(customer)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Customer.findOneAndUpdate({ _id: id, user: req.user._id }, body, {
            new: true, 
            runValidators: true,
        })
        .then((customer) => {
            res.send(customer)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    Customer.findOneAndDelete({ _id: id, user: req.user._id })
        .then((customer) => {
            if(customer){
                res.send(customer)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}