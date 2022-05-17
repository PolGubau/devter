import AppLayout from "src/components/AppLayout"
import Head from "next/Head"
import FormTweet from "@c/FormTweet"
import { useRouter } from "next/router"

export default function ComposeTweet() {
  const router = useRouter()

  function pageBack() {
    router.replace("/home")
  }
  return (
    <>
      <AppLayout>
        <Head>
          <title>Message / Capella </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button className="buttonBack" onClick={pageBack}>
          {" "}
          🔙 Return
        </button>

        <FormTweet />
      </AppLayout>

      <style jsx>{`
        .buttonBack {
          padding: 6px 10px;
          border-radius: 100px;
          background: #ccc;
          border: 0;
        }
      `}</style>
    </>
  )
}
