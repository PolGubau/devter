import * as React from "react"

const Loading = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "0 0",
      display: "block",
      shapeRendering: "auto",
    }}
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      fill="none"
      stroke="#93dbe9"
      strokeWidth={8}
      strokeDasharray="174.48047119140625 82.10845703125"
      d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
      strokeLinecap="round"
      style={{
        transform: "scale(.8)",
        transformOrigin: "50px 50px",
      }}
    >
      <animate
        attributeName="stroke-dashoffset"
        repeatCount="indefinite"
        dur="1.7543859649122806s"
        keyTimes="0;1"
        values="0;256.58892822265625"
      />
    </path>
  </svg>
)

export default Loading
