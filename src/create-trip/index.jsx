import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AImodel';
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../service/firebaseConfig';
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const [locationData, setLocationData] = useState([]);

const fetchLocationSuggestions = async (query) => {
  if (query.length > 2) {
    const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.dd6741fd3a7660cdfe38b1fb65059ae8&q=${query}&format=json`);
    setLocationData(response.data);
    console.log(response.data);
  }
};

const handleLocationSelect = (selectedLocation) => {
  setPlace(selectedLocation.display_name); // Save the selected location name
  handleInputChange('location', selectedLocation.display_name); // Pass the selected location to the form data
  setLocationData([]); // Clear suggestions after selection
};

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (formData?.noOfDays > 5 && !formData?.budget || !formData?.location || !formData?.travelers) {
      toast("Please fill all details.")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      //.replace('{location}', formData?.location?.label)
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{travelers}', formData?.travelers)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)


    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log('--', result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());
  }

  const saveAiTrip = async (tripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      onGenerateTrip();
    })
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell Us Your Travel Preferences 🏕️🌴</h2>
      <p className='text-gray-500 mt-3 text-xl'>Just provide some basic information, and our trip planner will generate a customized iternanry based on your preferences</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination choice?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v)
              }
            }}
          /> */}

          {/* <Input placeholder={'Ex.3'} type='text'
            onChange={(e) => handleInputChange('location', e.target.value)}
          /> */}


<Input
            placeholder="Enter your destination"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              fetchLocationSuggestions(e.target.value);
            }}
          />
          {locationData.length > 0 && (
            <ul>
              {locationData.map((location) => (
                <li
                  key={location.place_id}
                  onClick={() => handleLocationSelect(location)}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                >
                  {location.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
          <Input placeholder={'Ex.3'} type='text'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>

        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you wish to travel with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelerList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('travelers', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.travelers == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-10 flex justify-end'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
          }
        </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the app with google authentication securely</p>

              <Button className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle />
                Sign In WIth Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>

  )
}

export default CreateTrip