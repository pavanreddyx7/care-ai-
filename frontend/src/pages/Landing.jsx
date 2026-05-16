import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Landing() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '', role: 'patient' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  function field(key) {
    return e => setForm({ ...form, [key]: e.target.value })
  }

  async function submit() {
    setLoading(true); setMsg('')
    try {
      if (mode === 'login') {
        const cred = await signInWithEmailAndPassword(auth, form.email, form.password)
        const snap = await getDoc(doc(db, 'users', cred.user.uid))
        const role = snap.exists() ? (snap.data().role || 'patient') : 'patient'
        localStorage.setItem('careai_role', role)
      } else {
        if (!form.name.trim()) { setMsg('Please enter your name.'); setLoading(false); return }
        localStorage.setItem('careai_role', form.role) // cache before auth fires
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: form.name, email: form.email, phone: form.phone,
          role: form.role, age: '', gender: '', bloodGroup: '', allergies: '',
          createdAt: new Date().toISOString()
        })
        if (form.role === 'doctor') {
          await setDoc(doc(db, 'doctors', cred.user.uid), {
            userId: cred.user.uid, name: form.name, email: form.email,
            phone: form.phone, specialty: '', hospital: '', bio: '',
            fees: 500, rating: 4.5, experience: 1,
            slots: ['Mon 09:00', 'Mon 14:00', 'Tue 09:00', 'Tue 14:00',
                    'Wed 09:00', 'Thu 09:00', 'Thu 14:00', 'Fri 09:00'],
            createdAt: new Date().toISOString()
          })
        }
        if (form.role === 'hospital') {
          await setDoc(doc(db, 'hospitals', cred.user.uid), {
            userId: cred.user.uid, name: form.name, email: form.email,
            phone: form.phone, address: '', city: '', specialties: [],
            createdAt: new Date().toISOString()
          })
        }
      }
    } catch (e) {
      const raw = e.message || ''
      if (raw.includes('email-already-in-use')) setMsg('Email already registered. Please login.')
      else if (raw.includes('wrong-password') || raw.includes('invalid-credential')) setMsg('Invalid email or password.')
      else if (raw.includes('weak-password')) setMsg('Password must be at least 6 characters.')
      else if (raw.includes('invalid-email')) setMsg('Invalid email address.')
      else setMsg('Error: ' + raw.replace('Firebase: ', '').split(' (')[0])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="aurora-blob blob-1" />
      <div className="aurora-blob blob-2" />
      <div className="aurora-blob blob-3" />

      <div className="glass rounded-2xl p-8 w-full max-w-md mx-4 z-10 text-center shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Care AI
        </h1>
        <p className="text-slate-400 mb-8">Your Intelligent Health Assistant</p>

        <div className="space-y-4">
          {mode === 'register' && (
            <input type="text" placeholder="Full Name" value={form.name} onChange={field('name')}
              className="w-full bg-slate-900/50 text-white border border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-500 placeholder:text-slate-500" />
          )}

          <input type="email" placeholder="Email Address" value={form.email} onChange={field('email')}
            className="w-full bg-slate-900/50 text-white border border-slate-700 p-4 rounded-xl outline-none focus:border-blue-500 placeholder:text-slate-500" />

          {mode === 'register' && (
            <input type="tel" placeholder="Phone Number (+91XXXXXXXXXX)" value={form.phone} onChange={field('phone')}
              className="w-full bg-slate-900/50 text-white border border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-500 placeholder:text-slate-500" />
          )}

          <input type="password" placeholder="Password" value={form.password} onChange={field('password')}
            onKeyDown={e => e.key === 'Enter' && submit()}
            className="w-full bg-slate-900/50 text-white border border-slate-700 p-4 rounded-xl outline-none focus:border-blue-500 placeholder:text-slate-500" />

          {mode === 'register' && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'patient', label: '🙋 Patient', active: 'border-blue-500 bg-blue-500/20 text-blue-300' },
                { role: 'doctor', label: '👨‍⚕️ Doctor', active: 'border-emerald-500 bg-emerald-500/20 text-emerald-300' },
                { role: 'hospital', label: '🏥 Hospital', active: 'border-purple-500 bg-purple-500/20 text-purple-300' },
              ].map(({ role, label, active }) => (
                <button key={role} onClick={() => setForm({ ...form, role })}
                  className={`py-3 rounded-xl font-bold text-sm transition border-2 ${form.role === role ? active : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {msg && (
          <p className={`mt-3 text-sm font-medium ${msg.includes('successfully') || msg.includes('created') ? 'text-emerald-400' : 'text-red-400'}`}>
            {msg}
          </p>
        )}

        <button onClick={submit} disabled={loading}
          className={`w-full mt-6 py-4 rounded-xl font-bold text-lg text-white transition ${mode === 'login' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'} disabled:opacity-60`}>
          {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-slate-400 text-sm">{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</p>
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMsg('') }}
            className="text-blue-400 font-semibold hover:text-blue-300 transition mt-2">
            {mode === 'login' ? 'Create Account' : 'Back to Login'}
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 w-full glass border-t border-slate-700/30 py-3 z-20">
        <p className="text-xs text-center text-slate-400">⚠️ Care AI is an assistive tool. Always consult a qualified doctor.</p>
      </div>
    </div>
  )
}
