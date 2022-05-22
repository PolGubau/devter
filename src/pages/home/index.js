import { useEffect, useState } from "react"

import Message from "src/components/Message"
import useUser from "src/hooks/useUser"
import { listenLatestMessages } from "firebase/client"
import Head from "next/Head"

import DownBar from "@c/DownBar"
import Header from "@c/Header"

export default function HomePage() {
  const user = useUser()

  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    if (user) {
      listenLatestMessages((messages) => {
        console.log("listened", messages)
        setTimeline(messages)
      })
    }
  }, [user])

  const [internet, setInternet] = useState(true)
  if (timeline === 0) setInternet(false)

  return (
    <>
      <Head>
        <title>Home / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        page="Inicio"
        img={user ? user.avatar : "/noImage.jpg"}
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
        {!internet && (
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
        )}
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
