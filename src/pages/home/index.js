import { useEffect, useState } from "react"

import useUser from "src/hooks/useUser"
import { listenLatestMessages } from "firebase/client"
import Head from "next/Head"

import DownBar from "@c/DownBar"
import Header from "@c/Header"
import { LOADING_STATE } from "src/services/consts"
import AllMessages from "@c/Feed/AllMessages"
import NoMessages from "@c/Feed/NoMessages"
import useInternet from "@h/useInternet"

export default function HomePage() {
  const user = useUser()

  const [timeline, setTimeline] = useState([])
  const internet = useInternet([])

  const [stateMessages, setStateMessages] = useState(LOADING_STATE.NOT_GOT_IT)
  const loading = true
  useEffect(() => {
    let unsuscribe
    setStateMessages(LOADING_STATE.LOADING)
    if (user) {
      // El argumento que da listen... es el mismo que le queremos pasar a setTimeline
      unsuscribe = listenLatestMessages(setTimeline, loading)
      if (timeline.length !== 0) {
        // Si recibe datos de firebase
        setStateMessages(LOADING_STATE.GOT_IT)
      } else {
        setStateMessages(LOADING_STATE.NOT_GOT_IT)
      }
    }
    return () => unsuscribe && unsuscribe()
  }, [user])

  console.log(timeline)

  return (
    <>
      <Head>
        <title>Home / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        page="Inicio"
        img={internet && user ? user.avatar : "./noImage.jpg"}
        userID={user ? user.userID : "noUser"}
      />
      <section>
        {stateMessages === LOADING_STATE.GOT_IT && (
          <AllMessages timeline={timeline} />
        )}
        {stateMessages === LOADING_STATE.NOT_GOT_IT && <NoMessages />}
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
