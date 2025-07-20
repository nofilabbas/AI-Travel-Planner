import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    })
  }

  return (
    <div className='p-5 shadow-sm flex justify-between items-center px-15'>
      <a href="/"><img src="/logo.svg" alt="" /></a>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
            <Button variant='outline' className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="" /></PopoverTrigger>
              <PopoverContent><h2 className='cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        }

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

export default Header