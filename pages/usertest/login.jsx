import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '@/firebaseconfig'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {        
        const user = userCredential.user;
        router.push("/account")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/account")
    } 
  });
  return (
    <div className="max-w-lg mx-auto shadow p-3 select-none">
      <h1 className="text-5xl text-red-600 mb-10 mt-3 block">Please Login!!</h1>
      <form onSubmit={submitHandler} >
        <input type="email" placeholder='Email' className="w-full border border-red-400 p-1 rounded outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="w-full border border-red-400 p-1 mt-5 rounded outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex items-center gap-5">
          <button type="submit" className="px-5 py-1 bg-gray-700 text-gray-100 my-5">Submit</button>
          <Link href="/signup" className="text-red-400 underline" >Create a new accout? Signup</Link>
        </div>
      </form>
    </div>
  )
}
