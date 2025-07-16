import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously, onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Sign in anonymously
export const signInAnon = async (): Promise<User | null> => {
  try {
    const result = await signInAnonymously(auth)
    return result.user
  } catch (error) {
    console.error("Error signing in anonymously:", error)
    return null
  }
}

// Sign out
export const signOut = async (): Promise<boolean> => {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (error) {
    console.error("Error signing out:", error)
    return false
  }
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Listen for auth state changes
export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback)
}
