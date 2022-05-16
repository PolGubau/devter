import AppLayout from "src/components/AppLayout"
import Button from "src/components/Button"
import useUser from "src/hooks/useUser"
import { useRouter } from "next/router"
import { useState } from "react"
import { addMsgToDB } from "firebase/client.js"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const router = useRouter()

  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")

  function pageBack() {
    router.replace("/home")
  }
  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }
  const handleSubmit = (e) => {
    console.log("Trying to send messages")
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addMsgToDB({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <AppLayout>
      <button onClick={pageBack}> 🔙 Return</button>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué está pasando?"
          value={message}
          onChange={handleChange}
        ></textarea>
        <div>
          <Button disabled={isButtonDisabled}>Publicar</Button>
        </div>
      </form>

      <style jsx>{`
        form {
          margin: 20px 20px;
        }
        button {
          padding: 6px 10px;
          border-radius: 100px;
          background: #ccc;
          border: 0;
        }
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
