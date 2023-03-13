import { db } from '@/firebaseconfig'
import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import FeedItem from './feeditem'

export default function Feed() {
  const [post, setPost] = useState([])

 const collectionRef = collection(db, "posts")
 const queryPost = query(collectionRef, orderBy("timeStamp", "desc"))

 
  useEffect( async () => {
    
    await onSnapshot(queryPost, (snapShot) => {
      setPost(snapShot.docs.map((item) => {
        return{...item.data(), id : item.id}
      }))
    })
    
  }, [])
  return (
    <div className="my-5">
      {post.map((item) => {
        return(
          <div key={item.id}>
            <FeedItem item={item} />       
          </div>
        )
      })}
        
        </div>
  )
}
