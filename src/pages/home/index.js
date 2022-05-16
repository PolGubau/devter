import Button from "@c/Button"
import { useEffect, useState } from "react"
import AppLayout from "src/components/AppLayout"
import Message from "src/components/Message"
import useUser from "src/hooks/useUser"
import { useRouter } from "next/router"
import { fetchLatestMessages } from "firebase/client"

export default function HomePage() {
  const user = useUser()
  const router = useRouter()
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    user && fetchLatestMessages().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        {/* UP HEADER */}
        <header>
          <h2>Inicio</h2>
        </header>

        {/* TIMELINE */}
        <section>
          {timeline.map(
            ({ createdAt, userId, id, userName, avatar, content }) => {
              return (
                <Message
                  key={id}
                  id={id}
                  createdAt={createdAt}
                  avatar={avatar}
                  userName={userName}
                  content={content}
                  userId={userId}
                />
              )
            }
          )}
        </section>

        {/* BOTTOM NAV */}
        <nav>
          <Button onClick={() => router.push("/compose/tweet")}>Escribe</Button>
        </nav>
      </AppLayout>

      {/* Styles */}
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
        nav {
          border-top: 1px solid #eee;
          width: 100%;
          background-color: #ffffffbb;
          backdrop-filter: blur(5px);#fff;
          position: sticky;
          height: 49px;
          bottom: 0;
        }
      `}</style>
    </>
  )
}
