
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TourDetails from './TourDetails';
import BookingForm from './BookingForm';

const Book = () => {
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        date: '',
        totalTravelers: 1,
        price: 0, // Initializing with 0, will be updated from location state
        totalPrice: 0 // Initializing with 0, will be updated based on totalTravelers
    });

    const location = useLocation();
    const [tourDetails, setTourDetails] = useState({
        destination: "",
        days: "",
        travelAgency: "",
        price: 0 // Price from the tour details
    });

    useEffect(() => {
        if (location.state && location.state.tour) {
            const { tour } = location.state;
            setTourDetails({
                destination: tour.Destination,
                days: tour.Duration,
                travelAgency: tour.Travel_Company,
                price: tour.Price
            });

            // Update booking details with the price from the tour
            setBookingDetails(prevState => ({
                ...prevState,
                price: tour.Price,
                totalPrice: tour.Price * prevState.totalTravelers
            }));
        }
    }, [location.state]);

    // Function to handle changes in input fields
    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setBookingDetails(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    // Function to handle changes in the number of travelers
    const handleTotalTravelersChange = (e) => {
        const totalTravelers = parseInt(e.target.value, 10);
        setBookingDetails(prevState => ({
            ...prevState,
            totalTravelers,
            totalPrice: prevState.price * totalTravelers
        }));
    };

    return (
        <div className="flex justify-center">
            <TourDetails tourDetails={tourDetails} />
            <BookingForm bookingDetails={bookingDetails} handleTotalTravelersChange={handleTotalTravelersChange} handleInputChange={handleInputChange} />
        </div>
    );
}

export default Book;
