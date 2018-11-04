const mongoose = require('mongoose');

const rentalSchema = {
    movie:{
        type: {
            title: {
                type: String,
                required: 'A movie must have a title'
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        },
        required: true,
        ref: 'Movies'
    },
    customer: {
        type: {
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
        },
        required: true,
        ref: 'Customer'
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
};

const Rental = mongoose.model('Rental', rentalSchema);

exports.Rental = Rental;