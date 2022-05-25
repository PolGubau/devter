import { colors, fontSizes } from "src/styles/theme"
import { Heart } from "@c/Icons/Heart"

export default function MessageEmpty() {
  return (
    <>
      <article>
        <div className="firstPart">
          <div className="avatar">
            <div className="imageSpace"></div>
          </div>
          <section>
            <header>
              <div className="names">
                <strong className="userNameTitle"></strong>
                <p className="userNameAt">@</p>
              </div>
              <div className="derecha_colummn">
                <p className="linkToMessage">
                  <time>cccc</time>
                </p>

                <p className="deleteButton">X</p>
              </div>
            </header>
            <div className="content">
              <p className="contentText"></p>
            </div>

            <div className="likesBox">
              <div className="likesCont">
                <p>
                  <Heart fill={"#ccc"} stroke={"#ccc"} size={25} />
                </p>
                <p className="numberInter"></p>
              </div>
              <div className="sharesCont">
                <p>
                  <Heart fill={"#ccc"} stroke={"#ccc"} size={25} />
                </p>
                <p className="numberInter">eee</p>
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
        .userNameTitle {
          background: #aaa;
          width: 130px;
          border-radius: 99px;
          height: 30px;
        }
        .userNameAt {
          padding: 0 5px;
          background: #bbb;
          width: 80px;
          border-radius: 99px;
          height: 30px;
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
          background: #bbb;
          width: 40px;
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
          background: #ccc;
          width: 90%;
          height: 70px;
          margin: 10px 0;
          border-radius: 15px;
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
