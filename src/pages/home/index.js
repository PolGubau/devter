import { useEffect, useState } from "react"

import Message from "src/components/Message"
import useUser from "src/hooks/useUser"
import { fetchLatestMessages } from "firebase/client"
import Head from "next/head"

import DownBar from "@c/DownBar"
import Header from "@c/Header"

export default function HomePage() {
  // const messages = getMessages
  const user = useUser()
  console.log(user)

  const [timeline, setTimeline] = useState([])
  useEffect(() => {
    user && fetchLatestMessages().then(setTimeline)
  }, [user])
  // const [internet, setInternet] = useState(false)
  // if (timeline.length === 0) setInternet(true)
  return (
    <>
      <Head>
        <title>Home / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        img={user ? user.avatar : "noImage.jpg"}
        userID={user ? user.userID : "noUser"}
      />
      <section>
        {timeline.map(
          ({
            createdAt,
            userId,
            id,
            userName,
            avatar,
            content,
            likesCount,
            sharedCount,
            img,
          }) => {
            return (
              <Message
                key={id}
                id={id}
                createdAt={createdAt}
                avatar={avatar}
                img={img}
                userName={userName}
                content={content}
                userId={userId}
                likesCount={likesCount}
                sharedCount={sharedCount}
              />
            )
          }
        )}
        {/* {!internet && (
            <Message
              key="-1"
              id="-1"
              createdAt="165135135"
              avatar="loading.gif"
              userName="Pol sin red"
              content="Estás sin conexión :("
              userId="-1"
              likesCount="404"
              sharedCount="404"
            />
          )} */}
      </section>

      <DownBar />

      <style jsx>{`
        section {
          width: 100%;
          min-height: calc(100% - 49px - 49px);
        }
      `}</style>
    </>
  )
}
