import React from 'react';

const BookingForm = ({ bookingDetails, handleTotalTravelersChange, handleInputChange }) => (
    <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
        <div className="booking-form">
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Booking Name:</label>
                    <input type="text" id="name" name="name" value={bookingDetails.name} onChange={(e) => handleInputChange(e, 'name')} placeholder="Your booking name..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Travel Date:</label>
                    <input type="date" id="date" name="date" value={bookingDetails.date} onChange={(e) => handleInputChange(e, 'date')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>

                <div>
                    <label htmlFor="totalTravelers" className="block text-sm font-medium text-gray-700">Total Travelers:</label>
                    <input type="number" id="totalTravelers" name="totalTravelers" value={bookingDetails.totalTravelers} onChange={handleTotalTravelersChange} placeholder="Total travelers..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Total Price:</label>
                    <input type="text" id="price" name="price" value={`Rs ${bookingDetails.totalPrice}`} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default BookingForm;
