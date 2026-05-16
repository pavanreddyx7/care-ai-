import { useState } from 'react'
import axios from 'axios'

const SPECIALTIES = ['General Physician','Cardiologist','Dermatologist','Orthopedic','Neurologist','Gynecologist','Pediatrician','ENT Specialist','Ophthalmologist','Dentist','Psychiatrist','Pharmacy']

export default function Maps() {
  const [specialty, setSpecialty] = useState('General Physician')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [userCoords, setUserCoords] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [gpsError, setGpsError] = useState('')

  async function findWithGPS() {
    setLoading(true); setResults([]); setGpsError(''); setSelectedPlace(null)
    if (!navigator.geolocation) {
      setGpsError('Geolocation not supported. Enter location manually.')
      setLoading(false); return
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        setUserCoords({ lat, lon })
        try {
          const { data } = await axios.post('/api/doctors', { specialty, lat, lon })
          setResults(data.result || [])
          if (!data.result?.length) setGpsError('No results nearby. Try entering a location manually.')
        } catch { setGpsError('Search failed. Try entering location manually.') }
        setLoading(false)
      },
      (err) => { setGpsError(`GPS failed: ${err.message}. Enter your location below.`); setLoading(false) },
      { timeout: 10000 }
    )
  }

  async function findByText() {
    if (!location.trim()) return alert('Enter a location first.')
    setLoading(true); setResults([]); setGpsError(''); setSelectedPlace(null)
    try {
      const { data } = await axios.post('/api/doctors', { specialty, location })
      setResults(data.result || [])
      if (!data.result?.length) setGpsError('No results found.')
    } catch { setGpsError('Search failed.') }
    setLoading(false)
  }

  // Google Maps embed URL
  function getGoogleMapEmbed(place) {
    if (place?.lat && place?.lon)
      return `https://maps.google.com/maps?q=${place.lat},${place.lon}&z=16&output=embed`
    if (userCoords)
      return `https://maps.google.com/maps?q=${userCoords.lat},${userCoords.lon}&z=14&output=embed`
    if (location)
      return `https://maps.google.com/maps?q=${encodeURIComponent(specialty + ' ' + location)}&output=embed`
    return null
  }

  // Google Maps direction URL
  function getDirectionsUrl(place) {
    if (place?.lat && place?.lon) {
      const origin = userCoords ? `${userCoords.lat},${userCoords.lon}` : ''
      return `https://www.google.com/maps/dir/${origin}/${place.lat},${place.lon}`
    }
    return `https://www.google.com/maps/dir//${encodeURIComponent(place?.name)}`
  }

  // Google Maps open URL
  function getOpenUrl(place) {
    if (place?.lat && place?.lon)
      return `https://www.google.com/maps?q=${place.lat},${place.lon}`
    return `https://www.google.com/maps/search/${encodeURIComponent(place?.name)}`
  }

  const mapUrl = getGoogleMapEmbed(selectedPlace)

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">

      {/* Search Panel */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">📍 Find Doctors</h2>
        <p className="text-slate-500 text-sm mb-5">Locate nearby healthcare providers on Google Maps</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Specialty</label>
            <select value={specialty} onChange={e => setSpecialty(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">City / Area</label>
            <input value={location} onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && findByText()}
              placeholder="e.g. Bangalore, Koramangala"
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={findWithGPS} disabled={loading}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 transition">
            📡 {loading ? 'Searching...' : 'Use My GPS Location'}
          </button>
          <button onClick={findByText} disabled={loading}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:opacity-60 transition">
            🔍 Search by City
          </button>
        </div>

        {gpsError && (
          <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">{gpsError}</p>
        )}
      </div>

      {/* Map + Results side by side */}
      {(mapUrl || results.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 items-start">

          {/* Google Map Embed */}
          {mapUrl && (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <p className="font-semibold text-slate-700 text-sm truncate">
                  {selectedPlace ? `📍 ${selectedPlace.name}` : '📍 Area Map'}
                </p>
                {selectedPlace && (
                  <a href={getDirectionsUrl(selectedPlace)} target="_blank" rel="noreferrer"
                    className="shrink-0 ml-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-1">
                    🚗 Directions
                  </a>
                )}
              </div>
              <iframe
                key={mapUrl}
                src={mapUrl}
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              />
            </div>
          )}

          {/* Results List */}
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-bold text-slate-800 mb-3 text-sm">
              {results.length > 0 ? `Found ${results.length} results` : 'Results'}
            </p>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {results.map((r, i) => (
                <div key={i}
                  className={`rounded-xl border p-3 transition cursor-pointer ${selectedPlace?.name === r.name ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}
                  onClick={() => setSelectedPlace(r)}>

                  {/* Name + Rating */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-semibold text-slate-800 text-sm leading-snug">{r.name}</p>
                    <span className="shrink-0 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{r.rating}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{r.address}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedPlace(r) }}
                      className="flex-1 text-xs bg-slate-100 text-slate-700 py-1.5 rounded-lg font-semibold hover:bg-slate-200 transition">
                      🗺 View Map
                    </button>
                    <a
                      href={getDirectionsUrl(r)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 text-xs bg-blue-600 text-white py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition text-center">
                      🚗 Directions
                    </a>
                    <a
                      href={getOpenUrl(r)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 text-xs bg-green-600 text-white py-1.5 rounded-lg font-semibold hover:bg-green-700 transition text-center">
                      📍 Open Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
