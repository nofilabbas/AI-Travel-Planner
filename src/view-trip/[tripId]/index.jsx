import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotel from '../components/Hotel';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'AiTrip', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document:', docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log('No such document');
            toast("No Trip Found!")
        }
    }


    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information section */}
            <InfoSection trip={trip} />

            {/* Disclaimer */}
            <p className="text-s text-gray-500 mt-10">
                These recommendations are AI-generated based on your preferences. Prices and timings are estimated — please verify before booking.
            </p>
            {/* Recommended hotels */}
            <Hotel trip={trip} />

            {/* Daily plan */}
            <PlacesToVisit trip={trip} />


        </div>
    )
}

export default ViewTrip
