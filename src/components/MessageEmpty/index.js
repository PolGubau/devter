import { fontSizes } from "src/styles/theme"
import { Heart } from "@c/Icons/Heart"

export default function MessageEmpty({ opacity }) {
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
                  <time>timetime</time>
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
                  <Heart fill="#ccc" stroke="#ccc" size={25} />
                </p>
                <p className="numberInter"></p>
              </div>
              <div className="sharesCont">
                <p>
                  <Heart fill="#ccc" stroke="#ccc" size={25} />
                </p>
                <p className="numberInter"></p>
              </div>
            </div>
          </section>
        </div>
      </article>
      <style jsx>{`
        * {
          opacity: ${opacity};
        }
        article {
          border-bottom: solid #bbe 2px;
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
        .imageSpace {
          width: 50px;
          height: 50px;
          background: #bbe;
          border-radius: 15px;
        }
        .userNameTitle {
          background: #bbe;
          width: 130px;
          border-radius: 99px;
          height: 30px;
        }
        .userNameAt {
          color: white;
          padding: 0 5px;
          background: #cce;
          width: 80px;
          border-radius: 99px;
          height: 30px;
        }
        .avatar {
          padding-right: 10px;
          cursor: pointer;
        }
        time {
          color: transparent;
          width: 60px;
          height: 15px;
          background-color: #bbe;
          border-radius: 10px;
        }
        .content {
          margin-bottom: 10px;
          width: 100%;
        }
        .firstPart {
          display: flex;
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
          background: #cce;
          width: 40px;
          margin: 0 5px;
          border-radius: 15px;
          height: 20px;
        }

        .deleteButton {
          cursor: pointer;
          background-color: #99e;
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
          background: #cce;
          width: 90%;
          height: 70px;
          margin: 10px 0;
          border-radius: 15px;
        }
      `}</style>
    </>
  )
}
