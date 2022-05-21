import Head from "next/Head"
import FormTweet from "@c/FormTweet"
import { useRouter } from "next/router"
import DownBar from "@c/DownBar"
import Header from "@c/Header"
import { colors, fontSizes } from "src/styles/theme"
import { addOpacityToColor } from "src/styles/utils"

export default function ComposeTweet() {
  const router = useRouter()

  function pageBack() {
    router.replace("/home")
  }
  return (
    <>
      <Head>
        <title>Message / Capella </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <button className="buttonBack" onClick={pageBack}>
          🔙 Return
        </button>

        <FormTweet />
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
