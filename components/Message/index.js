import Avatar from "@c/Avatar"

export default function Message({ id, avatar, username, message }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <p>{username}</p>
          <p>{message}</p>
        </section>
      </article>

      <style jsx>{`
        article {
            border-bottom: solid #eee 2px
          display: flex;
          padding: 10px 15px;
        }
        div {
          padding-right: 10px;
        }
        p {
          margin: 0;
          line-height: 1.3;
        }
      `}</style>
    </>
  )
}
