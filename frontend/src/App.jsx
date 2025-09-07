import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminEvents from './pages/AdminEvents.jsx';
import StudentAuth from './pages/StudentAuth.jsx';
import StudentEvents from './pages/StudentEvents.jsx';

function Nav() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('admin') === '1';
  const student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student')) : null;
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-blue-600">Campus Events</Link>
        <div className="space-x-4">
          <Link className="text-sm text-gray-700 hover:text-blue-600" to="/student">Student</Link>
          <Link className="text-sm text-gray-700 hover:text-blue-600" to="/admin">Admin</Link>
          {isAdmin ? (
            <button onClick={() => { localStorage.removeItem('admin'); navigate('/admin/login'); }} className="text-sm text-red-600">Logout Admin</button>
          ) : (
            <Link className="text-sm text-gray-700 hover:text-blue-600" to="/admin/login">Admin Login</Link>
          )}
          {student ? (
            <button onClick={() => { localStorage.removeItem('student'); navigate('/student'); }} className="text-sm text-red-600">Logout {student.name}</button>
          ) : (
            <Link className="text-sm text-gray-700 hover:text-blue-600" to="/student/login">Student Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('admin') === '1';
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/student" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
          <Route path="/student/login" element={<StudentAuth />} />
          <Route path="/student" element={<StudentEvents />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
