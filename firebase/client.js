// import { doc, setDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  Timestamp,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore"
import {
  getAuth,
  signInWithRedirect,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"

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

export const addMsgToDB = async ({ avatar, content, userId, userName }) => {
  const newMessage = await addDoc(collection(db, "messages"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
  console.log("Document written with ID: ", newMessage.id)
}

export const fetchLatestMessages = async () => {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    return { ...data, id, createdAt: +createdAt.toDate() }
  })
}

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

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log("Upload is " + progress + "% done")
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused")
          break
        case "running":
          console.log("Upload is running")

          break
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log("User doesn't have permission to access the object")
          break
        case "storage/canceled":
          console.log("User canceled the upload")
          break
        case "storage/unknown":
          console.log("Unknown error occurred")
          break
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL)
        return downloadURL
      })
    }
  )
}
