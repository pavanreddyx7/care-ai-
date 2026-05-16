import { useState } from 'react'
import axios from 'axios'

export default function Safety() {
  const [drug1, setDrug1] = useState('')
  const [drug2, setDrug2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const colorMap = { green: 'bg-green-50 border-green-300 text-green-800', yellow: 'bg-yellow-50 border-yellow-300 text-yellow-800', red: 'bg-red-50 border-red-300 text-red-800' }
  const iconMap = { Safe: '✅', Caution: '⚠️', Danger: '🚨' }

  async function check() {
    if (!drug1 || !drug2) return alert('Enter both drug names.')
    setLoading(true)
    try {
      const { data } = await axios.post('/api/check_safety', { drug1, drug2 })
      setResult(data)
    } catch (e) { alert('Check failed: ' + e.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">💊 Drug Safety Checker</h2>
        <p className="text-slate-500 text-sm mb-6">Check interactions between two medicines</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Medicine 1</label>
            <input value={drug1} onChange={e => setDrug1(e.target.value)} placeholder="e.g. Aspirin"
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
          <div className="text-center text-2xl text-slate-400">⚡</div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Medicine 2</label>
            <input value={drug2} onChange={e => setDrug2(e.target.value)} placeholder="e.g. Ibuprofen"
              onKeyDown={e => e.key === 'Enter' && check()}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
        </div>

        <button onClick={check} disabled={loading}
          className="w-full mt-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
          {loading ? '🔍 Checking...' : '🔍 Check Interaction'}
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border-2 p-6 ${colorMap[result.color] || 'bg-slate-50 border-slate-300'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{iconMap[result.status] || '❓'}</span>
            <h3 className="text-xl font-bold">{result.status}</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold uppercase opacity-70 mb-1">Interaction</p>
              <p className="text-sm">{result.interaction}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase opacity-70 mb-1">Recommendation</p>
              <p className="text-sm font-medium">{result.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
