import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, getDocs, query, where, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
}

const SPECIALTIES = ['General Physician', 'Cardiologist', 'Dermatologist', 'Orthopedic',
  'Neurologist', 'Gynecologist', 'Pediatrician', 'ENT Specialist',
  'Ophthalmologist', 'Dentist', 'Psychiatrist', 'Physiotherapist']

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SLOT_TIMES = [
  '09:00','09:20','09:40','10:00','10:20','10:40',
  '11:00','11:20','11:40','12:00',
  '14:00','14:20','14:40','15:00','15:20',
  '15:40','16:00','16:20','16:40','17:00'
]

const TABS = ['My Profile', 'Appointments', 'Chats']

export default function DoctorDashboard() {
  const [tab, setTab] = useState('My Profile')
  const uid = auth.currentUser?.uid

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🏥 Doctor Dashboard</h2>
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      {tab === 'My Profile' && <DoctorProfileTab uid={uid} />}
      {tab === 'Appointments' && <DoctorAppointmentsTab uid={uid} />}
      {tab === 'Chats' && <DoctorChatsTab uid={uid} />}
    </div>
  )
}

const DCLS = "w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"

function DField({ label, value, onChange, type = 'text', opts, rows }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">{label}</label>
      {opts
        ? <select value={value} onChange={onChange} className={DCLS}>{opts.map(o => <option key={o}>{o}</option>)}</select>
        : rows
          ? <textarea rows={rows} value={value} onChange={onChange} className={DCLS + ' resize-none'} />
          : <input type={type} value={value} onChange={onChange} className={DCLS} />}
    </div>
  )
}

