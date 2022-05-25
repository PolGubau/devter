import Message from "@c/Message"

export default function AllMessages({ timeline }) {
  return (
    <>
      {timeline.map(
        ({
          createdAt,
          userID,
          id,
          userName,
          avatar,
          content,
          likesCount,
          sharedCount,
          img,
        }) => {
          return (
            <Message
              key={id}
              id={id}
              createdAt={createdAt}
              avatar={avatar}
              img={img}
              userName={userName}
              content={content}
              userId={userID}
              likesCount={likesCount}
              sharedCount={sharedCount}
            />
          )
        }
      )}
    </>
  )
}
