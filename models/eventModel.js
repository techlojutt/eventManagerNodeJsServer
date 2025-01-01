const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    attendes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    rsvpCount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
        
},{
    timestamps: true
})


const Events = mongoose.model('Events', eventSchema);

module.exports = Events;