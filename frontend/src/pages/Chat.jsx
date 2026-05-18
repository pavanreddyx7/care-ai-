import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { marked } from 'marked'

function AiMessage({ m }) {
  // Structured response with medical + herbal split into two cards
  if (m.medical && m.herbal) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 260px' }} className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">🩺 Medical</p>
            <div className="pro-text text-sm text-slate-700"
              dangerouslySetInnerHTML={{ __html: marked.parse(m.medical || '') }} />
          </div>
          <div style={{ flex: '1 1 260px' }} className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">🌿 Herbal</p>
            <div className="pro-text text-sm text-slate-700"
              dangerouslySetInnerHTML={{ __html: marked.parse(m.herbal || '') }} />
          </div>
        </div>
      </div>
    )
  }
  // Plain AI message (greeting, error, etc.)
  return (
    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-none text-sm bg-slate-100 text-slate-800">
      <div className="pro-text" dangerouslySetInnerHTML={{ __html: marked.parse(m.text || '') }} />
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am your AI Doctor. How can I help you today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const history = messages.filter(m => m.role !== 'system').map(m => ({
        user: m.role === 'user' ? m.text : '',
        ai: m.role === 'ai' ? (m.text || '') : ''
      }))
      const { data } = await axios.post('/api/chat', { query: userMsg, language: 'English', history })
      setMessages(prev => [...prev, { role: 'ai', medical: data.medical, herbal: data.herbal }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I could not process that.' }])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col chat-panel">
      <div className="bg-white rounded-2xl shadow flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">💬 AI Doctor Chat</h2>
          <p className="text-sm text-slate-500">Ask any health-related question</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start w-full'}`}>
              {m.role === 'user' ? (
                <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-none text-sm bg-blue-600 text-white">
                  {m.text}
                </div>
              ) : (
                <AiMessage m={m} />
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-none text-slate-500 text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type your health question..." className="flex-1 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          <button onClick={send} disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
