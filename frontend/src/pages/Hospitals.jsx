import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      getDocs(collection(db, 'hospitals')),
      getDocs(collection(db, 'doctors'))
    ]).then(([hospSnap, docSnap]) => {
      setHospitals(hospSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setDoctors(docSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  function getDoctorsForHospital(hosp) {
    const ids = hosp.doctorIds || []
    const name = hosp.name || ''
    return doctors.filter(d => ids.includes(d.id) || (name && d.hospital === name))
  }

  const filtered = hospitals.filter(h =>
    !search ||
    h.name?.toLowerCase().includes(search.toLowerCase()) ||
    h.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">🏥 Find a Hospital</h2>
        <p className="text-slate-500 text-sm mb-5">Browse hospitals and book appointments with their doctors</p>
        <input
          placeholder="Search by hospital name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-400">
          <p className="animate-pulse">Loading hospitals...</p>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-400">
          <p className="text-5xl mb-3">🏥</p>
          <p className="font-medium text-slate-600">No hospitals found.</p>
          <p className="text-sm mt-1">Hospitals can register by creating an account with role "Hospital".</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(hosp => {
          const hospDoctors = getDoctorsForHospital(hosp)
          const isOpen = expanded === hosp.id
          return (
            <div key={hosp.id} className="bg-white rounded-2xl shadow overflow-hidden">
              {/* Header row */}
              <button
                onClick={() => setExpanded(isOpen ? null : hosp.id)}
                className="w-full p-5 text-left hover:bg-slate-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shrink-0">
                    🏥
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-slate-800 text-lg truncate">{hosp.name || 'Hospital'}</p>
                      <span className="text-slate-400 text-sm shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
                    </div>
                    {hosp.city && (
                      <p className="text-sm text-slate-500 mt-0.5">
                        📍 {hosp.city}{hosp.address ? ` · ${hosp.address}` : ''}
                      </p>
                    )}
                    {hosp.phone && (
                      <p className="text-sm text-slate-500">📞 {hosp.phone}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                        👨‍⚕️ {hospDoctors.length} doctor{hospDoctors.length !== 1 ? 's' : ''}
                      </span>
                      {(hosp.specialties || []).slice(0, 3).map(s => (
                        <span key={s} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{s}</span>
                      ))}
                      {(hosp.specialties || []).length > 3 && (
                        <span className="text-xs text-slate-400">+{hosp.specialties.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded panel */}
              {isOpen && (
                <div className="border-t border-slate-100 p-4 space-y-4">
                  {hosp.description && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3">{hosp.description}</p>
                  )}

                  {hospDoctors.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      <p className="text-3xl mb-2">👨‍⚕️</p>
                      <p className="text-sm">No doctors linked to this hospital yet.</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Book with a Doctor</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {hospDoctors.map(d => (
                          <div key={d.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {(d.name || 'D')[0].toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 truncate">Dr. {d.name}</p>
                                <p className="text-xs text-blue-600">{d.specialty || 'General Physician'}</p>
                              </div>
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold shrink-0">
                                ⭐ {d.rating || '4.5'}
                              </span>
                            </div>
                            <div className="flex gap-4 text-xs text-slate-500 mb-3">
                              <span>💼 {d.experience || 1} yrs exp</span>
                              <span>💰 ₹{d.fees || 500}/visit</span>
                              <span>📅 {(d.slots || []).length} slots</span>
                            </div>
                            <button
                              onClick={() => navigate(`/doctors/${d.id}`)}
                              className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition"
                            >
                              📅 Book Appointment
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {hosp.website && (
                    <a href={hosp.website} target="_blank" rel="noreferrer"
                      className="block text-center text-sm text-blue-600 hover:underline">
                      🌐 Visit Hospital Website
                    </a>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
