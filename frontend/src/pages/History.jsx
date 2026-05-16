import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function History() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const uid = auth.currentUser?.uid

  useEffect(() => { fetchHistory() }, [])

  async function fetchHistory() {
    if (!uid) return
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'history', uid, 'records'), orderBy('date', 'desc')))
      setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch { }
    setLoading(false)
  }

  async function clearHistory() {
    if (!confirm('Clear all history?')) return
    try {
      const snap = await getDocs(collection(db, 'history', uid, 'records'))
      await Promise.all(snap.docs.map(d => deleteDoc(doc(db, 'history', uid, 'records', d.id))))
      setRecords([])
    } catch (e) { alert('Failed to clear history.') }
  }

  function fmtDate(iso) {
    if (!iso) return ''
    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">📋 Medical History</h2>
            <p className="text-slate-500 text-sm">Your past AI consultations</p>
          </div>
          {records.length > 0 && (
            <button onClick={clearHistory} className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-xl hover:bg-red-50 border border-red-200 transition">
              🗑 Clear All
            </button>
          )}
        </div>

        {loading && <p className="text-center text-slate-400 py-10">Loading...</p>}
        {!loading && records.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-medium">No history yet. Run a health check to get started.</p>
          </div>
        )}

        <div className="space-y-4">
          {records.map(r => (
            <div key={r.id} className="border border-slate-100 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800 text-lg">{r.disease}</h3>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap ml-2">{fmtDate(r.date)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{r.description}</p>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-blue-600 mb-1">💊 Medicine</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{r.medicine}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-green-600 mb-1">🥗 Diet</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{r.diet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
