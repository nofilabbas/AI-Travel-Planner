import React from "react";
import './style.css'

const Exclusives = () => {
  const places = [
    { image: "/image-1.png", location: "London", price: "$250" },
    { image: "/image-2.png", location: "London", price: "$250" },
    { image: "/image-3.png", location: "London", price: "$250" },
    { image: "/image-4.png", location: "London", price: "$250" },
    { image: "/image-5.png", location: "London", price: "$250" },
    { image: "/image-6.png", location: "London", price: "$250" },
    { image: "/image-7.png", location: "London", price: "$250" },
    { image: "/image-8.png", location: "London", price: "$250" },
    { image: "/image-9.png", location: "London", price: "$250" },
    { image: "/image-10.png", location: "London", price: "$250" },
  ];

  return (
    <div className="container">
      <h2 className="sub-title">Exclusives</h2>
      <div className="exclusives">
        {places.map((place, index) => (
          <div key={index}>
            <img src={place.image} alt={place.location} />
            <span>
              <h3>{place.location}</h3>
              <p>Starts @ {place.price}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exclusives;
