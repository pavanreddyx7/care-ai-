import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, arrayUnion, arrayRemove } from 'firebase/firestore'
import { auth, db } from '../firebase'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
}

const SPECIALTIES = ['General Medicine', 'Cardiology', 'Dermatology', 'Orthopedics',
  'Neurology', 'Gynecology', 'Pediatrics', 'ENT', 'Ophthalmology',
  'Dentistry', 'Psychiatry', 'Physiotherapy', 'Oncology', 'Urology']

const TABS = ['Hospital Profile', 'Our Doctors', 'Appointments']

// ─── Shared field component (module-level to prevent remount on typing) ───────
const HCLS = "w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500"

function HField({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={HCLS} />
    </div>
  )
}

// ─── Root dashboard ────────────────────────────────────────────────────────────
export default function HospitalDashboard() {
  const [tab, setTab] = useState('Hospital Profile')
  const uid = auth.currentUser?.uid

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">🏥 Hospital Dashboard</h2>
        <p className="text-slate-500 text-sm mb-4">Manage your hospital profile, doctors, and appointments</p>
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'Hospital Profile' && <HospitalProfileTab uid={uid} />}
      {tab === 'Our Doctors' && <OurDoctorsTab uid={uid} />}
      {tab === 'Appointments' && <AppointmentsTab uid={uid} />}
    </div>
  )
}

