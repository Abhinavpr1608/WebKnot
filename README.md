# Campus Event Management & Reporting System

This project is a basic event reporting system built using:

- Frontend: React + Tailwind (Vite)
- Backend: Node.js + Express
- Database: MySQL

It allows admins to create/manage events, students to register/attend/submit feedback, and admins to generate reports.

---

## Features

### Admin
- Create and manage events
- View reports with charts:
  - Total registrations per event
  - Attendance percentage
  - Average feedback score
  - Event popularity
  - Student participation
  - Top 3 most active students

### Students
- Register/login with student ID and email
- Browse, search, and filter events
- Register for events
- Mark attendance
- Submit feedback

---

## Database Schema

Tables used:
- colleges
- students
- events
- registrations
- attendance
- feedback

Each table has foreign keys to maintain relationships, and unique constraints prevent duplicates.

---

## API Endpoints

**Events**
- POST /events → Create event (Admin)
- GET /events → List/filter events

**Students**
- POST /students/register → Register student
- POST /students/login → Login student

**Actions**
- POST /register → Register for event
- POST /attendance → Mark attendance
- POST /feedback → Submit feedback

**Reports**
- GET /reports/event-popularity
- GET /reports/student-participation
- GET /reports/top-students
- GET /reports/event-metrics/:eventId

---

## How to Run

### Backend
```bash
cd backend
cp .env.example .env   # set database credentials
npm install
npm run db:setup       # create schema + seed data
npm run dev            # server on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # app on http://localhost:5173
```

---

## Usage

- Admin Login → /admin/login (any credentials)  
- Admin Dashboard → /admin (reports)  
- Admin Events → /admin/events (create events)  
- Student Login/Register → /student/login  
- Student Events → /student (browse, register, check-in, feedback)

---

## Notes

- Admin authentication is simplified for prototype.
- Students login with student_id and email.
- Feedback is limited to one per student per event (updated if resubmitted).
- System is designed to scale across colleges using college_id foreign key.
