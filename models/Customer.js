const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = {
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: 'A customer must have a name'
    },
    phone: {
        type: Number,
        required: 'A customer must have a number'
    }
};

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
};

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validate = validateCustomer;