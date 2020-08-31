const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    show,
    new: newFlight,
    create,
};

function index(req, res) {
    Flight.find({},
        function(err, flights) {
            res.render('flights/index', { flights });
        });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id }, function(err, tickets) {
            res.render('flights/show', {
                flight,
                tickets,
                title: 'Flight Details',
                newDate: getDefaultDate()
            });
        })
    });
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: 'New Flight',
        newDate: getDefaultDate()
    });
}

function getDefaultDate() {
    let newFlight = new Flight();
    let oldDate = newFlight.departs
    let newDate = oldDate.toISOString().slice(0, 16);
    return newDate;
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) {
            return res.render('flights/new', {
                title: 'New Flight',
                newDate: getDefaultDate()
            });
        }
        res.redirect('/flights');
    });
}