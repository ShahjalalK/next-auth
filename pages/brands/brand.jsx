import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { GoFileMedia } from 'react-icons/go'
import { db, storage } from '@/firebaseconfig'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function Brand() {
  const { data: session } = useSession()

  const [photo, setPhoto] = useState(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if(!photo || !description){
      return
    }

    setLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      name: session.user.name,
      profileImg: session.user.image,
      description,
      timeStamp: serverTimestamp()

    })
    console.log(docRef.id)

    const imgRef = ref(storage, `posts/${docRef.id}/image`)
    uploadBytes(imgRef, photo).then(() => {
      getDownloadURL(imgRef).then((item) => {
        updateDoc(doc(db, "posts", docRef.id), {
          images: item
        })
      })
    })

    setPhoto(null)
    setDescription("")

    setLoading(false)

  }

  return (
    <div className="px-5 my-5" >
      <form className="border p-3 my-5" onSubmit={submitHandler}>

        <div className="flex flex-col items-center justify-center ">
          {photo ?
            (
              <label htmlFor="postImg" className="cursor-pointer">
                <img src={photo ? URL.createObjectURL(photo) : ""} alt="" className="w-full" />
              </label>
            )
            :
            (
              <label htmlFor="postImg" className="border border-red-200 p-3 shadow rounded-full cursor-pointer">
                <GoFileMedia className="text-2xl text-red-400 " />
              </label>
            )

          }

          <input id='postImg' type="file" accept='image/*' hidden onChange={(e) => setPhoto(e.target.files[0])} />
        </div>

        <textarea name="" id="" cols="30" rows="1" placeholder={`What's on your mind, ${session?.user.name}`} className="border rounded p-1 focus:border-red-200 transition ease-in-out outline-none w-full my-3" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <div className="text-right">
          <button className="px-5 py-1 bg-red-400 text-gray-100 rounded disabled:bg-red-300" disabled={loading}>{loading ? "Uploading..." : "Upload Post"} </button>
        </div>
      </form>
    </div>
  )
}
