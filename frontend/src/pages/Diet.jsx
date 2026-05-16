import { useState } from 'react'
import axios from 'axios'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Diet() {
  const [form, setForm] = useState({ cuisine: 'Indian', type: 'Vegetarian', goal: 'Healthy Living', age: 25 })
  const [plan, setPlan] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  async function generate() {
    setLoading(true); setSavedMsg('')
    try {
      const { data } = await axios.post('/api/generate_diet', form)
      setPlan(data.plan || [])
    } catch (e) { alert('Failed: ' + e.message) }
    setLoading(false)
  }

  async function savePlan() {
    const uid = auth.currentUser?.uid
    if (!uid || !plan.length) return
    setSaving(true)
    try {
      await addDoc(collection(db, 'saved_diets', uid, 'plans'), {
        cuisine: form.cuisine, type: form.type, goal: form.goal,
        plan, savedAt: new Date().toISOString()
      })
      setSavedMsg('Plan saved to your profile!')
    } catch { setSavedMsg('Failed to save.') }
    setSaving(false)
    setTimeout(() => setSavedMsg(''), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">🥗 AI Diet Planner</h2>
        <p className="text-slate-500 text-sm mb-6">Get a personalized 7-day meal plan</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Cuisine</label>
            <select value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              {['Indian', 'Mediterranean', 'Asian', 'Continental', 'South Indian', 'Vegan'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Diet Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Keto', 'Low-Carb'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Health Goal</label>
            <select value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              {['Healthy Living', 'Weight Loss', 'Weight Gain', 'Diabetes Management', 'Heart Health', 'Muscle Building'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Age</label>
            <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
        </div>

        <button onClick={generate} disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:opacity-60 transition">
          {loading ? '⏳ Generating Plan...' : '🥗 Generate 7-Day Meal Plan'}
        </button>
      </div>

      {plan.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold text-slate-800">Your 7-Day Meal Plan</h3>
            <div className="flex items-center gap-3">
              {savedMsg && <span className="text-sm text-green-600 font-medium">{savedMsg}</span>}
              <button onClick={savePlan} disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 transition">
                {saving ? 'Saving...' : '💾 Save Plan'}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {plan.map((day, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-blue-600">{day.day}</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{day.calories}</span>
                </div>
                {[['🌅 Breakfast', day.breakfast], ['☀️ Lunch', day.lunch], ['🍎 Snack', day.snack], ['🌙 Dinner', day.dinner]].map(([label, val]) => (
                  <div key={label} className="mb-2">
                    <span className="text-xs font-bold text-slate-400">{label}</span>
                    <p className="text-sm text-slate-700">{val}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
