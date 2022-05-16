import AppLayout from "@c/AppLayout"
import Message from "@c/Message"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

export default function HomePage() {
  const user = useUser()

  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
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
          {timeline.map((message) => {
            return (
              <Message
                key={message.id}
                id={message.id}
                avatar={message.avatar}
                username={message.username}
                message={message.message}
              />
            )
          })}
        </section>

        {/* BOTTOM NAV */}
        <nav>Options and buttons</nav>
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
