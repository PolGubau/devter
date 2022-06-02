import Message from "@c/Message"
import MessageEmpty from "@c/MessageEmpty"

export default function NoMessages() {
  return (
    <>
      <Message
        key="-1"
        id="-1"
        createdAt="165135135"
        avatar="loading.gif"
        userName="Pol sin red"
        content="Estás sin conexión :("
        userId="-1"
        likesCount="404"
        sharedCount="404"
        clickable={false}
      />

      <section>
        <MessageEmpty opacity={1} />
        <MessageEmpty opacity={0.9} />
        <MessageEmpty opacity={0.8} />
        <MessageEmpty opacity={0.7} />
        <MessageEmpty opacity={0.6} />
      </section>

      <style jsx>{``}</style>
    </>
  )
}
