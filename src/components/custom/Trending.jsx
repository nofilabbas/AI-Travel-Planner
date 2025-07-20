import React from "react";
import './style.css'

const TrendingPlaces = () => {
  const places = [
    { image: "/dubai.png", name: "Dubai" },
    { image: "/new-york.png", name: "New York" },
    { image: "/paris.png", name: "Paris" },
    { image: "/new-delhi.png", name: "New Delhi" },
  ];

  return (
    <div className="container">
      <h2 className="sub-title">Trending Places</h2>
      <div className="trending">
        {places.map((place, index) => (
          <div key={index}>
            <img src={place.image} alt={place.name} />
            <h3>{place.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPlaces;
