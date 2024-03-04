const Booking = require('./bookingModel');

// Endpoint to handle booking submissions
const booking = async (req, res) => {
    console.log(req.body);
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).send(newBooking);
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(400).send({ error: 'Failed to save booking' });
    }
};

module.exports = { booking };
