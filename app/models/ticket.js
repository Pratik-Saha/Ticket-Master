const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }],
    message: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket