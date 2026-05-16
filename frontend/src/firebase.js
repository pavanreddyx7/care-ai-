import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVKE7d_xJnA9VprjA6T7smlvH8jO_Y02A",
  authDomain: "care-ai-ssibm.firebaseapp.com",
  projectId: "care-ai-ssibm",
  storageBucket: "care-ai-ssibm.firebasestorage.app",
  messagingSenderId: "34282148707",
  appId: "1:34282148707:web:d317b29a228f47c0fef956"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