// ─── Hospital Profile ─────────────────────────────────────────────────────────
function HospitalProfileTab({ uid }) {
  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', website: '', description: '', specialties: []
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'hospitals', uid)).then(snap => {
      if (snap.exists()) setForm(f => ({ ...f, ...snap.data() }))
    })
  }, [uid])

  function toggleSpec(s) {
    setForm(f => ({
      ...f,
      specialties: (f.specialties || []).includes(s)
        ? f.specialties.filter(x => x !== s)
        : [...(f.specialties || []), s]
    }))
  }

  async function save() {
    if (!form.name.trim()) return alert('Hospital name is required.')
    setSaving(true)
    try {
      await setDoc(doc(db, 'hospitals', uid), { ...form, userId: uid }, { merge: true })
      await setDoc(doc(db, 'users', uid), { name: form.name, phone: form.phone, role: 'hospital' }, { merge: true })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) { alert('Save failed: ' + e.message) }
    setSaving(false)
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          🏥
        </div>
        <div>
          <p className="font-bold text-slate-800 text-lg">{form.name || 'Your Hospital'}</p>
          <p className="text-slate-500 text-sm">{auth.currentUser?.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <HField label="Hospital / Clinic Name *" value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="e.g. Apollo Hospital" />
        <HField label="Phone" value={form.phone || ''} onChange={e => set('phone', e.target.value)} type="tel" placeholder="+91XXXXXXXXXX" />
        <HField label="City" value={form.city || ''} onChange={e => set('city', e.target.value)} placeholder="e.g. Bangalore" />
        <HField label="Website" value={form.website || ''} onChange={e => set('website', e.target.value)} placeholder="https://..." />
        <div className="md:col-span-2">
          <HField label="Address" value={form.address || ''} onChange={e => set('address', e.target.value)} placeholder="Full address" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">About / Description</label>
          <textarea value={form.description || ''} onChange={e => set('description', e.target.value)}
            rows={3} placeholder="Brief description of your hospital..."
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Departments / Specialties</p>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(s => (
            <button key={s} onClick={() => toggleSpec(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${(form.specialties || []).includes(s) ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs text-amber-700">
          <strong>Important:</strong> After saving your hospital name, doctors must enter this exact name
          in their Doctor Dashboard → Profile to be linked to your hospital.
        </p>
      </div>

      <button onClick={save} disabled={saving}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 transition">
        {saving ? 'Saving...' : saved ? '✅ Profile Saved!' : '💾 Save Hospital Profile'}
      </button>
    </div>
  )
}

// ─── Our Doctors ──────────────────────────────────────────────────────────────
function OurDoctorsTab({ uid }) {
  const [doctors, setDoctors] = useState([])
  const [allDoctors, setAllDoctors] = useState([])
  const [hospitalName, setHospitalName] = useState('')
  const [linkedIds, setLinkedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [toggling, setToggling] = useState(null)

  const loadData = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    try {
      const hospSnap = await getDoc(doc(db, 'hospitals', uid))
      const hData = hospSnap.exists() ? hospSnap.data() : {}
      const name = hData.name || ''
      const ids = hData.doctorIds || []
      setHospitalName(name)
      setLinkedIds(ids)

      // Get doctors: by name match OR by explicit doctorIds
      const allSnap = await getDocs(collection(db, 'doctors'))
      const all = allSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      setAllDoctors(all)

      const linked = all.filter(d =>
        ids.includes(d.id) || (name && d.hospital === name)
      )
      setDoctors(linked)
    } catch (e) { console.error(e) }
    setLoading(false)
  }, [uid])

  useEffect(() => { loadData() }, [loadData])

  async function toggleDoctor(doctorId, add) {
    setToggling(doctorId)
    try {
      await setDoc(doc(db, 'hospitals', uid), {
        doctorIds: add ? arrayUnion(doctorId) : arrayRemove(doctorId)
      }, { merge: true })
      await loadData()
    } catch (e) { alert('Failed to update: ' + e.message) }
    setToggling(null)
  }

  const searchResults = search.length > 1
    ? allDoctors.filter(d =>
        !linkedIds.includes(d.id) &&
        (d.name?.toLowerCase().includes(search.toLowerCase()) ||
         d.specialty?.toLowerCase().includes(search.toLowerCase()))
      ).slice(0, 8)
    : []

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Loading doctors...</div>

  return (
    <div className="space-y-4">
      {!hospitalName && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-700 font-medium">⚠️ Set your hospital name in <strong>Hospital Profile</strong> first, then come back here to manage doctors.</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Doctors at {hospitalName || 'your hospital'}</h3>
            <p className="text-sm text-slate-500">{doctors.length} doctor{doctors.length !== 1 ? 's' : ''} linked</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadData}
              className="px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition">
              🔄 Refresh
            </button>
            <button onClick={() => setShowSearch(s => !s)}
              className="px-3 py-2 text-xs font-semibold bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              {showSearch ? '✕ Close' : '+ Add Doctor'}
            </button>
          </div>
        </div>

        {/* Search to add doctor */}
        {showSearch && (
          <div className="mb-5 p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="text-xs font-bold text-purple-700 uppercase mb-2">Search & Add a Doctor</p>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by doctor name or specialty..."
              className="w-full p-3 rounded-xl border border-purple-300 bg-white outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            {searchResults.length > 0 && (
              <div className="mt-3 space-y-2">
                {searchResults.map(d => (
                  <div key={d.id} className="flex items-center justify-between bg-white rounded-xl p-3 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {(d.name || 'D')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Dr. {d.name}</p>
                        <p className="text-xs text-slate-500">{d.specialty} · {d.hospital || 'No hospital set'}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleDoctor(d.id, true)} disabled={toggling === d.id}
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition">
                      {toggling === d.id ? '...' : '+ Add'}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {search.length > 1 && searchResults.length === 0 && (
              <p className="mt-2 text-sm text-slate-400">No unlinked doctors found for "{search}"</p>
            )}
          </div>
        )}

        {doctors.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-5xl mb-3">👨‍⚕️</p>
            <p className="font-medium text-slate-600">No doctors linked yet</p>
            <p className="text-sm mt-1">
              Doctors who set <strong>"{hospitalName}"</strong> in their profile appear here automatically,
              or use <strong>+ Add Doctor</strong> above to link them manually.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {doctors.map(d => (
              <div key={d.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {(d.name || 'D')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">Dr. {d.name}</p>
                    <p className="text-sm text-blue-600">{d.specialty || 'General'}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold shrink-0">
                    ⭐ {d.rating || '4.5'}
                  </span>
                </div>

                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  <span>💼 {d.experience || 1} yrs exp</span>
                  <span>💰 ₹{d.fees || 500}/visit</span>
                  {d.phone && <span>📞 {d.phone}</span>}
                </div>

                {d.slots?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.slots.slice(0, 5).map(s => (
                      <span key={s} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                    {d.slots.length > 5 && <span className="text-xs text-slate-400">+{d.slots.length - 5} more</span>}
                  </div>
                )}

                {linkedIds.includes(d.id) && (
                  <button onClick={() => toggleDoctor(d.id, false)} disabled={toggling === d.id}
                    className="mt-3 w-full text-xs py-1.5 rounded-lg font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition disabled:opacity-50">
                    {toggling === d.id ? '...' : '✕ Remove from hospital'}
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

// ─── Appointments ─────────────────────────────────────────────────────────────
function AppointmentsTab({ uid }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(null)

  const loadAppointments = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    setError('')
    try {
      const snap = await getDoc(doc(db, 'hospitals', uid))
      if (!snap.exists()) { setError('Hospital profile not found. Please set up your profile first.'); setLoading(false); return }

      const hData = snap.data()
      const hospitalName = hData.name || ''
      const linkedIds = hData.doctorIds || []

      if (!hospitalName && linkedIds.length === 0) {
        setError('No hospital name or linked doctors found. Set up your hospital profile first.')
        setLoading(false); return
      }

      // Get all doctors from Firestore (by name match or linked IDs)
      const allSnap = await getDocs(collection(db, 'doctors'))
      const doctorNames = []
      allSnap.docs.forEach(d => {
        const data = d.data()
        if ((hospitalName && data.hospital === hospitalName) || linkedIds.includes(d.id)) {
          if (data.name) doctorNames.push(`Dr. ${data.name}`)
        }
      })

      if (doctorNames.length === 0) {
        setError('No doctors are linked to this hospital yet. Go to "Our Doctors" to add them.')
        setLoading(false); return
      }

      // Firestore 'in' supports max 30 items per query
      const chunks = []
      for (let i = 0; i < doctorNames.length; i += 30) chunks.push(doctorNames.slice(i, i + 30))
      const allAppts = []
      for (const chunk of chunks) {
        const snap = await getDocs(query(collection(db, 'appointments'), where('doctorName', 'in', chunk)))
        snap.docs.forEach(d => allAppts.push({ id: d.id, ...d.data() }))
      }
      allAppts.sort((a, b) => (b.appointmentDate || '').localeCompare(a.appointmentDate || ''))
      setAppointments(allAppts)
    } catch (e) {
      setError('Failed to load appointments. Please try again.')
      console.error(e)
    }
    setLoading(false)
  }, [uid])

  useEffect(() => { loadAppointments() }, [loadAppointments])

  async function updateStatus(id, status) {
    setUpdating(id)
    try {
      await updateDoc(doc(db, 'appointments', id), { status })
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    } catch { alert('Update failed. Please try again.') }
    setUpdating(null)
  }

  const counts = {
    All: appointments.length,
    Confirmed: appointments.filter(a => a.status === 'Confirmed').length,
    Completed: appointments.filter(a => a.status === 'Completed').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  }

  const filtered = appointments.filter(a => {
    const matchFilter = filter === 'All' || a.status === filter
    const matchSearch = !search || a.doctor_name?.toLowerCase().includes(search.toLowerCase()) || a.reason?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  if (loading) return (
    <div className="bg-white rounded-2xl shadow p-10 text-center">
      <div className="text-slate-400 animate-pulse text-lg">Loading appointments...</div>
    </div>
  )

  if (error) return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
        <p className="text-3xl mb-2">⚠️</p>
        <p className="text-amber-700 font-medium">{error}</p>
        <button onClick={loadAppointments} className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition">
          Try Again
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', count: counts.All, border: 'border-slate-300', icon: '📋' },
          { label: 'Confirmed', count: counts.Confirmed, border: 'border-green-500', icon: '✅' },
          { label: 'Completed', count: counts.Completed, border: 'border-blue-500', icon: '✔️' },
          { label: 'Cancelled', count: counts.Cancelled, border: 'border-red-400', icon: '❌' },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-xl shadow p-4 border-l-4 ${s.border}`}>
            <p className="text-2xl font-extrabold text-slate-800">{s.count}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">{s.icon} {s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        {/* Controls row */}
        <div className="flex flex-wrap gap-3 items-center mb-5">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by doctor or reason..."
            className="flex-1 min-w-40 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-purple-400" />
          <button onClick={loadAppointments}
            className="px-4 py-2.5 text-sm font-semibold bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition">
            🔄 Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {['All', 'Confirmed', 'Completed', 'Cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${filter === f ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {f} <span className="opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-5xl mb-3">📭</p>
            <p className="font-medium">No {filter !== 'All' ? filter.toLowerCase() : ''} appointments found.</p>
            {search && <p className="text-sm mt-1">Try clearing the search filter.</p>}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(a => (
              <AppointmentCard key={a.id} appt={a} onUpdate={updateStatus} updating={updating} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Appointment card (module-level to avoid remount) ─────────────────────────
function AppointmentCard({ appt: a, onUpdate, updating }) {
  const statusStyle = {
    Confirmed: 'bg-green-100 text-green-700',
    Completed: 'bg-blue-100 text-blue-700',
    Cancelled: 'bg-red-100 text-red-600',
  }[a.status] || 'bg-slate-100 text-slate-600'

  const cardStyle = a.status === 'Cancelled'
    ? 'border-red-100 bg-red-50/40 opacity-75'
    : a.status === 'Completed'
      ? 'border-green-100 bg-green-50/40'
      : 'border-slate-200 hover:shadow-sm'

  return (
    <div className={`rounded-xl border p-4 transition ${cardStyle}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-bold text-slate-800">{a.doctorName}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusStyle}`}>
              {a.status}
            </span>
          </div>
          <p className="text-sm text-slate-600">🗓 {fmtDate(a.appointmentDate)}</p>
          {a.reason && <p className="text-xs text-slate-500 mt-0.5">📝 {a.reason}</p>}
          {a.patientName && <p className="text-xs text-slate-500 mt-0.5">👤 {a.patientName}{a.patientPhone ? ` · 📞 ${a.patientPhone}` : ''}</p>}
        </div>

        <div className="flex gap-2 shrink-0 flex-wrap">
          {a.status === 'Confirmed' && (
            <>
              <button onClick={() => onUpdate(a.id, 'Completed')} disabled={updating === a.id}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition disabled:opacity-50">
                {updating === a.id ? '...' : '✔ Complete'}
              </button>
              <button onClick={() => onUpdate(a.id, 'Cancelled')} disabled={updating === a.id}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50">
                {updating === a.id ? '...' : '✕ Cancel'}
              </button>
            </>
          )}
          {a.status === 'Cancelled' && (
            <button onClick={() => onUpdate(a.id, 'Confirmed')} disabled={updating === a.id}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition disabled:opacity-50">
              {updating === a.id ? '...' : '↩ Restore'}
            </button>
          )}
          {a.status === 'Completed' && (
            <span className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-blue-50 text-blue-500 border border-blue-100">
              ✔ Done
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
