const Ticket = require('../models/ticket')

module.exports.list = (req, res) => {
    Ticket.find({ user: req.user._id })
        .populate('department')
        .populate('customer')
        .then((tickets) => {
            res.send(tickets)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const ticket = new Ticket(body)
    ticket.user = req.user._id
    ticket.save()
        .then((ticket) => {
            res.send(ticket)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({ _id: id, user: req.user._id })
        .populate('department')
        .populate('customer')
        .then((ticket) => {
            if(ticket){
                res.send(ticket)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Ticket.findOneAndUpdate({ _id: id, user: req.user._id }, body, {
        new: true,
        runValidators: true
    })
    .then((ticket) => {
        if(ticket){
            res.send(ticket)
        }else{
            res.send({})
        }
    })
    .catch((err) => {
        res.send(err)
    })
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    Ticket.findOneAndDelete({ _id: id, user: req.user._id })
        .then((ticket) => {
            if(ticket){
                res.send(ticket)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}