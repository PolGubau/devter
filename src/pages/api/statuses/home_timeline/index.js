const timeline = [
  {
    id: 1,
    avatar:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*",
    username: "Pol Gubau",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 2,
    avatar:
      "https://i.pinimg.com/474x/e0/4e/5e/e04e5e11a1ef0eadad61a7ccbda1cb5a--timeline-photos-cute-puppies.jpg",
    username: "Pol Gubau 2",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 3,
    avatar:
      "https://i.pinimg.com/474x/70/98/6a/70986a3c5b44fda5052e3a879dec4fc3.jpg",
    username: "Pol Gubau 3",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 4,
    avatar:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*",
    username: "Pol Gubau",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 5,
    avatar:
      "https://i.pinimg.com/474x/e0/4e/5e/e04e5e11a1ef0eadad61a7ccbda1cb5a--timeline-photos-cute-puppies.jpg",
    username: "Pol Gubau 2",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 6,
    avatar:
      "https://i.pinimg.com/474x/70/98/6a/70986a3c5b44fda5052e3a879dec4fc3.jpg",
    username: "Pol Gubau 3",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 7,
    avatar:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*",
    username: "Pol Gubau",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 8,
    avatar:
      "https://i.pinimg.com/474x/e0/4e/5e/e04e5e11a1ef0eadad61a7ccbda1cb5a--timeline-photos-cute-puppies.jpg",
    username: "Pol Gubau 2",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 9,
    avatar:
      "https://i.pinimg.com/474x/70/98/6a/70986a3c5b44fda5052e3a879dec4fc3.jpg",
    username: "Pol Gubau 3",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 10,
    avatar:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*",
    username: "Pol Gubau",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 11,
    avatar:
      "https://i.pinimg.com/474x/e0/4e/5e/e04e5e11a1ef0eadad61a7ccbda1cb5a--timeline-photos-cute-puppies.jpg",
    username: "Pol Gubau 2",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
  {
    id: 12,
    avatar:
      "https://i.pinimg.com/474x/70/98/6a/70986a3c5b44fda5052e3a879dec4fc3.jpg",
    username: "Pol Gubau 3",
    message:
      "Este será un mensaje para ser publicado en un twitter pero de animales cutes",
  },
]

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(timeline))
}
