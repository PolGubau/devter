import { addMsgToDB, uploadImage } from "firebase/client.js"
import { getDownloadURL } from "firebase/storage"
import Loading from "@c/Icons/Loading"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Button from "src/components/Button"
import useUser from "src/hooks/useUser"
import { MAX_CHARACTERS } from "src/services/consts"

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

export default function FormTweet({ name = "Anonymous" }) {
  const router = useRouter()

  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")

  const [remainChar, setRemainChar] = useState(MAX_CHARACTERS)
  const [progress, setProgress] = useState(0)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [imgURL, setImgURL] = useState(null)
  const [task, setTask] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        const progress = Math.ceil(
          (task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100
        )
        setProgress(progress)

        setStatus(DRAG_IMAGE_STATE.UPLOADING)
      }
      const onError = () => {
        console.log("error on upload")
        setStatus(DRAG_IMAGE_STATE.ERROR)
      }
      const onComplete = () => {
        setStatus(DRAG_IMAGE_STATE.COMPLETE)

        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          const path = downloadURL
          setImgURL(path)
        })
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
    setRemainChar(MAX_CHARACTERS - value.length)
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
      img: imgURL,
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

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    !message.length || status === COMPOSE_STATES.LOADING || remainChar < 0

  // MaxText

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={`¿Qué está pasando ?`}
          value={message}
          onChange={handleChange}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></textarea>
        {status === DRAG_IMAGE_STATE.UPLOADING && (
          <>
            <Loading /> <p>Loading: {progress} %</p>
          </>
        )}
        {imgURL && (
          <section>
            <button className="deleteImage" onClick={() => setImgURL(null)}>
              X
            </button>
            <img className="uploadedFoto" src={imgURL} />
          </section>
        )}
        {progress !== 100 && <div className="loadingLine"></div>}

        <div className="buttonPublicar">
          <Button disabled={isButtonDisabled}>Publicar como {name}</Button>
        </div>
        {remainChar > 0 && <p>Puedes escribir aún {remainChar} carácteres.</p>}
        {remainChar === 0 && <p>Has clavado los carácteres, wow.</p>}
        {remainChar < 0 && <p>Te has pasado por {-remainChar} carácteres.</p>}
      </form>

      <style jsx>{`
        form {
          margin: 20px 20px;
          padding: 10px;
        }
        section {
          position: relative;
        }
        .deleteImage {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.3);
          border: 0;
          border-radius: 100%;
          width: 50px;
          height: 50px;
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
        .uploadedFoto {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          border: 1px solid #ccc;
        }
        .loadingLine {
          height: 3px;
          background-color: #09f;
          width: ${progress + "%"};
          margin: 0;
          padding: 0;
        }
        .buttonPublicar {
          padding: 15px;
          display: flex;
          flex-direction: row;
        }
        .buttonPublicar p {
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}
