import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';
import EventCard from '../components/EventCard.jsx';
const TYPES = ['', 'Workshop','Fest','Talk'];

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student')) : null;

  const load = () => {
    const query = new URLSearchParams();
    if (q) query.set('q', q);
    if (type) query.set('type', type);
    api.get(`/events?${query.toString()}`).then(setEvents).catch(console.error);
  };

  useEffect(() => { load(); }, []);

  const act = async (action, payload) => {
    try {
      await api.post(`/${action}`, payload);
      alert(`${action} success`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-3 rounded shadow flex gap-2">
        <input className="border rounded px-3 py-2 w-full" placeholder="Search events..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border rounded px-3 py-2" value={type} onChange={e=>setType(e.target.value)}>
          {TYPES.map(t => <option key={t} value={t}>{t || 'All types'}</option>)}
        </select>
        <button onClick={load} className="bg-blue-600 text-white px-4 rounded">Filter</button>
      </div>
      {!student && <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded">Login as a student to register, check-in, and submit feedback.</div>}
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(ev => (
          <EventCard key={ev.id} event={ev} onRegister={() => { if (!student) return alert('Please login first.'); act('register', { student_id: student.id, event_id: ev.id }); }} onAttend={() => { if (!student) return alert('Please login first.'); act('attendance', { student_id: student.id, event_id: ev.id }); }} onFeedback={({ rating, comment }) => { if (!student) return alert('Please login first.'); act('feedback', { student_id: student.id, event_id: ev.id, rating, comment }); }} />
        ))}
      </div>
    </div>
  );
}
