import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const SPECIALTIES = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Orthopedic',
  'Neurologist', 'Gynecologist', 'Pediatrician', 'ENT Specialist', 'Ophthalmologist',
  'Dentist', 'Psychiatrist', 'Physiotherapist']

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getDocs(collection(db, 'doctors'))
      .then(snap => setDoctors(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = doctors.filter(d => {
    const matchSpec = filter === 'All' || d.specialty === filter
    const matchSearch = !search || d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital?.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">👨‍⚕️ Find a Doctor</h2>
        <p className="text-slate-500 text-sm mb-5">Browse registered doctors and book appointments</p>

        <input placeholder="Search by name or hospital..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 mb-4" />

        <div className="flex gap-2 flex-wrap">
          {SPECIALTIES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-400">Loading doctors...</div>}

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-400">
          <p className="text-5xl mb-3">🏥</p>
          <p className="font-medium text-slate-600">No doctors found.</p>
          <p className="text-sm mt-1">Doctors can register by creating an account with role "Doctor".</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} onClick={() => navigate(`/doctors/${doc.id}`)}
            className="bg-white rounded-2xl shadow p-5 cursor-pointer hover:shadow-md hover:border-blue-200 border border-transparent transition">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {(doc.name || 'D')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-800 truncate">Dr. {doc.name}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                    ⭐ {doc.rating || '4.5'}
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium">{doc.specialty || 'General Physician'}</p>
                <p className="text-xs text-slate-500 truncate">{doc.hospital || 'Hospital not specified'}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-500">💼 {doc.experience || 1} yrs exp</span>
                  <span className="text-xs text-slate-500">💰 ₹{doc.fees || 500}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition">
              View Profile & Book
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
