import React, { useEffect, useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { useSession } from 'next-auth/react'
import { db } from '@/firebaseconfig'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { FiChevronDown } from 'react-icons/fi'

import Moment from 'react-moment'
import 'moment-timezone'


export default function FeedItem({ item }) {
    const { data: session } = useSession()
    const [sendComment, setSendComment] = useState("")
    const [comments, setComments] = useState([])

    console.log(comments)

    const commentRef = collection(db, "posts", item.id, "comments")
    const commentQyery = query(commentRef, orderBy("timeStamp", "desc"))

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!sendComment) return

        addDoc(commentRef, {
            comment: sendComment,
            userName: session.user.name,
            userImage: session.user.image,
            timeStamp: serverTimestamp()
        })

        setSendComment("")
    }

    useEffect(() => {


        onSnapshot(commentQyery, (snapshot) => {
            setComments(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }))
        })

    }, [])

    return (
        <div className="border p-2 my-5">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {item.profileImg && (
                        <img src={item.profileImg} alt="profile" className="w-10 h-10 rounded-full border p-1 " />
                    )}
                    <div className="flex flex-col space-y-0">
                        <h5 className="text-lg font-medium">{item.name}</h5>
                    </div>
                </div>
                <button className="text-2xl"><FiMoreHorizontal /></button>
            </div>
            <div>
                <img src={item.images} alt="post" className="w-full p-1" />
            </div>
            <div className="p-1 mb-3">
                {session && (
                    <button className="text-2xl text-red-400"><AiOutlineHeart /></button>
                )}
                <div className="text-sm font-medium">0 Likes</div>
            </div>

            <div className="flex flex-col gap-1 text-sm p-1">
                <h3 className="font-medium">{item.name}-</h3>
                <p>{item.description}</p>
            </div>
            {comments.length > 0 && <div>
                <h3 className="flex items-center text-gray-400 space-x-1 text-sm font-medium mt-3 cursor-pointer">View all {comments.length} comments <FiChevronDown /></h3>
            </div>}


            {comments.length > 0 && (
                <div className="h-16 overflow-y-auto w-full my-3">

                    {comments.map((item) => {
                        return (

                            <div className={`flex justify-between ${item.comment.length > 100 && "flex-col"} items-start mt-1`}>
                                <div className={`flex ${item.comment.length > 100 && "flex-col"}  gap-1`}>
                                    <img src={item.userImage} alt="" className="w-8 h-8 rounded-full border p-1 object-cover" title={item.userName} />
                                    <h3 className="text-sm">{item.comment}</h3>
                                </div>
                                <div>
                                    <Moment fromNow className="text-xs font-medium">{item.timeStamp?.toDate()}</Moment>
                                </div>
                            </div>

                        )
                    })}


                </div>
            )}
            {session && (
                <div className="my-3 p-1">
                    <form className="w-full flex items-center gap-1 " onSubmit={submitHandler}>
                        <label htmlFor="comment"><GrEmoji className="text-2xl" /></label>
                        <input id='comment' type="text" className="w-full outline-none p-1 border-b" placeholder="Add a comments..." value={sendComment} onChange={(e) => setSendComment(e.target.value)} />
                        <button className="text-orange-400 font-medium">Post</button>
                    </form>
                </div>
            )}

        </div>
    )
}
