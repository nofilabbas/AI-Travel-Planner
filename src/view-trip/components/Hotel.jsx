import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Hotel({trip}) {
    const [hotelImages, setHotelImages] = useState([]);
    useEffect(() => {
        const fetchHotelImages = async () => {
          if (!trip?.tripData?.hotelOptions) return;
      
          const fetchedImages = await Promise.all(
            trip.tripData.hotelOptions.map(async (hotel) => {
              try {
                const res = await fetch(`https://api.unsplash.com/search/photos?query=${hotel.hotelName}&client_id=W061DFLoUU_44-QW6N93eUyKiX9fv8iMaxO-vbtLqCs&per_page=1`);
                const data = await res.json();
                return data.results?.[0]?.urls?.regular || '/placeholder.png'; // fallback if no image found
              } catch (error) {
                console.error(error);
                return '/placeholder.png';
              }
            })
          );
      
          setHotelImages(fetchedImages);
        };
      
        fetchHotelImages();
      }, [trip?.tripData?.hotelOptions]);
      
  return (
    <div>
        <h2 className='font-extrabold text-xl mt-5 mb-3'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotelOptions?.map((hotel,index)=>(
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+','+ hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={hotelImages[index] || "/placeholder.png"} className='w-[320px] h-[270px] rounded-xl object-cover' alt="hello" />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <h2 className='font-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                        <h2 className='font-sm'>💰 {hotel?.price}</h2>
                        <h2 className='font-sm'>⭐ {hotel?.rating}</h2>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Hotel