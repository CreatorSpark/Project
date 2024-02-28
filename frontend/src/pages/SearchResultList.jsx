import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import roundRating from "../utils/ratings";

const SearchResultList = ({ searchResults }) => {
  if (!Array.isArray(searchResults) || searchResults.length === 0) {
    return <div className="text-center">No results found.</div>;
  }

  return (
    <div className="flex gap-1">
      {searchResults.map((result, index) => (
        <div key={index} className="w-full md:w-1/4 lg:w-1/4 p-2 ">
          <Card>
            <div className="tour__img">
              <img src="tour-images/tour.jpg" alt="tour" />
            </div>
            <CardBody>
              <h5 className="tour__title mt-2">
                <span>{result.Travel_Company}</span>
              </h5>
              <div className="tour__details">
                <span className="tour__location d-flex align-items-center gap-1">
                  <i className="ri-map-pin-line"></i>
                  {result.Destination}  
                </span>
                <span className="tour__duration d-flex align-items-center gap-1">
                  <i className="ri-time-line"></i>
                  {result.Duration} days
                </span>
                <span className="tour__rating d-flex align-items-center gap-1">
                  <i className="ri-star-fill" style={{ color: 'green' }}></i>
                  {roundRating(result.PredictedRating)} / 5
                </span>
              </div>
              <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                <h5>
                  Rs. {result.Price} <span> /per person</span>
                </h5>
                <button className="booking__btn">
                  <Link to="#"> Book Now</Link>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
