const mongoose = require('mongoose')

const Schema = mongoose.Schema

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(email) {
                let isValidEmail = REGEX_EMAIL.test(email)
                if (isValidEmail) {
                    return true
                }
                else {
                    return "Email khong hop le !"
                }
            }
        }
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cartItem: {
        type: Array,
        required: true
    }
})

module.exports = orderSchema