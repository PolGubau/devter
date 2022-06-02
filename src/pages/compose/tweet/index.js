import Head from "next/Head"
import FormTweet from "@c/FormTweet"
import { useRouter } from "next/router"
import DownBar from "@c/DownBar"
import Header from "@c/Header"
import { colors, fontSizes } from "src/styles/theme"
import { addOpacityToColor } from "src/styles/utils"
import useUser from "@h/useUser"
import useInternet from "@h/useInternet"

export default function ComposeTweet() {
  const user = useUser()
  const internet = useInternet([])
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Message / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        page="Escribe un mensaje"
        img={internet && user ? user.avatar : "/noImage.jpg"}
        userID={user ? user.userID : "noUser"}
      />
      <section>
        <button className="buttonBack" onClick={() => router.push("/home")}>
          🔙 Volver
        </button>

        <FormTweet name={user ? user.username : "🤔"} />
      </section>

      <DownBar />

      <style jsx>{`
        .buttonBack {
          padding: 6px 15px;
          border-radius: 100px;
          background: #ccc;
          border: 0;
          cursor: pointer;
          font-size: ${fontSizes.text};
          transition: 0.1s ease-in padding;
        }
        .buttonBack:hover {
          background-color: ${addOpacityToColor(colors.secondary, 0.5)};
        }
        section {
          width: 100%;
          padding: 10px;
          min-height: calc(100% - 49px - 49px);
        }
      `}</style>
    </>
  )
}
