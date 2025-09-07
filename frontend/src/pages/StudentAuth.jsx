import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';

export default function StudentAuth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ student_id:'', name:'', email:'', college_id: 1 });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        const s = await api.post('/students/register', form);
        localStorage.setItem('student', JSON.stringify(s));
      } else {
        const s = await api.post('/students/login', { email: form.email, student_id: form.student_id });
        localStorage.setItem('student', JSON.stringify(s));
      }
      navigate('/student');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="flex gap-4 mb-4">
        <button className={mode==='login'?'font-semibold text-blue-600':''} onClick={()=>setMode('login')}>Login</button>
        <button className={mode==='register'?'font-semibold text-blue-600':''} onClick={()=>setMode('register')}>Register</button>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full border px-3 py-2 rounded" placeholder="Student ID" value={form.student_id} onChange={e=>setForm({...form, student_id:e.target.value})}/>
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        {mode==='register' && ( <>
          <input className="w-full border px-3 py-2 rounded" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input className="w-full border px-3 py-2 rounded" type="number" min="1" placeholder="College ID" value={form.college_id} onChange={e=>setForm({...form, college_id:Number(e.target.value)})}/>
        </> )}
        <button className="w-full bg-blue-600 text-white py-2 rounded">{mode==='register'?'Register':'Login'}</button>
      </form>
    </div>
  );
}
