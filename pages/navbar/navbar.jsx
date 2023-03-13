import Link from 'next/link'
import React from 'react'
import { FiSend } from 'react-icons/fi'
import { AiOutlinePlusSquare, AiOutlineLogin } from 'react-icons/ai'
import NavBtn from './navbtn'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { data: session, status } = useSession()
  const { push, asPath } = useRouter()
  const navbarItem = [
    {
      Icon: FiSend,
      Text: "Message"
    }
  ]

  const signInHandler = () => {
    push(`/auth/signin?callbackUrl=${asPath}`)
  }

  return (
    <div className="bg-red-400 py-2">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl uppercase text-gray-50">Instagram</Link>

        {session ? (
          <div className="flex items-center gap-5">
            {navbarItem.map((item, index) => {
              return (
                <NavBtn key={index} Icon={item.Icon} Text={item.Text} />
              )
            })}
            <div>
              <Link href="/">
                <img src={session?.user.image} alt="" className="w-12 h-12 rounded-full border border-red-300 p-1 object-cover" />

              </Link>
            </div>

          </div>
        )

          :
          (
            <div>
              <button className="flex items-center gap-1 text-gray-100" onClick={signInHandler}>
                <AiOutlineLogin className="text-xl text-gray-50"  />
                <p className="text-lg font-medium">Login</p>
              </button>
            </div>
          )

        }






      </div>
    </div>

  )

}
