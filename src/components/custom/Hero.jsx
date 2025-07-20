import React from 'react'
import { Button } from "@/components/ui/button"

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 '>
        <h1 className='font-extrabold text-[50px] text-center mt-6'>
        <span className='text-[#0a3265]'>Discover Your Next Adventure With AI:</span> Personalized Iternaries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom iternaries according to your interest and budget</p>
        <a href="/create-trip">
            <Button>Get Started, It's Free</Button>
            </a>

        <img src="/ockupt.png" className='h-[650px] w-[800px]' alt="" />
    </div>
  )
}

export default Hero