import React from 'react';

const TourDetails = ({ tourDetails }) => (
    <div className="w-1/2 p-8">
        <h2 className="text-xl font-bold mb-4">Tour Details</h2>
        <p><strong>Destination:</strong> {tourDetails.destination}</p>
        <p><strong>Days:</strong> {tourDetails.days}</p>
        <p><strong>Travel Agency:</strong> {tourDetails.travelAgency}</p>
    </div>
);

export default TourDetails;
