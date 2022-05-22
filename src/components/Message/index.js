import Avatar from "src/components/Avatar"
import { useRouter } from "next/router"
import useTimeAgo from "@h/useTimeAgo"
import { deleteMessage } from "firebase/client"
import { colors, fontSizes } from "src/styles/theme"
import { Heart } from "@c/Icons/Heart"
import { Share } from "@c/Icons/Share"
import Link from "next/link"
import useUser from "@h/useUser"

export default function Message({
  createdAt,
  userId,
  id,
  userName,
  avatar,
  likesCount,
  sharedCount,
  content,
  img,
}) {
  const user = useUser()
  const routerCreator = useRouter()
  const routerMessage = useRouter()
  const handleClick = () => {
    if (user) routerCreator.push(`/creator/${userId}`)
  }

  const timeAgo = useTimeAgo(createdAt)
  const handleDelete = (id) => {
    deleteMessage(id)
  }
  const handleArticleClick = (e) => {
    e.preventDefault()
    routerMessage.push(`/status/[id]`, `/status/${id}`)
  }

  const newLike = () => {
    likesCount = likesCount + 1
  }
  const newShare = () => {
    sharedCount += 1
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div className="firstPart">
          <div onClick={handleClick} className="avatar">
            <Avatar src={avatar} alt={userName} />
          </div>
          <section>
            <header>
              <div className="names">
                <strong onClick={handleClick}>{userName}</strong>
                <p onClick={handleClick}>@{userName}</p>
              </div>
              <div className="derecha_colummn">
                <Link href={`/status/[id]`} as={`/status/${id}`}>
                  <a className="linkToMessage">
                    <time>{timeAgo}</time>
                  </a>
                </Link>

                <p onClick={handleDelete} className="deleteButton">
                  X
                </p>
              </div>
            </header>
            <div className="content">
              <p className="contentText">{content}</p>
            </div>
            {img && (
              <div>
                <img className="imagen" src={img} />
              </div>
            )}
            <div className="likesBox">
              <div onClick={newLike} className="likesCont">
                <p>
                  <Heart fill="white" stroke="#000" size={25} />
                </p>
                <p className="numberInter">{likesCount}</p>
              </div>
              <div onClick={newShare} className="sharesCont">
                <p>
                  <Share fill="white" stroke="#000" size={30} />
                </p>
                <p className="numberInter">{sharedCount}</p>
              </div>
            </div>
          </section>
        </div>
      </article>
      <style jsx>{`
        article {
          border-bottom: solid #ccc 2px;
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
        }
        article:hover {
          background-color: #f5f8fa;
          cursor: pointer;
        }
        header {
          display: flex;
          justify-content: space-between;
        }
        .avatar {
          padding-right: 10px;
          cursor: pointer;
        }
        .content {
          margin-bottom: 10px;
          width: 100%;
        }
        .firstPart {
          display: flex;
        }
        .imagen {
          width: 100%;
          border-radius: 10px;
        }
        .names {
          display: flex;
          cursor: pointer;
          font-size: ${fontSizes.subheader};
        }
        .names p {
          margin-left: 10px;
        }
        section {
          width: 100%;
          margin-right: 10px;
        }
        p {
          margin: 0;
          line-height: 1.3;
        }
        .derecha_colummn {
          display: flex;
          flex-direction: row;
        }
        .likesBox {
          display: flex;
          align-items: center;
        }
        .likesCont,
        .sharesCont {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          padding-right: 10px;
          align-content: center;
          align-items: center;
          justify-content: flex-end;
        }
        .numberInter {
          margin: 0 5px;
        }

        .deleteButton {
          cursor: pointer;
          background: ${colors.secondary};
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border-radius: 99px;
          margin-left: 10px;
          font-size: 0.9em;
        }
        .contentText {
          font-size: ${fontSizes.text};
        }
        .linkToMessage {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        .linkToMessage:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
