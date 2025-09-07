import React, { useState } from 'react';
export default function EventCard({ event, onRegister, onAttend, onFeedback }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  return (
    <div className="border rounded p-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{event.title} <span className="text-xs text-gray-500">[{event.type}]</span></h3>
        <span className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{event.description}</p>
      <div className="text-xs text-gray-500 mt-1">College #{event.college_id} - {event.college_name}</div>
      {event.is_cancelled ? <div className="text-sm text-red-600 mt-1">Cancelled</div> : (
        <div className="mt-3 space-x-2">
          <button onClick={onRegister} className="bg-blue-600 text-white px-3 py-1 rounded">Register</button>
          <button onClick={onAttend} className="bg-green-600 text-white px-3 py-1 rounded">Check-in</button>
        </div>
      )}
      <div className="mt-3 grid gap-2 md:grid-cols-[120px_1fr_auto]">
        <select className="border rounded px-2 py-1" value={rating} onChange={e=>setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
        </select>
        <input className="border rounded px-2 py-1" placeholder="Comment (optional)" value={comment} onChange={e=>setComment(e.target.value)} />
        <button onClick={()=>onFeedback({ rating, comment })} className="bg-amber-500 text-white px-3 py-1 rounded">Feedback</button>
      </div>
    </div>
  );
}
