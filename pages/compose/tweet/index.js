import AppLayout from "@c/AppLayout"
import Button from "@c/Button"
import useUser from "hooks/useUser"
import { useRouter } from "next/router"

export default function ComposeTweet() {
  useUser()

  function pageBack() {
    const router = useRouter()
    router.replace("/home")
  }

  return (
    <AppLayout>
      <form>
        <button onClick={pageBack}>Return</button>
        <textarea placeholder="¿Qué está pasando?"></textarea>
        <div>
          <Button>Publicar</Button>
        </div>
      </form>

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
