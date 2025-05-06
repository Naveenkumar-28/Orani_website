"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [userSaved, setUserSaved] = useState(false);
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    const isUserAction = async () => {
      if (!user || userSaved) return;

      try {
        if (user && isSignedIn) {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-user`, {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            image: user.imageUrl,
          })

          if (res.data.success) {
            console.log(res.data);
            setUserSaved(true);
          }
        }
      } catch (error) {
        console.log((error as Error)?.message)
      }
    }

    isUserAction()
  }, [user, isSignedIn]);

  useEffect(() => {
    return router.replace('/Pages')
  }, [])

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-b-3 border-r-2 bg-green rounded-full size-15"></div>
    </div>
  )

}
