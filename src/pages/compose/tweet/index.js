import AppLayout from "src/components/AppLayout"
import Button from "src/components/Button"
import useUser from "src/hooks/useUser"
import { useRouter } from "next/router"
import { useState } from "react"
import { addMsgToDB, uploadImage } from "firebase/client.js"
import Head from "next/Head"
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
}
const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const router = useRouter()

  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [imgURL, setImgURL] = useState(null)

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

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()

    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()

    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]
    uploadImage(file).then((location) => {
      console.log("guardando path en front" + location)
      setImgURL(location)
    })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <Head>
          <title>Message / Capella </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button onClick={pageBack}> 🔙 Return</button>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué está pasando?"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          {imgURL && <img src={imgURL} />}
          <div>
            <Button disabled={isButtonDisabled}>Publicar</Button>
          </div>
        </form>
      </AppLayout>

      <style jsx>{`
        form {
          margin: 20px 20px;
          padding: 10px;
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
          min-height: 15vh;
          font-size: 21px;
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent;"};
          padding: 5px;
          resize: none;
          border-radius: 10px;
        }
        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
