import AppLayout from "@c/AppLayout"
import Message from "@c/Message"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

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
        <nav></nav>
      </AppLayout>

      {/* Styles */}
      <style jsx>{`
        header {
          background-color: #fff;
          display: flex;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #ccc;
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
          padding-top: 49px;
          width: 100%;
          min-height: calc(100% - 49px - 49px);
        }
        nav {
          border-top: 1px solid #ccc;
          width: 100%;
          background-color: #fff;
          position: sticky;
          height: 49px;
          bottom: 0;
        }
      `}</style>
    </>
  )
}
