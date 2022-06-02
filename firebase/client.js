// import { doc, setDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
  limit,
} from "firebase/firestore"
import {
  getAuth,
  signInWithRedirect,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDHXsJKV_umLHJYY9aWNPex8JpZYKaLkus",
  authDomain: "capella-9980a.firebaseapp.com",
  projectId: "capella-9980a",
  storageBucket: "capella-9980a.appspot.com",
  messagingSenderId: "4541769488",
  appId: "1:4541769488:web:659e1a54d8fdddc0ce2795",
  measurementId: "G-GMH555NSTJ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

const auth = getAuth()

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

const gitHubProvider = new GithubAuthProvider()
gitHubProvider.addScope("repo")

export const loginWithGitHub = () => {
  signInWithRedirect(auth, gitHubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(user, token)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GithubAuthProvider.credentialFromError(error)

      console.log(error, errorCode, errorMessage, email, credential)
    })
}
export const loginWithGoogle = () => {
  const GoogleProvider = new GoogleAuthProvider()
  auth.languageCode = "es"
  signInWithPopup(auth, GoogleProvider).catch((error) => {
    console.log(error)
  })
}

export const addMsgToDB = async ({
  avatar,
  content,
  userId,
  userName,
  img,
}) => {
  const newMessage = await addDoc(collection(db, "messages"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
    img,
  })
  console.log("Document written with ID: ", newMessage.id)
}
export const listenLatestMessages = (callback, loading = true) => {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc"),
    limit(20)
  )

  onSnapshot(q, (querySnapshot) => {
    const messages = []
    querySnapshot.forEach((doc) => {
      messages.push(doc.data())
    })
    loading = false

    callback(messages, loading)
  })
}
// export const fetchLatestMessages = async () => {
//   const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
//   const querySnapshot = await getDocs(q)

//   return querySnapshot.docs.map((doc) => {
//     const data = doc.data()
//     const id = doc.id
//     const { createdAt } = data

//     return { ...data, id, createdAt: +createdAt.toDate() }
//   })
// }

export const uploadImage = (file) => {
  const storage = getStorage()

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  }

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  return uploadTask
}

export const deleteMessage = async (idMessage) => {
  console.log(idMessage)
  await deleteDoc(doc(db, "messages", idMessage))
}
