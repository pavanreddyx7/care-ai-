import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Vision from './pages/Vision'
import History from './pages/History'
import Diet from './pages/Diet'
import Safety from './pages/Safety'
import Maps from './pages/Maps'
import UserProfile from './pages/UserProfile'
import DoctorDirectory from './pages/DoctorDirectory'
import DoctorProfile from './pages/DoctorProfile'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorChat from './pages/DoctorChat'
import HospitalDashboard from './pages/HospitalDashboard'
import Hospitals from './pages/Hospitals'

export const UserContext = createContext({ user: null, role: 'patient' })
export const useUser = () => useContext(UserContext)

function homeFor(role) {
  if (role === 'doctor') return '/doctor-dashboard'
  if (role === 'hospital') return '/hospital-dashboard'
  return '/dashboard'
}

function Private({ user, children }) {
  if (!user) return <Navigate to="/" />
  return (
    <>
      <Navbar />
      <div className="pb-24 md:pb-10">{children}</div>
    </>
  )
}

export default function App() {
  const [user, setUser] = useState(undefined)
  const [role, setRole] = useState(undefined)

  useEffect(() => {
    return onAuthStateChanged(auth, async u => {
      setUser(u)
      if (u) {
        // Use cached role first so redirect is instant
        const cached = localStorage.getItem('careai_role')
        if (cached) setRole(cached)
        // Then verify from Firestore (handles role changes or fresh login)
        try {
          const snap = await getDoc(doc(db, 'users', u.uid))
          const dbRole = snap.exists() ? (snap.data().role || 'patient') : (cached || 'patient')
          setRole(dbRole)
          localStorage.setItem('careai_role', dbRole)
        } catch {
          setRole(cached || 'patient')
        }
      } else {
        setRole(null)
        localStorage.removeItem('careai_role')
      }
    })
  }, [])

  // Wait for both auth and role to resolve
  if (user === undefined || (user !== null && role === undefined))
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-blue-400 text-lg font-semibold animate-pulse">Care AI loading...</div>
      </div>
    )

  const home = homeFor(role)
  const P = ({ children }) => <Private user={user}>{children}</Private>

  return (
    <UserContext.Provider value={{ user, role }}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to={home} /> : <Landing />} />
          <Route path="/dashboard" element={<P><Home /></P>} />
          <Route path="/chat" element={<P><Chat /></P>} />
          <Route path="/vision" element={<P><Vision /></P>} />
          <Route path="/history" element={<P><History /></P>} />
          <Route path="/diet" element={<P><Diet /></P>} />
          <Route path="/safety" element={<P><Safety /></P>} />
          <Route path="/locate" element={<P><Maps /></P>} />
          <Route path="/profile" element={<P><UserProfile /></P>} />
          <Route path="/doctors" element={<P><DoctorDirectory /></P>} />
          <Route path="/doctors/:id" element={<P><DoctorProfile /></P>} />
          <Route path="/hospitals" element={<P><Hospitals /></P>} />
          <Route path="/doctor-dashboard" element={<P><DoctorDashboard /></P>} />
          <Route path="/doctor-chat/:chatId" element={<P><DoctorChat /></P>} />
          <Route path="/hospital-dashboard" element={<P><HospitalDashboard /></P>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}
