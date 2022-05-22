import { useRouter } from "next/router"

export default function Header({
  img = "/noImage.jpg",
  userID = "noUser",
  page = "",
}) {
  const router = useRouter()

  const ToProfile = () => {
    router.push(`user/${userID}`)
  }
  return (
    <>
      <header>
        <div className="left">
          <h2>{page}</h2>
        </div>
        <div className="right">
          <div onClick={ToProfile} className="fotoImg">
            <img alt="Foto de usuario" src={img} />
          </div>
        </div>
      </header>
      <style jsx>
        {`
          img {
            width: 100%;
            border-radius: 99px;
          }
          header {
            backdrop-filter: blur(10px);
            background-color: #ffffffdd;

            display: flex;

            align-items: center;
            width: 100%;
            border-bottom: 1px solid #eee;
            height: 49px;
            position: sticky;
            padding: 5px 10px;
            top: 0;
            justify-content: space-between;
          }

          h2 {
            font-size: 21px;
            font-weight: 700;
          }
          .fotoImg {
            width: 30px;
            height: 30px;
            background-color: #09f;
            border-radius: 99px;
          }
        `}
      </style>
    </>
  )
}
