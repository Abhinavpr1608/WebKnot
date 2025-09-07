import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && code) {
      localStorage.setItem('admin','1');
      navigate('/admin');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Access Code" value={code} onChange={e=>setCode(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
