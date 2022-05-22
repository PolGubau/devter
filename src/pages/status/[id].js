import Message from "@c/Message"
import Link from "next/link"
import { PATH } from "src/services/consts"

export default function MessagePage(props) {
  // La props id es la que le enviamos con el getInitialProps
  return (
    <>
      <Link href="/home">
        <a>Volver </a>
      </Link>
      <Message {...props} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params
  // id es el nombre del archivo
  const apiResponse = await fetch(`${PATH}/api/singleMessage/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "pages/Error" }).end()
  }
}