function DoctorProfileTab({ uid }) {
  const [form, setForm] = useState({
    name: '', specialty: 'General Physician', hospital: '', bio: '',
    fees: 500, experience: 1, phone: '', slots: []
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeDay, setActiveDay] = useState('Mon')

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'doctors', uid)).then(snap => {
      if (snap.exists()) setForm(f => ({ ...f, ...snap.data() }))
    })
  }, [uid])

  async function save() {
    setSaving(true)
    await setDoc(doc(db, 'doctors', uid), { ...form, userId: uid }, { merge: true })
    await setDoc(doc(db, 'users', uid), { name: form.name, phone: form.phone, role: 'doctor' }, { merge: true })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleSlot(time) {
    const s = `${activeDay} ${time}`
    const slots = form.slots || []
    setForm(f => ({
      ...f,
      slots: slots.includes(s) ? slots.filter(x => x !== s) : [...slots, s]
    }))
  }

  function toggleDay(day) {
    const daySlots = SLOT_TIMES.map(t => `${day} ${t}`)
    const slots = form.slots || []
    const allOn = daySlots.every(s => slots.includes(s))
    setForm(f => ({
      ...f,
      slots: allOn
        ? slots.filter(s => !s.startsWith(day + ' '))
        : [...slots.filter(s => !s.startsWith(day + ' ')), ...daySlots]
    }))
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const num = (key, val) => setForm(f => ({ ...f, [key]: Number(val) }))
  const slots = form.slots || []
  const dayCount = day => slots.filter(s => s.startsWith(day + ' ')).length

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <DField label="Full Name" value={form.name || ''} onChange={e => set('name', e.target.value)} />
        <DField label="Phone" value={form.phone || ''} onChange={e => set('phone', e.target.value)} type="tel" />
        <DField label="Specialty" value={form.specialty || ''} onChange={e => set('specialty', e.target.value)} opts={SPECIALTIES} />
        <DField label="Hospital / Clinic" value={form.hospital || ''} onChange={e => set('hospital', e.target.value)} />
        <DField label="Consultation Fees (₹)" value={form.fees || ''} onChange={e => num('fees', e.target.value)} type="number" />
        <DField label="Experience (years)" value={form.experience || ''} onChange={e => num('experience', e.target.value)} type="number" />
        <div className="md:col-span-2">
          <DField label="About / Bio" value={form.bio || ''} onChange={e => set('bio', e.target.value)} rows={3} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Available Slots <span className="text-slate-400 font-normal normal-case">(20 min each · max 20/day)</span></p>
          <span className="text-xs text-slate-400">{slots.length} slots total</span>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {DAYS.map(d => (
            <button key={d} onClick={() => setActiveDay(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition relative ${activeDay === d ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {d}
              {dayCount(d) > 0 && (
                <span className={`ml-1.5 text-xs font-bold ${activeDay === d ? 'text-blue-200' : 'text-blue-500'}`}>
                  {dayCount(d)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-slate-500 font-medium">{activeDay} — click to toggle slots</p>
          <button onClick={() => toggleDay(activeDay)}
            className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition">
            {SLOT_TIMES.every(t => slots.includes(`${activeDay} ${t}`)) ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {SLOT_TIMES.map(t => {
            const s = `${activeDay} ${t}`
            const on = slots.includes(s)
            return (
              <button key={t} onClick={() => toggleSlot(t)}
                className={`py-2 rounded-lg text-xs font-semibold transition border ${on
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'}`}>
                {t}
              </button>
            )
          })}
        </div>

        {slots.filter(s => s.startsWith(activeDay + ' ')).length === 0 && (
          <p className="text-xs text-slate-400 mt-2">No slots selected for {activeDay}.</p>
        )}
      </div>

      <button onClick={save} disabled={saving}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
        {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Profile'}
      </button>
    </div>
  )
}

function DoctorAppointmentsTab({ uid }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [doctorName, setDoctorName] = useState('')
  const [updating, setUpdating] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async (name) => {
    setLoading(true); setError('')
    try {
      const snap = await getDocs(query(collection(db, 'appointments'), where('doctorName', '==', 'Dr. ' + name)))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.appointmentDate || '').localeCompare(a.appointmentDate || ''))
      setAppointments(list)
    } catch (e) {
      console.error('Load appointments:', e)
      setError(e.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'doctors', uid)).then(async snap => {
      const name = snap.exists() ? snap.data().name : ''
      setDoctorName(name)
      if (name) await load(name)
      else setLoading(false)
    }).catch(() => setLoading(false))
  }, [uid, load])

  async function updateStatus(id, status) {
    setUpdating(id)
    try {
      await updateDoc(doc(db, 'appointments', id), { status })
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    } catch {}
    setUpdating(null)
  }

  const counts = {
    pending: appointments.filter(a => a.status === 'Pending').length,
    confirmed: appointments.filter(a => a.status === 'Confirmed').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
  }

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading...</div>

  if (error) return (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      <p className="text-red-500 font-medium mb-2">⚠️ {error}</p>
      <p className="text-xs text-slate-400 mb-3">Check Firestore rules — appointments need <code>allow read: if request.auth != null</code></p>
      <button onClick={() => load(doctorName)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">Retry</button>
    </div>
  )

  if (!doctorName) return (
    <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">
      <p className="text-2xl mb-2">⚠️</p>
      <p>Please save your profile name first to see appointments.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Pending', count: counts.pending, color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
          { label: 'Confirmed', count: counts.confirmed, color: 'bg-green-50 border-green-200 text-green-700' },
          { label: 'Completed', count: counts.completed, color: 'bg-blue-50 border-blue-200 text-blue-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-3 text-center ${s.color}`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">📅 Patient Appointments</h3>
          <button onClick={() => load(doctorName)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition">
            ↻ Refresh
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p>No appointments yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-bold text-slate-800">{a.patientName || 'Patient'}</p>
                    <p className="text-sm text-slate-500">{fmtDate(a.appointmentDate)}</p>
                    {a.reason && <p className="text-xs text-slate-400 mt-0.5 italic">"{a.reason}"</p>}
                    {a.patientPhone && <p className="text-xs text-slate-400 mt-0.5">📞 {a.patientPhone}</p>}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold shrink-0 ${
                    a.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    a.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                    a.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {a.status || 'Pending'}
                  </span>
                </div>
                {a.status !== 'Completed' && a.status !== 'Cancelled' && (
                  <div className="flex gap-2">
                    {a.status !== 'Confirmed' && (
                      <button onClick={() => updateStatus(a.id, 'Confirmed')} disabled={updating === a.id}
                        className="flex-1 text-xs py-2 rounded-lg font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition disabled:opacity-50">
                        ✓ Confirm
                      </button>
                    )}
                    <button onClick={() => updateStatus(a.id, 'Completed')} disabled={updating === a.id}
                      className="flex-1 text-xs py-2 rounded-lg font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition disabled:opacity-50">
                      ✔ Complete
                    </button>
                    <button onClick={() => updateStatus(a.id, 'Cancelled')} disabled={updating === a.id}
                      className="flex-1 text-xs py-2 rounded-lg font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50">
                      ✕ Cancel
                    </button>
                  </div>
                )}
                {(a.status === 'Cancelled' || a.status === 'Completed') && (
                  <button onClick={() => updateStatus(a.id, 'Confirmed')} disabled={updating === a.id}
                    className="w-full text-xs py-2 rounded-lg font-semibold bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition disabled:opacity-50">
                    ↩ Restore
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DoctorChatsTab({ uid }) {
  const navigate = useNavigate()
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!uid) return
    const q = query(collection(db, 'chats'), where('doctorUserId', '==', uid))
    const unsub = onSnapshot(q, snap => {
      setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [uid])

  useEffect(() => {
    if (!activeChat) { setMessages([]); return }
    const q = query(collection(db, 'chats', activeChat.id, 'messages'), orderBy('timestamp'))
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [activeChat])

  async function send() {
    if (!text.trim() || !activeChat) return
    setSending(true)
    const msg = text.trim()
    setText('')
    await addDoc(collection(db, 'chats', activeChat.id, 'messages'), { text: msg, senderId: uid, timestamp: serverTimestamp() })
    await setDoc(doc(db, 'chats', activeChat.id), { lastMessage: msg }, { merge: true })
    setSending(false)
  }

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading...</div>

  if (activeChat) {
    return (
      <div className="bg-white rounded-2xl shadow flex flex-col" style={{ height: 'min(70vh, calc(100vh - 220px))' }}>
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <button onClick={() => setActiveChat(null)}
            className="text-slate-400 hover:text-slate-600 transition text-lg font-bold">←</button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
            {(activeChat.patientName || 'P')[0].toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">{activeChat.patientName || 'Patient'}</p>
            <p className="text-xs text-slate-400">Patient</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <p className="text-center text-slate-400 text-sm mt-10">No messages yet. Say hello!</p>
          )}
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.senderId === uid ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${m.senderId === uid
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-slate-100 text-slate-800 rounded-bl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100 flex gap-2">
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          <button onClick={send} disabled={sending || !text.trim()}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-bold text-slate-800 mb-4">💬 Patient Chats</h3>
      {chats.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-4xl mb-3">💬</p>
          <p>No chats yet. Patients can start a chat from your profile.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {chats.map(c => (
            <div key={c.id} onClick={() => setActiveChat(c)}
              className="rounded-xl border border-slate-100 p-4 cursor-pointer hover:bg-slate-50 flex items-center gap-3 transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shrink-0">
                {(c.patientName || 'P')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800">{c.patientName || 'Patient'}</p>
                <p className="text-xs text-slate-500 truncate">{c.lastMessage || 'No messages yet'}</p>
              </div>
              <span className="text-blue-500 text-sm shrink-0">Open →</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
