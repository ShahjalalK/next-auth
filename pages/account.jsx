import React from 'react'
import {auth} from '@/firebaseconfig'
import { useRouter } from 'next/router';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Account() {
  const router = useRouter()
    const logOut = async () => {
     await signOut(auth).then(() => {
        router.push("/login")
      }).catch((error) => {
        console.log(error.code)
      });
    }

    console.log(auth.currentUser)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
        // ...
      } else {
        router.push('/login')
      }
    });
  return (
    <div className=" h-screen flex justify-center items-center w-full">
        <div className="px-10 py-10 border items-center text-center">
          <div className="mb-5">
           {auth && <h1 className="text-xl">{auth.currentUser.displayName}</h1>} 
           {auth &&  <h1>{auth.currentUser.email}</h1>}
          </div>
            <button className="px-5 py-1 bg-gray-600 text-gray-100 rounded" onClick={logOut}>Logout</button>
        </div>
    </div>
  )
}
