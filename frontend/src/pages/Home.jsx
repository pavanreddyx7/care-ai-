import { useState } from 'react'
import axios from 'axios'
import { marked } from 'marked'
import { auth } from '../firebase'

const SYMPTOMS = ['Abdominal Pain','Acidity','Acne','Anxiety','Back Pain','Bloating','Blurry Vision','Body Ache','Chest Pain','Chills','Cold Hands/Feet','Confusion','Constipation','Cough','Cramps','Dark Urine','Depression','Diarrhea','Dizziness','Dry Skin','Ear Pain','Fatigue','Fever','Frequent Urination','Gas','Hair Loss','Headache','Heart Palpitations','Heartburn','High Fever','Hives','Indigestion','Insomnia','Irregular Periods','Irritability','Itching','Joint Pain','Knee Pain','Leg Pain','Loss of Appetite','Loss of Smell','Memory Loss','Migraine','Mood Swings','Mouth Ulcers','Muscle Pain','Muscle Weakness','Nausea','Neck Pain','Night Sweats','Nosebleed','Numbness','Pale Skin','Panic Attacks','Rash','Runny Nose','Shortness of Breath','Skin Redness','Sleepiness','Sneezing','Sore Throat','Stomach Pain','Sweating','Swelling','Swollen Glands','Tremors','Vomiting','Watery Eyes','Weakness','Weight Gain','Wheezing','Yellow Skin (Jaundice)']
const HISTORY_OPTIONS = ['Diabetes','Hypertension','Heart Disease','Asthma','Allergies','Current Medications','Thyroid Disorder','Arthritis']

function fmt(text) {
  if (!text) return 'No info.'
  return marked.parse(text.replace(/•/g, '\n- '))
}

export default function Home() {
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [vitals, setVitals] = useState({ temperature: '', systolic_bp: '', heart_rate: '', spo2: '' })
  const [history, setHistory] = useState([])
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState('Male')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const filtered = SYMPTOMS.filter(s => s.toLowerCase().includes(search.toLowerCase()))

  function toggleSymptom(s) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }
  function toggleHistory(h) {
    setHistory(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h])
  }
  function autoMeasure() {
    setVitals({ temperature: (97.5 + Math.random() * 1.5).toFixed(1), systolic_bp: Math.floor(110 + Math.random() * 20), heart_rate: Math.floor(65 + Math.random() * 20), spo2: Math.floor(96 + Math.random() * 4) })
  }

  async function analyze() {
    if (!selected.length) return alert('Select at least one symptom.')
    setLoading(true)
    try {
      const { data } = await axios.post('/api/recommend', { symptoms: selected, vitals, history, age, gender, language: 'English', user_id: auth.currentUser?.uid })
      setResult(data)
      setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100)
    } catch (e) { alert('Error: ' + e.message) }
    setLoading(false)
  }

  async function downloadPDF() {
    if (!result) return
    const res = await fetch('/api/download_report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result) })
    const blob = await res.blob()
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'CareAI_Report.pdf'; a.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">🩺 Health Check</h2>
            <p className="text-slate-500 text-sm">AI assessment based on symptoms & vitals</p>
          </div>
          <button onClick={autoMeasure} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 border border-blue-100 transition">
            ⚡ Auto-Measure (Demo)
          </button>
        </div>

        {/* Vitals */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vital Signs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[{ id: 'temperature', label: 'Temp', unit: '°F', ph: '98.6', bg: 'red' }, { id: 'systolic_bp', label: 'Sys BP', unit: 'mmHg', ph: '120', bg: 'blue' }, { id: 'heart_rate', label: 'Heart Rate', unit: 'bpm', ph: '72', bg: 'pink' }, { id: 'spo2', label: 'SpO2', unit: '%', ph: '98', bg: 'teal' }].map(v => (
            <div key={v.id} className={`p-4 rounded-xl bg-${v.bg}-50 border border-${v.bg}-100`}>
              <p className={`text-xs font-bold text-${v.bg}-600 mb-2`}>{v.label}</p>
              <div className="flex items-end gap-1">
                <input type="number" placeholder={v.ph} value={vitals[v.id]} onChange={e => setVitals({ ...vitals, [v.id]: e.target.value })}
                  className="w-full bg-transparent text-2xl font-bold text-slate-700 outline-none" />
                <span className="text-xs text-slate-400 mb-1">{v.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Medical History */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Medical History</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {HISTORY_OPTIONS.map(h => (
            <label key={h} className="cursor-pointer">
              <input type="checkbox" className="sr-only" checked={history.includes(h)} onChange={() => toggleHistory(h)} />
              <div className={`p-2.5 rounded-xl border text-sm font-medium transition flex items-center gap-2 ${history.includes(h) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                {h}
              </div>
            </label>
          ))}
        </div>

        {/* Patient + Symptoms */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Patient & Symptoms</p>
        <div className="flex gap-3 mb-3">
          <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-20 p-3 rounded-xl border border-slate-200 font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="Age" />
          <select value={gender} onChange={e => setGender(e.target.value)} className="p-3 rounded-xl border border-slate-200 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
          <input type="text" placeholder="Search symptoms..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
        </div>

        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-8">
          {selected.map(s => (
            <span key={s} className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {s} <button onClick={() => toggleSymptom(s)} className="hover:text-red-300">✕</button>
            </span>
          ))}
        </div>

        {/* Symptom Grid */}
        <div className="max-h-40 overflow-y-auto border border-slate-100 rounded-xl p-2 mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50">
          {filtered.length === 0 && <p className="col-span-full text-center text-slate-400 py-4 text-sm">No match</p>}
          {filtered.map(s => (
            <button key={s} onClick={() => toggleSymptom(s)}
              className={`p-2 rounded-lg text-sm font-medium text-left transition border ${selected.includes(s) ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
              {s} {selected.includes(s) && '✓'}
            </button>
          ))}
        </div>

        <button onClick={analyze} disabled={loading}
          className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition flex items-center justify-center gap-2">
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Health Data'}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div id="result" className={`bg-white rounded-2xl shadow p-6 border-t-8 ${result.is_emergency ? 'border-red-500' : 'border-blue-500'}`}>
          <div className="flex flex-wrap justify-between items-start gap-3 mb-6 pb-4 border-b">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis Result</p>
              <h3 className={`text-2xl font-extrabold mt-1 ${result.is_emergency ? 'text-red-600' : 'text-slate-800'}`}>{result.disease}</h3>
            </div>
            <button onClick={downloadPDF} className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-900 transition">
              ⬇ Download PDF
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Description</p>
            <div className="pro-text border-l-4 border-blue-200 pl-4 text-slate-600" dangerouslySetInnerHTML={{ __html: fmt(result.description) }} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[{ label: '💊 Medicine', key: 'medicine', bg: 'blue' }, { label: '🛡 Precautions', key: 'precautions', bg: 'slate' }, { label: '🏃 Workout', key: 'workouts', bg: 'amber' }, { label: '🥗 Diet', key: 'diet', bg: 'green' }].map(({ label, key, bg }) => (
              <div key={key} className={`bg-${bg}-50 border border-${bg}-100 p-4 rounded-2xl`}>
                <p className={`text-xs font-bold text-${bg}-700 uppercase tracking-wide mb-2`}>{label}</p>
                <div className="pro-text text-sm" dangerouslySetInnerHTML={{ __html: fmt(result[key]) }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
