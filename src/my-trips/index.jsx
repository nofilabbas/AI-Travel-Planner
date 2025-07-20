import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../service/firebaseConfig';
import useUnsplashImages from '../hooks/useUnsplashImages';


function MyTrips() {

    const navigate = useNavigate();
    const [userTrips, setUserTrips]=useState([]);
    const [tripImages, setTripImages] = useState({});

    useEffect(() => {
        getUserTrip();
    }, [])

    const getUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
    
        const q = query(collection(db, "AiTrip"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
    
        const trips = []; // 🛑 create a trips array first
    
        querySnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() }); // ✅ store trip with id
        });
    
        setUserTrips(trips); // ✅ set all trips at once
    
        // Now fetch Unsplash images for each trip
        trips.forEach(async (trip) => {
            if (!trip?.userSelection?.location) return; // quick check
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${trip.userSelection.location}&client_id=W061DFLoUU_44-QW6N93eUyKiX9fv8iMaxO-vbtLqCs&per_page=1`);
            const data = await res.json();
            const imageUrl = data.results?.[0]?.urls?.regular;
    
            setTripImages(prev => ({
                ...prev,
                [trip.id]: imageUrl // 🧠 map images by trip ID
            }));
        });
    };

    
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {userTrips.map((trip, index) => {
                    return (
                        <Link key={trip?.id || index} to={'/view-trip/' + trip?.id}>
                            <div className='hover:scale-105 transition-all cursor-pointer'>
                                <img 
                                    className='object-cover rounded-xl w-full h-48' 
                                    src={tripImages[trip.id] || '/placeholder.png'}  
                                    alt={trip?.userSelection?.location || 'Trip Image'} 
                                />
                                <div>
                                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
                                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default MyTrips