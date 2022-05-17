import Link from "next/link"
import Create from "@c/Icons/Create"
import HomeIcon from "@c/Icons/HomeIcon"
import Search from "@c/Icons/Search"
import { colors } from "src/styles/theme"

export default function DownBar() {
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <HomeIcon stroke="#09f" width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search stroke="#09f" width={32} height={32} />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create stroke="#09f" width={32} height={32} />
          </a>
        </Link>
      </nav>

      <style jsx>{`
      nav {
          border-top: 1px solid #eee;
          width: 100%;
          background-color: #ffffffbb;
          backdrop-filter: blur(5px);#fff;
          position: sticky;
          height: 49px;
          display: flex;
          bottom: 0;
        }
        nav a {
            align-items: center;
            display: flex;
            flex:1 1 auto;
            height: 100%; 
            justify-content: center;
        }
        nav a:hover{
            background:radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px; background-position:center;
        }
        nav a:hover > :global(svg){
            stroke: ${colors.primary}
        }
        
            `}</style>
    </>
  )
}
