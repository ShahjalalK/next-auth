import Github from 'next-auth/providers/github'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function Home() {
  const { data: session } = useSession()
  const {push, asPath} = useRouter()

  const singOutHandler = async () => {
   const data =  await signOut({redirect : false, callbackUrl : "/"})
   push(data.url)
  }
  const signinHandler = async () => {
    push(`/auth/signin`)
   
  }
  return (
    <div>
      {session ? (
        <div className="flex flex-col space-y-5 max-w-xl p-3 mx-auto">
          <h1 className="text-5xl">You are signin</h1>
          <div>
          <img src={session?.user.image} alt="" className="w-14 h-14 rounded-full border p-1" />
          <p>{session?.user.email}</p> 
          </div>        
          <button className="px-5 py-1 bg-gray-600 text-gray-100" onClick={singOutHandler}>Sign out</button>
        </div>
      ) : (
        <div className="flex flex-col space-y-5 max-w-xl p-3 mx-auto">
          <h1 className="text-5xl">You are not signin</h1>
          <button className="px-5 py-1 bg-gray-600 text-gray-100" onClick={signinHandler}>Sign in</button>
        </div>
      )}
    </div>
  )
}
