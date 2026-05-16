import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [reason, setReason] = useState('General Consultation')
  const [bookedTimes, setBookedTimes] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const uid = auth.currentUser?.uid

  useEffect(() => {
    getDoc(doc(db, 'doctors', id))
      .then(snap => { if (snap.exists()) setDoctor({ id: snap.id, ...snap.data() }) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const loadBookedSlots = useCallback(async (date, doctorName) => {
    setSlotsLoading(true)
    setSelectedTime('')
    try {
      const snap = await getDocs(query(
        collection(db, 'appointments'),
        where('doctorName', '==', 'Dr. ' + doctorName)
      ))
      const booked = snap.docs
        .map(d => d.data())
        .filter(a => a.status !== 'Cancelled' && a.appointmentDate?.startsWith(date))
        .map(a => a.appointmentDate.split('T')[1]?.slice(0, 5))
        .filter(Boolean)
      setBookedTimes(booked)
    } catch { setBookedTimes([]) }
    setSlotsLoading(false)
  }, [])

  function onDateChange(date) {
    setSelectedDate(date)
    setSelectedTime('')
    if (date && doctor) loadBookedSlots(date, doctor.name)
  }

  async function bookAppointment() {
    if (!selectedDate || !selectedTime) return setMsg('Select a date and slot.')
    setBooking(true); setMsg('')
    try {
      const userSnap = await getDoc(doc(db, 'users', uid))
      const userData = userSnap.exists() ? userSnap.data() : {}
      await addDoc(collection(db, 'appointments'), {
        userId: uid,
        doctorName: `Dr. ${doctor.name}`,
        doctorId: id,
        appointmentDate: `${selectedDate}T${selectedTime}`,
        reason,
        status: 'Confirmed',
        patientName: userData.name || '',
        patientPhone: userData.phone || '',
        createdAt: serverTimestamp()
      })
      setMsg('✅ Appointment booked successfully!')
      setSelectedDate(''); setSelectedTime('')
      setReason('General Consultation')
      setBookedTimes([])
    } catch (e) { setMsg(e.message || 'Booking failed. Please try again.') }
    setBooking(false)
  }

  async function startChat() {
    if (!doctor.userId) return alert('Doctor account not linked. Contact support.')
    const chatId = [doctor.userId, uid].sort().join('_')
    const mySnap = await getDoc(doc(db, 'users', uid))
    const myName = mySnap.exists() ? mySnap.data().name : auth.currentUser?.email
    await setDoc(doc(db, 'chats', chatId), {
      doctorUserId: doctor.userId,
      doctorId: id,
      patientUid: uid,
      doctorName: doctor.name,
      patientName: myName || '',
      lastMessage: '',
      lastAt: new Date().toISOString()
    }, { merge: true })
    navigate(`/doctor-chat/${chatId}`, { state: { doctorName: doctor.name, doctorId: id } })
  }

  if (loading) return <div className="flex justify-center p-10 text-slate-400">Loading...</div>
  if (!doctor) return <div className="max-w-2xl mx-auto p-4"><div className="bg-white rounded-2xl shadow p-8 text-center text-slate-400">Doctor not found.</div></div>

  const slots = doctor.slots || []

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {/* Doctor Info Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
            {(doctor.name || 'D')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 truncate">Dr. {doctor.name}</h2>
            <p className="text-blue-600 font-semibold">{doctor.specialty || 'General Physician'}</p>
            <p className="text-slate-500 text-sm">{doctor.hospital || 'Hospital not specified'}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">⭐ {doctor.rating || '4.5'} Rating</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">💼 {doctor.experience || 1} yrs</span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">💰 ₹{doctor.fees || 500} / visit</span>
            </div>
          </div>
        </div>

        {doctor.bio && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">About</p>
            <p className="text-sm text-slate-700">{doctor.bio}</p>
          </div>
        )}

        {slots.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Available Slots</p>
            <div className="flex flex-wrap gap-2">
              {slots.map(s => (
                <span key={s} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-5">
          <button onClick={startChat}
            className="flex-1 min-w-[160px] py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition">
            💬 Chat with Doctor
          </button>
          {doctor.phone && (
            <a href={`tel:${doctor.phone}`}
              className="px-5 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-2">
              📞 Call
            </a>
          )}
        </div>
      </div>

      {/* Book Appointment */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">📅 Book Appointment</h3>

        {/* Step 1 — Pick date */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Step 1 — Select Date</label>
          <input type="date" value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => onDateChange(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Step 2 — Pick slot */}
        {selectedDate && (() => {
          const dayName = DAY_NAMES[new Date(selectedDate + 'T00:00:00').getDay()]
          const daySlots = (doctor.slots || []).filter(s => s.startsWith(dayName + ' ')).map(s => s.split(' ')[1])

          return (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Step 2 — Pick a Slot ({dayName})</label>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-400 inline-block"></span> Available</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-orange-400 inline-block"></span> Booked</span>
                </div>
              </div>

              {slotsLoading ? (
                <p className="text-sm text-slate-400 py-4 text-center">Loading slots...</p>
              ) : daySlots.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">No slots available on {dayName}. Try another date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {daySlots.map(t => {
                    const booked = bookedTimes.includes(t)
                    const selected = selectedTime === t
                    return (
                      <button key={t} onClick={() => !booked && setSelectedTime(t)} disabled={booked}
                        className={`py-2.5 rounded-xl text-xs font-bold transition border-2 ${
                          booked
                            ? 'bg-orange-100 text-orange-500 border-orange-200 cursor-not-allowed'
                            : selected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-400'
                        }`}>
                        {t}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })()}

        {/* Step 3 — Reason */}
        {selectedTime && (
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Step 3 — Reason for Visit</label>
            <input value={reason} onChange={e => setReason(e.target.value)}
              placeholder="Reason for visit"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        )}

        {msg && (
          <p className={`mb-3 text-sm font-medium ${msg.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>
        )}

        {selectedTime && (
          <button onClick={bookAppointment} disabled={booking}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
            {booking ? 'Booking...' : `✅ Confirm — ${DAY_NAMES[new Date(selectedDate + 'T00:00:00').getDay()]} ${selectedTime}`}
          </button>
        )}
      </div>
    </div>
  )
}
