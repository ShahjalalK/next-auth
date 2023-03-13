import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {GrGithub} from 'react-icons/gr'

export default function Signin() {
  const {data : session} = useSession()
  const {push} = useRouter()
const sigInHandler = async (provider) => {
  await signIn(provider)
}
if(session){
  push("/")
}
  return (
    <div className="max-w-lg mx-auto border p-5 my-5 flex flex-col space-y-3">
        <button className="w-full bg-gray-300 text-gray-600 font-medium p-2  border rounded flex items-center justify-center gap-1" onClick={() => sigInHandler('google')} > <FcGoogle className="text-2xl"/> Login with Google</button>
        <button className="w-full bg-gray-300 text-gray-600 font-medium p-2  border rounded flex items-center justify-center gap-1" onClick={() => sigInHandler('github')}> <GrGithub className="text-2xl" /> Login with Github</button>
    </div>
  )
}
