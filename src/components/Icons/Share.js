import React from "react"

export const Share = ({
  fill = "currentColor",
  size = "40",
  stroke = "#000",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    stroke={stroke}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.8 10.3085C25.8 9.04248 27.3162 8.39262 28.233 9.26572L42.1847 22.5524C43.4124 23.7216 43.3695 25.6932 42.092 26.8079L28.1867 38.9414C27.2552 39.7542 25.8 39.0926 25.8 37.8564V32.3581C25.8 32.3581 10.8695 29.6685 6.08025 38.4593C5.63374 39.2789 3.89328 39.5657 4.24706 35.4764C5.72648 27.9499 8.75001 16.1999 25.8 16.1999V10.3085Z"
      fill={fill}
    />
  </svg>
)
