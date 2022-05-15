import AppLayout from "@c/AppLayout"
import Button from "@c/Button"
import { useRouter } from "next/router"

export default function ComposeTweet() {
  const router = useRouter()

  function pageBack() {
    router.replace("/home")
  }
  return (
    <AppLayout>
      <button onClick={pageBack}>Return</button>
      <textarea placeholder="¿Qué está pasando?"></textarea>
      <div>
        <Button>Capellar</Button>
      </div>

      <style jsx>{`
        textarea {
          outline: 0;
          width: 100%;
          font-size: 21px;
          border: 0;
          padding: 15px;
          resize: none;
        }
        div {
          padding: 15px;
        }
      `}</style>
    </AppLayout>
  )
}
