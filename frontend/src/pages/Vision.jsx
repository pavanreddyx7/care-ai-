import { useState, useRef } from 'react'
import axios from 'axios'
import { marked } from 'marked'

export default function Vision() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState('')
  const fileRef = useRef()

  function handleFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => { setImage(e.target.result); setPreview(e.target.result); setResult(null) }
    reader.readAsDataURL(file)
  }

  async function analyze() {
    if (!image) return alert('Please upload an image first.')
    setLoading(true)
    try {
      const { data } = await axios.post('/api/chat', { image, query: context || 'Analyze this medical image', language: 'English' })
      setResult(data)
    } catch (e) { alert('Analysis failed: ' + e.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">📷 Medical Vision</h2>
        <p className="text-slate-500 text-sm mb-6">Upload photos of skin issues, lab reports, or medicines for AI analysis.</p>

        <div
          onClick={() => fileRef.current.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          {preview
            ? <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-xl object-contain" />
            : <>
                <p className="text-4xl mb-3">📁</p>
                <p className="font-semibold text-slate-700">Click to Upload</p>
                <p className="text-sm text-slate-400 mt-1">JPG, PNG (Max 5MB)</p>
              </>}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>

        <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Additional context (optional)..."
          className="w-full mt-4 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" rows={2} />

        <button onClick={analyze} disabled={loading || !image}
          className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
          {loading ? '🔍 Analyzing...' : '🔍 Analyze Image'}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 uppercase mb-2">🩺 Medical Analysis</p>
            <div className="pro-text text-sm" dangerouslySetInnerHTML={{ __html: marked.parse(result.medical || '') }} />
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-xs font-bold text-green-700 uppercase mb-2">🌿 Herbal Remedies</p>
            <div className="pro-text text-sm" dangerouslySetInnerHTML={{ __html: marked.parse(result.herbal || '') }} />
          </div>
        </div>
      )}
    </div>
  )
}
