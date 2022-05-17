import { useEffect, useState } from "react"
import AppLayout from "src/components/AppLayout"
import Message from "src/components/Message"
import useUser from "src/hooks/useUser"
import { fetchLatestMessages } from "firebase/client"
import Head from "next/head"

import DownBar from "@c/DownBar"

export default function HomePage() {
  const user = useUser()
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    user && fetchLatestMessages().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Home / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>

        <section>
          {console.log(timeline)}
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
            }) => {
              return (
                <Message
                  key={id}
                  id={id}
                  createdAt={createdAt}
                  avatar={avatar}
                  userName={userName}
                  content={content}
                  userId={userId}
                  likesCount={likesCount}
                  sharedCount={sharedCount}
                />
              )
            }
          )}
        </section>

        <DownBar />
      </AppLayout>

      <style jsx>{`
        header {
          background-color: #ffffffbb;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #eee;
          height: 49px;
          position: sticky;
          padding: 5px 10px;
          top: 0;
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
        }
        section {
          width: 100%;
          min-height: calc(100% - 49px - 49px);
        }
      `}</style>
    </>
  )
}
