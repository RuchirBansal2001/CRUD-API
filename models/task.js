const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name."]
    },
    completed: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
},
{
    timestamps: true
});

const Product=mongoose.model('Task', taskSchema);
module.exports = Product;

