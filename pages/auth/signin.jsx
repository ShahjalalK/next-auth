import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {AiFillGithub, AiFillTwitterCircle, AiFillGoogleCircle} from 'react-icons/ai'
import React, { useState } from 'react'
import Github from 'next-auth/providers/github'

export default function Signin() {
    const {data : session, status} = useSession()
    const {push} = useRouter()
    const [email, setEmail] = useState('')
   
    
    if(status === "loading"){
        return <h1 className="text-5xl">Chaking Authentication....</h1>
    }
    if(session){
        setTimeout(() => {
            push("/")
        }, 500)
        return <h1 className="text-5xl">You are alrady signin</h1>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email) return false
      signIn('email', {redirect : false})
        setEmail("")
    }
    const handleAuthSignin  = (provider) => signIn(provider)

  return (
    <div className="max-w-sm mx-auto my-5 border p-3">
        <form className="mb-5" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="p-1 border rounded outline-none w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="w-full bg-gray-400 p-1 rounded text-gray-50 my-2">Login</button>
        </form>
        <div className="flex flex-col items-center space-y-4">
            <button className="flex items-center justify-center gap-1 rounded font-medium bg-gray-200 p-2 w-full text-center capitalize" onClick={() => handleAuthSignin('github')}>
            <AiFillGithub className="text-2xl" />
            Signin with Github
            </button>
            <button className="flex items-center justify-center gap-1 rounded font-medium bg-gray-200 p-2 w-full text-center capitalize">
            <AiFillTwitterCircle className="text-2xl" />
            Signin with Twitter
            </button>
            <button className="flex items-center justify-center gap-1 rounded font-medium bg-gray-200 p-2 w-full text-center capitalize" onClick={() => handleAuthSignin('google')}>
            <AiFillGoogleCircle className="text-2xl" />
            Signin with Google
            </button>
        </div>
    </div>
  )
}
