import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import {
  collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc, getDoc, setDoc
} from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function DoctorChat() {
  const { chatId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [myName, setMyName] = useState('')
  const [otherName, setOtherName] = useState(location.state?.doctorName || 'Doctor')
  const bottomRef = useRef(null)
  const uid = auth.currentUser?.uid

  useEffect(() => {
    getDoc(doc(db, 'users', uid)).then(snap => {
      if (snap.exists()) setMyName(snap.data().name || auth.currentUser?.email)
    })
  }, [uid])

  useEffect(() => {
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'))
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [chatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!text.trim()) return
    const msgText = text; setText('')
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      sender: uid,
      senderName: myName || auth.currentUser?.email,
      text: msgText,
      timestamp: serverTimestamp()
    })
    await setDoc(doc(db, 'chats', chatId), { lastMessage: msgText, lastAt: new Date().toISOString() }, { merge: true })
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col doc-chat-panel">
      <div className="bg-white rounded-t-2xl shadow-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600 transition text-xl font-bold px-1 shrink-0">←</button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
          {otherName[0]?.toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-slate-800 truncate">Dr. {otherName}</p>
          <p className="text-xs text-green-500 font-medium">Active</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            <p className="text-3xl mb-2">💬</p>
            <p>Start the conversation</p>
          </div>
        )}
        {messages.map(m => {
          const isMe = m.sender === uid
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-slate-800 shadow rounded-bl-sm'}`}>
                {!isMe && <p className="text-xs font-bold text-blue-500 mb-0.5">{m.senderName}</p>}
                <p className="text-sm">{m.text}</p>
                {m.timestamp && (
                  <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                    {m.timestamp.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white rounded-b-2xl shadow-sm border-t px-4 py-3 flex gap-3 items-center">
        <input value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
        <button onClick={send} disabled={!text.trim()}
          className="px-5 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition">
          Send
        </button>
      </div>
    </div>
  )
}
