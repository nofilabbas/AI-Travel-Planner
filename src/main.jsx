import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import Footer from './view-trip/components/Footer.jsx'


const router =createBrowserRouter([
  {
    path:'/',
    element:<App />
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  }
])
ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
    <Footer/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
