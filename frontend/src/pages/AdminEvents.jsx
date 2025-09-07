import React, { useEffect, useState } from 'react';
import { api } from '../api/client.js';
const TYPES = ['Workshop','Fest','Talk'];

export default function AdminEvents() {
  const [form, setForm] = useState({ title: '', description: '', type: 'Workshop', date: '', college_id: 1 });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = () => {
    api.get('/events').then(setEvents).catch(console.error);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/events', form);
      setForm({ title: '', description: '', type: 'Workshop', date: '', college_id: 1 });
      loadEvents();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-xl font-semibold mb-3">Create Event</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})}/>
          <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})}/>
          <div className="flex gap-3">
            <select className="border rounded px-3 py-2" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="border rounded px-3 py-2" type="datetime-local" value={form.date} onChange={e=>setForm({...form, date: e.target.value})}/>
          </div>
          <input className="w-full border rounded px-3 py-2" type="number" min="1" placeholder="College ID" value={form.college_id} onChange={e=>setForm({...form, college_id: Number(e.target.value)})}/>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? 'Saving...' : 'Create Event'}</button>
        </form>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Events</h2>
        <div className="space-y-3">
          {events.map(ev => (
            <div key={ev.id} className="border rounded p-3">
              <div className="font-semibold">{ev.title} <span className="text-xs text-gray-500">[{ev.type}]</span></div>
              <div className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()}</div>
              <div className="text-sm text-gray-600">College: {ev.college_name} (#{ev.college_id})</div>
              {ev.is_cancelled ? <div className="text-sm text-red-600">Cancelled</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
