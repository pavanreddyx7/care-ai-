import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import twilio from 'twilio';
import cron from 'node-cron';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
import cors from 'cors';
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : true,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// --- FIREBASE ADMIN ---
let adminDb = null;
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
  adminDb = admin.firestore();
  console.log('✅ Firebase Admin configured');
} catch (e) {
  console.warn('⚠️  Firebase Admin not configured — history & reminders cron disabled');
}

// --- GEMINI AI ---
const API_KEY = process.env.GEMINI_API_KEY || '';
let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  console.log('✅ Gemini AI configured');
} else {
  console.warn('⚠️  No GEMINI_API_KEY — Demo Mode');
}

const DEMO = JSON.stringify({
  disease: 'Viral Fever (Demo)',
  description: 'Demo mode. Set GEMINI_API_KEY in backend/.env for real AI.',
  medicine: '• **Paracetamol**: 500mg every 6 hours.\n• **Vitamin C**: 1 tablet daily.',
  precautions: '• Rest well.\n• Stay hydrated.',
  workouts: '• Light walking only.',
  diet: '• Eat: **Khichdi**, **Soup**\n• Avoid: Cold water, oily food'
});

async function generateAI(sysPrompt, userPrompt) {
  if (!genAI) return DEMO;
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: sysPrompt,
      generationConfig: { responseMimeType: 'application/json' }
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  } catch (e) {
    console.error('AI Error:', e.message);
    return DEMO;
  }
}

function parseAI(text) {
  let t = text.replace(/```json|```/g, '').trim();
  if (t.includes('{')) t = t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1);
  return JSON.parse(t);
}

// --- TWILIO ---
const twilioClient = (process.env.TWILIO_SID && process.env.TWILIO_TOKEN)
  ? twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
  : null;

if (twilioClient) console.log('✅ Twilio configured');
else console.warn('⚠️  No Twilio credentials — reminders will log only');

async function sendReminderSMS(to, medicine) {
  if (!twilioClient) { console.log(`📱 [SMS] ${to}: Take ${medicine}`); return; }
  try {
    await twilioClient.messages.create({
      body: `💊 CareAI Reminder: Time to take your ${medicine}! Stay healthy.`,
      from: process.env.TWILIO_PHONE, to
    });
    console.log(`✅ SMS sent to ${to}`);
  } catch (e) { console.error('SMS error:', e.message); }
}

async function makeReminderCall(to, medicine) {
  if (!twilioClient) { console.log(`📞 [Call] ${to}: Take ${medicine}`); return; }
  try {
    await twilioClient.calls.create({
      twiml: `<Response><Say voice="alice">Hello! This is Care AI. It is time to take your ${medicine}. Please take your medication now. Stay healthy!</Say></Response>`,
      from: process.env.TWILIO_PHONE, to
    });
    console.log(`✅ Call to ${to}`);
  } catch (e) { console.error('Call error:', e.message); }
}

// --- CRON: Check reminders every minute (reads from Firestore) ---
cron.schedule('* * * * *', async () => {
  if (!adminDb) return;
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  try {
    const snap = await adminDb.collection('reminders').where('active', '==', true).get();
    for (const docSnap of snap.docs) {
      const r = docSnap.data();
      const times = Array.isArray(r.times) ? r.times : [];
      if (times.includes(timeStr) && r.phone) {
        console.log(`⏰ Reminder: ${r.medicine} → ${r.phone} at ${timeStr}`);
        await sendReminderSMS(r.phone, r.medicine);
        await makeReminderCall(r.phone, r.medicine);
      }
    }
  } catch (e) { console.error('Cron error:', e.message); }
});

// --- MEDICAL ENGINE ---
const EMERGENCY = {
  critical: ['chest pain', 'heart attack', 'cardiac', 'stroke', 'paralysis', 'unconscious', 'seizure', 'severe bleeding', 'vomiting blood'],
  urgent: ['difficulty breathing', 'shortness of breath', 'severe headache', 'suicide', 'kill myself']
};
const HERBAL = {
  fever: 'Ginger tea with Tulsi and honey.',
  cold: 'Warm turmeric milk before bed.',
  cough: 'Honey and black pepper mixture.',
  headache: 'Peppermint oil on temples.',
  stomach: 'Ajwain with warm water.',
  acidity: 'Fennel seeds after meals.',
  stress: 'Ashwagandha in warm milk.',
  insomnia: 'Chamomile tea or warm milk with nutmeg.'
};

function detectEmergency(symptoms) {
  const text = symptoms.join(' ').toLowerCase();
  for (const [severity, words] of Object.entries(EMERGENCY))
    for (const w of words)
      if (text.includes(w)) return { emergency: true, keyword: w, severity };
  return { emergency: false };
}

