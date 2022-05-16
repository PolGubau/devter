import Avatar from "src/components/Avatar"
import { useRouter } from "next/router"
import useTimeAgo from "@h/useTimeAgo"

export default function Message({
  createdAt,
  userId,
  id,
  userName,
  avatar,
  content,
}) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/creator/${userId}`)
  }

  const timeAgo = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div onClick={handleClick} className="avatar">
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <div className="names">
              <strong onClick={handleClick}>{userName}</strong>
              <p onClick={handleClick}>@name</p>
            </div>
            <p>{timeAgo}</p>
          </header>
          <div className="content">
            <p>{content}</p>
          </div>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: solid #ccc 2px;
          display: flex;
          padding: 10px 15px;
        }
        header {
          display: flex;
          justify-content: space-between;
        }
        .avatar {
          padding-right: 10px;
        }
        .content {
          width: 100%;
        }
        .names {
          display: flex;
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
      `}</style>
    </>
  )
}
