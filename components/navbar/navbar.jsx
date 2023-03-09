import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className=" bg-red-400 shadow">
      <nav className="container flex items-center justify-between py-2 font-bold uppercase">
      <h1 className="text-red-900 text-3xl">Logo</h1>
      <div className="text-lg flex items-center gap-4 font-medium capitalize text-white">
        <Link href="/" >Home</Link>        
        <Link href="/login" >Login</Link>
        <Link href="/signup" >Signup</Link>
      </div>
      </nav>
    </div>
  )
}