function analyzeVitals(v) {
  const warn = [];
  let t = parseFloat(v.temperature || 0);
  const bp = parseInt(v.systolic_bp || 0), hr = parseInt(v.heart_rate || 0), spo2 = parseInt(v.spo2 || 0);
  if (t > 0 && t < 50) t = t * 9 / 5 + 32;
  if (t > 102) warn.push('High Fever (>102°F).');
  else if (t > 100.4) warn.push('Mild Fever.');
  if (bp > 160) warn.push('Hypertensive Crisis.');
  else if (bp > 140) warn.push('High Blood Pressure.');
  else if (bp > 0 && bp < 90) warn.push('Low Blood Pressure.');
  if (hr > 120) warn.push('Tachycardia.');
  else if (hr > 0 && hr < 50) warn.push('Bradycardia.');
  if (spo2 > 0 && spo2 < 92) warn.push('Low Oxygen Levels (<92%).');
  return warn;
}

function getHerbal(symptoms) {
  const text = symptoms.join(' ').toLowerCase();
  return Object.entries(HERBAL).filter(([k]) => text.includes(k)).map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`);
}

// --- RECOMMEND ---
app.post('/api/recommend', async (req, res) => {
  const { symptoms = [], vitals = {}, history = [], age = 30, gender = 'Not Specified', language = 'English', user_id } = req.body;

  const { emergency, keyword } = detectEmergency(symptoms);
  if (emergency) return res.json({ disease: `EMERGENCY: ${keyword.toUpperCase()} DETECTED`, description: 'Call emergency services immediately.', medicine: 'Do not self-medicate. Call 108.', diet: 'N/A', workouts: 'Rest.', precautions: 'Go to nearest hospital.', is_emergency: true });

  const vitalWarn = analyzeVitals(vitals);
  const herbal = getHerbal(symptoms);
  const vitalText = vitalWarn.join(' ') || 'Normal';
  const histText = history.join(', ') || 'None';

  let final = { disease: 'Analysis Incomplete', description: 'AI unavailable.', medicine: 'Consult Doctor', diet: 'Healthy Diet', workouts: 'Rest', precautions: 'See a doctor', is_emergency: false };
  try {
    Object.assign(final, parseAI(await generateAI(
      `You are a medical AI. Respond in ${language}. Return strictly valid JSON.`,
      `Patient: ${age}yr ${gender}. History: ${histText}. Symptoms: ${symptoms.join(', ')}. Vitals: ${vitalText}.\nReturn JSON: {"disease":"...","description":"...","medicine":"• **MedName**: dosage\\n...","precautions":"• ...","workouts":"• ...","diet":"• Eat: **Food**\\n• Avoid: ..."}\nTranslate all values to ${language}. Bold medicine/food names with **.`
    )));
  } catch (e) { console.error('Parse:', e.message); }

  if (vitalWarn.length) final.description += `\n\nVITALS ALERT: ${vitalText}`;
  if (herbal.length) final.medicine += `\n\nHERBAL: ${herbal.join(' | ')}`;
  if (history.length) final.description += `\n\nHistory: ${histText}`;

  if (user_id && adminDb) {
    try {
      await adminDb.collection('history').doc(user_id).collection('records').add({
        disease: final.disease, description: final.description,
        medicine: final.medicine, diet: final.diet,
        date: new Date().toISOString()
      });
    } catch (e) { console.error('Save history:', e.message); }
  }
  res.json(final);
});

// --- CHAT ---
app.post('/api/chat', async (req, res) => {
  const { query, image, language = 'English', history = [] } = req.body;
  const histText = history.map(h => `User: ${h.user}\nAI: ${h.ai}`).join('\n') || 'No previous context.';

  if (image) {
    if (!genAI) return res.json({ medical: 'Vision requires API key.', herbal: 'N/A' });
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent([
        `You are an expert AI Doctor. Language: ${language}. Analyze this medical image and return JSON with two keys: "medical" (detailed observations, diagnosis, recommendations) and "herbal" (home/herbal remedies). Be specific and detailed.`,
        { inlineData: { mimeType: 'image/jpeg', data: image.split(',')[1] } }
      ]);
      return res.json(parseAI(result.response.text()));
    } catch (e) { return res.json({ medical: `Vision Error: ${e.message}`, herbal: 'N/A' }); }
  }

  try {
    const aiText = await generateAI(
      `You are a helpful AI Doctor. Always respond in ${language}. Return a JSON object with two keys: "medical" and "herbal". Both must contain real, specific, detailed advice.`,
      `Previous conversation:\n${histText}\n\nPatient question: "${query}"\n\nRespond with: {"medical": "specific medical advice, medicines with dosages, when to see a doctor", "herbal": "specific natural/herbal remedies"}`
    );
    res.json(parseAI(aiText));
  } catch { res.json({ medical: 'Could not process.', herbal: 'N/A' }); }
});

// --- REMINDERS: test only (CRUD is handled by frontend via Firestore) ---
app.post('/api/reminders/:id/test', async (req, res) => {
  if (!adminDb) return res.status(503).json({ error: 'Firebase Admin not configured.' });
  try {
    const snap = await adminDb.collection('reminders').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Reminder not found.' });
    const r = snap.data();
    await sendReminderSMS(r.phone, r.medicine);
    await makeReminderCall(r.phone, r.medicine);
    res.json({ message: 'Test reminder sent' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- DOCTORS (location search) ---
app.post('/api/doctors', async (req, res) => {
  const { specialty, lat, lon, location } = req.body;
  let results = [];
  if (lat && lon) {
    try {
      const q = `[out:json];(node["amenity"~"hospital|clinic|doctors|pharmacy"](around:10000,${lat},${lon}););out center;`;
      const r = await axios.get('http://overpass-api.de/api/interpreter', { params: { data: q }, timeout: 15000 });
      results = r.data.elements.slice(0, 15).map(el => ({ name: el.tags?.name || 'Clinic', address: 'Nearby', rating: 'Verified', lat: el.lat, lon: el.lon }));
    } catch { }
  }
  if (!results.length) {
    try {
      results = JSON.parse((await generateAI('You are a location finder. Return valid JSON array only.', `Find 5 ${specialty} near ${location}. Format: [{"name":"X","address":"Y","rating":"4.5"}]`)).replace(/```json|```/g, '').trim());
    } catch { }
  }
  res.json({ result: results });
});

// --- DIET ---
app.post('/api/generate_diet', async (req, res) => {
  const { cuisine = 'Indian', type = 'Vegetarian', goal = 'Healthy Living', age = 30 } = req.body;
  try {
    let t = (await generateAI('You are a nutritionist. Return valid JSON array only, no extra text.', `7-day meal plan for ${age}yr, ${cuisine} cuisine, ${type} diet, goal: ${goal}. Return JSON array of 7 objects: [{"day":"Day 1","breakfast":"...","lunch":"...","snack":"...","dinner":"...","calories":"..."}]`)).replace(/```json|```/g, '').trim();
    if (t.includes('[')) t = t.slice(t.indexOf('['), t.lastIndexOf(']') + 1);
    res.json({ plan: JSON.parse(t) });
  } catch (e) { res.status(500).json({ error: 'Diet plan failed' }); }
});

// --- SAFETY ---
app.post('/api/check_safety', async (req, res) => {
  const { drug1, drug2 } = req.body;
  if (!drug1 || !drug2) return res.status(400).json({ error: 'Missing drug names' });
  try {
    res.json(parseAI(await generateAI('You are a pharmacist. Return strict JSON only.', `Interaction between "${drug1}" and "${drug2}". Return: {"status":"Safe|Caution|Danger","color":"green|yellow|red","interaction":"...","recommendation":"..."}`)));
  } catch { res.status(500).json({ error: 'Safety check failed' }); }
});

// --- PDF REPORT ---
app.post('/api/download_report', (req, res) => {
  const { disease, description, medicine, diet, workouts, precautions } = req.body;
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=CareAI_Report.pdf');
  doc.pipe(res);
  const clean = t => (t || 'N/A').replace(/\*\*/g, '').replace(/•/g, '\n-').replace(/[^\x00-\x7F]/g, '');
  doc.rect(0, 0, doc.page.width, 70).fill('#2563eb');
  doc.fillColor('white').fontSize(22).font('Helvetica-Bold').text('Care AI Health Report', 50, 22, { align: 'center' });
  doc.moveDown(2).fillColor('#111').fontSize(16).font('Helvetica-Bold').text(`Diagnosis: ${clean(disease)}`).moveDown(0.5);
  const section = (title, content) => {
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#2563eb').text(title).moveDown(0.2);
    doc.fontSize(11).font('Helvetica').fillColor('#334155').text(clean(content), { indent: 10 }).moveDown(0.7);
  };
  section('Overview', description);
  section('Medications', medicine);
  section('Diet Plan', diet);
  section('Workout', workouts);
  section('Precautions', precautions);
  doc.moveDown().fontSize(9).fillColor('#94a3b8').text('Disclaimer: AI-generated. Always consult a qualified doctor.', { align: 'center' });
  doc.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
