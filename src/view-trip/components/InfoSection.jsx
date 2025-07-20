import React from 'react'
import { Button } from '../../components/ui/button'
import { IoMdShare } from "react-icons/io";
import useUnsplashImages from '../../hooks/useUnsplashImages';


function InfoSection({ trip }) {
    const images = useUnsplashImages(trip?.userSelection?.location, 1);

    return (
        <div>
            <img src={images[0]?.urls?.regular || '/placeholder.png'} className='h-[340px] w-full object-cover rounded-xl' alt="" />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-extrabold text-2xl'>{trip?.userSelection?.location}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>📆 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>👨🏻‍👩🏻‍👦🏻‍👦🏻 No. of travelers: {trip?.userSelection?.travelers}</h2>
                    </div>
                </div>
                <Button><IoMdShare /></Button>
            </div>
        </div>
    )
}

export default InfoSection