import Avatar from "src/components/Avatar"
import { useRouter } from "next/router"
import useTimeAgo from "@h/useTimeAgo"
import { deleteMessage } from "firebase/client"
import { colors, fontSizes } from "src/styles/theme"
import { Heart } from "@c/Icons/Heart"
import { Share } from "@c/Icons/Share"

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
  console.log(img)
  const router = useRouter()
  const handleClick = () => {
    router.push(`/creator/${userId}`)
  }

  const timeAgo = useTimeAgo(createdAt)
  const handleDelete = (id) => {
    deleteMessage(id)
  }

  return (
    <>
      <article key={id}>
        <div>
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
                <time>{timeAgo}</time>
                <p onClick={handleDelete} className="deleteButton">
                  X
                </p>
              </div>
            </header>
            <div className="content">
              <p className="contentText">{content}</p>
            </div>
            <div className="likesBox">
              <div className="likesCont">
                <p>
                  <Heart fill="white" stroke="#000" size={25} />{" "}
                </p>
                <p className="numberInter">{likesCount}</p>
              </div>
              <div className="likesCont">
                <p>
                  <Share fill="white" stroke="#000" size={30} />
                </p>
                <p className="numberInter">{sharedCount}</p>
              </div>
            </div>
          </section>
        </div>
        {img && <img className="imagen" src={img} />}
      </article>
      <style jsx>{`
        article {
          border-bottom: solid #ccc 2px;
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
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
          width: 100%;
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
        .likesCont {
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
      `}</style>
    </>
  )
}
