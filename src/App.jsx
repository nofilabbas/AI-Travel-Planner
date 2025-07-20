import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Hero from './components/custom/Hero'
import Exclusives from './components/custom/Exclusives'
import TrendingPlaces from './components/custom/Trending'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Hero */}
      <Hero/>
      <Exclusives />
      <TrendingPlaces />
    </>
  )
}

export default App
