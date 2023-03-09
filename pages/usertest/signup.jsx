import Link from 'next/link'
import React, { useState } from 'react'
import {auth} from '@/firebaseconfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/router'



export default function Signup() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const submitHandler = async (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: name, 
                photoURL: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              }).then(() => {
                // Profile updated!
                // ...
              })
          router.push("/login")
        }).catch(error => console.log(error.code))
   
    
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/account")
      } 
    });

  return (
    <div className="max-w-lg mx-auto shadow p-3 select-none">
        <h1 className="text-5xl text-red-600 mb-10 mt-3 block">Please Signup!!</h1>
        <form onSubmit={submitHandler} >
            <input type="text" placeholder='Name' className="w-full border border-red-400 p-1 rounded outline-none" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email' className="w-full border border-red-400 mt-5 p-1 rounded outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className="w-full border border-red-400 p-1 mt-5 rounded outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex items-center gap-5">
            <button type="submit" className="px-5 py-1 bg-gray-700 text-gray-100 my-5">Submit</button>
            <Link href="/login" className="text-red-400 underline" >You have a account? Login</Link>
            </div>
        </form>
    </div>
  )
}
