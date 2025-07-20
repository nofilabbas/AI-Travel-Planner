import React, { useState, useEffect } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
    const [placeImages, setPlaceImages] = useState([]);

    useEffect(() => {
        const fetchPlaceImages = async () => {
            if (!trip?.tripData?.itinerary) return;

            // Collect all places into one array
            const allPlaces = [];
            Object.values(trip.tripData.itinerary).forEach(dayDetails => {
                dayDetails.plan.forEach(place => {
                    allPlaces.push(place.placeName);
                });
            });

            // Fetch images for all places
            const fetchedImages = await Promise.all(
                allPlaces.map(async (placeName) => {
                    try {
                        const res = await fetch(`https://api.unsplash.com/search/photos?query=${placeName}&client_id=W061DFLoUU_44-QW6N93eUyKiX9fv8iMaxO-vbtLqCs&per_page=1`);
                        const data = await res.json();
                        return data.results?.[0]?.urls?.regular || '/placeholder.png';
                    } catch (error) {
                        console.error(error);
                        return '/placeholder.png';
                    }
                })
            );

            setPlaceImages(fetchedImages);
        };

        fetchPlaceImages();
    }, [trip?.tripData?.itinerary]);

    return (
        <div>
            <h2 className='font-extrabold text-xl mt-5 mb-3'>Places to Visit</h2>

            <div>
                {trip?.tripData?.itinerary && Object.entries(trip.tripData.itinerary).map(([day, details]) => (
                    <div key={day} className="mb-8">
                        <h2 className="text-lg font-bold">{day.toUpperCase()} - {details.theme}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {details.plan.map((place, index) => (
                                <div className=''>
                                    <div className='border rounded-xl p-3 mt-2 flex gap-5 
                                    hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                                        <img
                                            src={placeImages[index] || '/placeholder.png'}
                                            alt={place.placeName}
                                            className="w-[200px] h-[200px] rounded-xl object-cover"
                                        />

                                        <div>
                                            <h2 className="text-lg font-bold">{place.placeName}</h2>
                                            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                                            <p className="text-xs mb-1"><strong>Rating:</strong> ⭐ {place.rating}</p>
                                            <p className="text-xs mb-1"><strong>Best Time to Visit:</strong> {place.timeToVisit}</p>
                                            <p className="text-xs mb-1"><strong>Estimated Travel Time:</strong> {place.travelTimeFromHotel || place.travelTimeFromGateway || place.travelTimeFromCST}</p>
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
                                                <Button size='sm'><FaMapLocationDot /></Button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PlacesToVisit