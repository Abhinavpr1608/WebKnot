import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const COLORS = ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6'];

export default function AdminDashboard() {
  const [popularity, setPopularity] = useState([]);
  const [participation, setParticipation] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/reports/event-popularity'),
      api.get('/reports/student-participation'),
      api.get('/reports/top-students')
    ]).then(([p, s, t]) => {
      setPopularity(p);
      setParticipation(s);
      setTop(t);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Link to="/admin/events" className="text-blue-600 hover:underline">Manage Events</Link>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Event Popularity (by registrations)</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={popularity.slice(0,8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registrations" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Top Students (attendance)</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="attended" data={top} nameKey="name" outerRadius={90} label>
                  {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Student Participation (events attended)</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={participation.slice(0,10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attended" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
