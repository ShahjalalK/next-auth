import { db } from '@/firebaseconfig'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'

export default function Test() {
    const queryRef = collection(db, "posts")
   const timeStampQuerys = query(queryRef, orderBy("timeStamp", "desc"))
  
   useEffect(() => {
    onSnapshot(timeStampQuerys, (snaps) => {
        console.log(snaps.docs.map((item) => {
            return(item.data())
        }))
   })
   }, [])
  return (
    <div>Test</div>
  )
}
