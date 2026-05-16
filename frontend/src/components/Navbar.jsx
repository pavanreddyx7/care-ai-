import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useUser } from '../App'

const patientLinks = [
  { to: '/dashboard', label: 'Health', icon: '🩺' },
  { to: '/chat', label: 'AI Chat', icon: '💬' },
  { to: '/vision', label: 'Vision', icon: '📷' },
  { to: '/diet', label: 'Diet', icon: '🥗' },
  { to: '/safety', label: 'Safety', icon: '💊' },
  { to: '/doctors', label: 'Doctors', icon: '👨‍⚕️' },
  { to: '/hospitals', label: 'Hospitals', icon: '🏥' },
  { to: '/locate', label: 'Nearby', icon: '📍' },
  { to: '/history', label: 'History', icon: '📋' },
  { to: '/profile', label: 'Profile', icon: '👤' },
]

const doctorLinks = [
  { to: '/doctor-dashboard', label: 'Dashboard', icon: '🏥' },
]

const hospitalLinks = [
  { to: '/hospital-dashboard', label: 'Dashboard', icon: '🏥' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { role } = useUser()

  async function logout() {
    await signOut(auth)
    localStorage.removeItem('careai_role')
    navigate('/')
  }

  const links = role === 'doctor' ? doctorLinks : role === 'hospital' ? hospitalLinks : patientLinks
  const home = role === 'doctor' ? '/doctor-dashboard' : role === 'hospital' ? '/hospital-dashboard' : '/dashboard'

  return (
    <>
      {/* ── Desktop top navbar ── */}
      <nav className="hidden md:block bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to={home} className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent shrink-0">
            Care AI
          </Link>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${pathname === l.to ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>
                <span>{l.icon}</span> {l.label}
              </Link>
            ))}
            <button onClick={logout}
              className="ml-2 text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition shrink-0">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile top bar (logo + logout only) ── */}
      <nav className="md:hidden bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 flex items-center justify-between h-14">
          <Link to={home} className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Care AI
          </Link>
          <button onClick={logout} className="text-sm text-red-500 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
            Logout
          </button>
        </div>
      </nav>

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex overflow-x-auto scrollbar-hide safe-bottom">
        {links.map(l => (
          <Link key={l.to} to={l.to}
            className={`flex flex-col items-center justify-center pt-2 pb-3 px-3 min-w-[64px] flex-shrink-0 transition-colors ${pathname === l.to ? 'text-blue-600' : 'text-slate-400'}`}>
            <span className={`text-2xl leading-none ${pathname === l.to ? 'scale-110' : ''} transition-transform`}>{l.icon}</span>
            <span className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${pathname === l.to ? 'text-blue-600' : 'text-slate-400'}`}>{l.label}</span>
            {pathname === l.to && <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 rounded-full" />}
          </Link>
        ))}
      </div>
    </>
  )
}
