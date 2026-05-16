import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
}

const TABS = ['Profile', 'Reminders', 'Appointments', 'Saved Diets']

export default function UserProfile() {
  const [tab, setTab] = useState('Profile')
  const uid = auth.currentUser?.uid

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">👤 My Account</h2>
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'Profile' && <ProfileTab uid={uid} />}
      {tab === 'Reminders' && <RemindersTab uid={uid} />}
      {tab === 'Appointments' && <AppointmentsTab uid={uid} />}
      {tab === 'Saved Diets' && <SavedDietsTab uid={uid} />}
    </div>
  )
}

const FIELD_CLS = "w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"

function Field({ label, value, onChange, type = 'text', opts, rows }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">{label}</label>
      {opts
        ? <select value={value} onChange={onChange} className={FIELD_CLS}>{opts.map(o => <option key={o}>{o}</option>)}</select>
        : rows
          ? <textarea rows={rows} value={value} onChange={onChange} className={FIELD_CLS + ' resize-none'} />
          : <input type={type} value={value} onChange={onChange} className={FIELD_CLS} />}
    </div>
  )
}

function ProfileTab({ uid }) {
  const [form, setForm] = useState({
    name: '', phone: '', age: '', gender: 'Male',
    bloodGroup: '', weight: '', height: '', allergies: ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid))
      .then(snap => { if (snap.exists()) setForm(f => ({ ...f, ...snap.data() })) })
      .finally(() => setLoading(false))
  }, [uid])

  async function save() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'users', uid), form, { merge: true })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
    setSaving(false)
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading...</div>

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {(form.name || auth.currentUser?.email || 'U')[0].toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-lg">{form.name || 'Your Name'}</p>
          <p className="text-slate-500 text-sm">{auth.currentUser?.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full Name" value={form.name || ''} onChange={e => set('name', e.target.value)} />
        <Field label="Phone" value={form.phone || ''} onChange={e => set('phone', e.target.value)} type="tel" />
        <Field label="Age" value={form.age || ''} onChange={e => set('age', e.target.value)} type="number" />
        <Field label="Gender" value={form.gender || 'Male'} onChange={e => set('gender', e.target.value)} opts={['Male', 'Female', 'Other']} />
        <Field label="Blood Group" value={form.bloodGroup || ''} onChange={e => set('bloodGroup', e.target.value)} opts={['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} />
        <Field label="Weight (kg)" value={form.weight || ''} onChange={e => set('weight', e.target.value)} type="number" />
        <Field label="Height (cm)" value={form.height || ''} onChange={e => set('height', e.target.value)} type="number" />
        <div className="md:col-span-2">
          <Field label="Allergies / Medical Notes" value={form.allergies || ''} onChange={e => set('allergies', e.target.value)} rows={3} />
        </div>
      </div>

      {form.weight && form.height && (
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase">BMI</p>
            <p className="font-bold text-slate-800 text-lg">
              {(form.weight / ((form.height / 100) ** 2)).toFixed(1)}
              <span className="text-sm font-normal text-slate-500 ml-2">
                {(() => {
                  const bmi = form.weight / ((form.height / 100) ** 2)
                  if (bmi < 18.5) return '— Underweight'
                  if (bmi < 25) return '— Normal'
                  if (bmi < 30) return '— Overweight'
                  return '— Obese'
                })()}
              </span>
            </p>
          </div>
        </div>
      )}

      <button onClick={save} disabled={saving}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
        {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Profile'}
      </button>
    </div>
  )
}

function RemindersTab({ uid }) {
  const [reminders, setReminders] = useState([])
  const [form, setForm] = useState({ medicine: '', phone: '', times: ['08:00'] })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchReminders = useCallback(async () => {
    if (!uid) return
    try {
      const snap = await getDocs(query(collection(db, 'reminders'), where('userId', '==', uid)))
      setReminders(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {}
  }, [uid])

  useEffect(() => { fetchReminders() }, [fetchReminders])

  function addTime() { setForm(f => ({ ...f, times: [...f.times, '08:00'] })) }
  function setTime(i, val) { const t = [...form.times]; t[i] = val; setForm(f => ({ ...f, times: t })) }
  function removeTime(i) { setForm(f => ({ ...f, times: f.times.filter((_, j) => j !== i) })) }

  async function addReminder() {
    if (!form.medicine.trim()) return setMsg('Enter medicine name.')
    if (!form.phone.trim()) return setMsg('Enter your phone number.')
    setLoading(true); setMsg('')
    try {
      await addDoc(collection(db, 'reminders'), {
        userId: uid, medicine: form.medicine, times: form.times, phone: form.phone, active: true
      })
      setForm({ medicine: '', phone: '', times: ['08:00'] })
      await fetchReminders()
      setMsg('✅ Reminder added!')
    } catch { setMsg('Failed to add reminder.') }
    setLoading(false)
    setTimeout(() => setMsg(''), 2000)
  }

  async function toggleReminder(id, current) {
    try {
      await updateDoc(doc(db, 'reminders', id), { active: !current })
      setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !current } : r))
    } catch {}
  }

  async function deleteReminder(id) {
    if (!confirm('Delete this reminder?')) return
    try {
      await deleteDoc(doc(db, 'reminders', id))
      setReminders(prev => prev.filter(r => r.id !== id))
    } catch {}
  }

  async function testReminder(id) {
    setMsg('Sending test...')
    try {
      await axios.post(`/api/reminders/${id}/test`)
      setMsg('✅ Test SMS & call sent!')
    } catch { setMsg('Test failed — check Twilio config.') }
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-bold text-slate-800 mb-4">💊 Add Medicine Reminder</h3>
        <div className="space-y-3">
          <input placeholder="Medicine / Tablet name" value={form.medicine}
            onChange={e => setForm(f => ({ ...f, medicine: e.target.value }))}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
          <input placeholder="Phone number (+91XXXXXXXXXX)" value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />

          <div>
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Reminder Times</p>
            <div className="flex flex-wrap gap-2">
              {form.times.map((t, i) => (
                <div key={i} className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
                  <input type="time" value={t} onChange={e => setTime(i, e.target.value)}
                    className="bg-transparent text-blue-700 font-semibold outline-none text-sm" />
                  {form.times.length > 1 && (
                    <button onClick={() => removeTime(i)} className="text-red-400 hover:text-red-600 ml-1">✕</button>
                  )}
                </div>
              ))}
              <button onClick={addTime}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition">
                + Add Time
              </button>
            </div>
          </div>

          {msg && <p className={`text-sm font-medium ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}

          <button onClick={addReminder} disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-60 transition hover:from-blue-500 hover:to-indigo-500">
            {loading ? 'Adding...' : '⏰ Set Reminder'}
          </button>
        </div>
      </div>

      {reminders.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-slate-800 mb-4">Your Reminders</h3>
          <div className="space-y-3">
            {reminders.map(r => (
              <div key={r.id} className={`rounded-xl border p-4 ${r.active ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{r.medicine}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {(r.times || []).join(' • ')} — {r.phone}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${r.active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                    {r.active ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleReminder(r.id, r.active)}
                    className="flex-1 text-xs py-2 rounded-lg font-semibold bg-white border border-slate-200 hover:bg-slate-100 transition">
                    {r.active ? '⏸ Pause' : '▶ Resume'}
                  </button>
                  <button onClick={() => testReminder(r.id)}
                    className="flex-1 text-xs py-2 rounded-lg font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition">
                    📲 Test Now
                  </button>
                  <button onClick={() => deleteReminder(r.id)}
                    className="flex-1 text-xs py-2 rounded-lg font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AppointmentsTab({ uid }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true); setError('')
    try {
      const snap = await getDocs(query(collection(db, 'appointments'), where('userId', '==', uid)))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.appointmentDate || '').localeCompare(a.appointmentDate || ''))
      setAppointments(list)
    } catch { setError('Failed to load appointments.') }
    setLoading(false)
  }, [uid])

  useEffect(() => { load() }, [load])

  async function cancelAppointment(id) {
    if (!confirm('Cancel this appointment?')) return
    setUpdating(id)
    try {
      await updateDoc(doc(db, 'appointments', id), { status: 'Cancelled' })
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a))
    } catch {}
    setUpdating(null)
  }

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading...</div>

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">📅 My Appointments</h3>
        <button onClick={load} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition">
          ↻ Refresh
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {appointments.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-4xl mb-3">📭</p>
          <p>No appointments yet. Book one from the Doctors page.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(a => (
            <div key={a.id} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-bold text-slate-800">{a.doctorName}</p>
                  <p className="text-sm text-slate-500">{fmtDate(a.appointmentDate)}</p>
                  {a.reason && <p className="text-xs text-slate-400 mt-0.5 italic">"{a.reason}"</p>}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold shrink-0 ${
                  a.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                  a.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                  a.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {a.status || 'Confirmed'}
                </span>
              </div>
              {a.status !== 'Cancelled' && a.status !== 'Completed' && (
                <button onClick={() => cancelAppointment(a.id)} disabled={updating === a.id}
                  className="w-full text-xs py-2 rounded-lg font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50">
                  {updating === a.id ? 'Cancelling...' : '✕ Cancel Appointment'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SavedDietsTab({ uid }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!uid) return
    getDocs(collection(db, 'saved_diets', uid, 'plans'))
      .then(snap => setPlans(snap.docs.map(d => {
        const data = d.data()
        const savedAt = data.savedAt?.toDate ? data.savedAt.toDate() : new Date(data.savedAt)
        return { id: d.id, ...data, savedAt }
      })))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [uid])

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading...</div>

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-bold text-slate-800 mb-4">🥗 Saved Diet Plans</h3>
      {plans.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-4xl mb-3">📭</p>
          <p>No saved diet plans. Generate one from the Diet page and save it.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map(p => (
            <div key={p.id} className="rounded-xl border border-slate-100 overflow-hidden">
              <button onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition text-left">
                <div>
                  <p className="font-bold text-slate-800">{p.title || `${p.goal} Plan`}</p>
                  <p className="text-sm text-slate-500">
                    {p.cuisine} · {p.type} · {p.savedAt instanceof Date && !isNaN(p.savedAt) ? p.savedAt.toLocaleDateString() : ''}
                  </p>
                </div>
                <span className="text-slate-400">{expanded === p.id ? '▲' : '▼'}</span>
              </button>
              {expanded === p.id && p.plan && (
                <div className="px-4 pb-4 grid md:grid-cols-2 gap-3">
                  {p.plan.map((day, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-3">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-blue-600 text-sm">{day.day}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{day.calories}</span>
                      </div>
                      {[['🌅', day.breakfast], ['☀️', day.lunch], ['🍎', day.snack], ['🌙', day.dinner]].map(([icon, val]) => (
                        <p key={icon} className="text-xs text-slate-600">{icon} {val}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
