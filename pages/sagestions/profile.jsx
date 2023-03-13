import { data } from 'autoprefixer'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function Profile() {
  const {data : session} = useSession()
  const {push, asPath} = useRouter()
  const singOutHandler = async () => {
    await signOut({redirect : false})
    push(`/auth/signin?callbackUrl=${asPath}`)
  }
 
  return (
    <div className="flex items-center justify-between">
       {session && (
        <>
         <div className="flex items-center gap-2">
            <img src={session.user.image} alt="profile" className="w-10 h-10 rounded-full border p-1 object-cover" />
            <div>
                <h1 className="text-lg font-medium">{session.user.name}</h1>
                <p className="text-sm">{session.user.email}</p>
            </div>
        </div>
        <button className="text-orange-400" onClick={singOutHandler}>Switch</button>
        </>
       )}
    </div>
  )
}
