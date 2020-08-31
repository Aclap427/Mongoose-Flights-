const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {
        type: Date,
    }
}, { timestamps: true });

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Delta', 'Southwest', 'United'],
    },
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'SAN', 'LAX'],

    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            let oneYearFromNow = new Date()
            return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        }
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});



module.exports = mongoose.model('Flight', flightSchema);