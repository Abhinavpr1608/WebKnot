import pool from '../db/pool.js';

export async function registerForEvent(req, res) {
  try {
    const { student_id, event_id } = req.body;
    if (!student_id || !event_id) {
      return res.status(400).json({ error: 'Missing student_id or event_id' });
    }

    const [eventRows] = await pool.query('SELECT id, is_cancelled FROM events WHERE id = ?', [event_id]);
    const event = eventRows[0];
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.is_cancelled) return res.status(400).json({ error: 'Event is cancelled' });

    const [studentRows] = await pool.query('SELECT id FROM students WHERE id = ?', [student_id]);
    const student = studentRows[0];
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await pool.query(
      'INSERT INTO registrations (event_id, student_id) VALUES (?, ?)',
      [event_id, student_id]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Already registered' });
    }
    console.error('registerForEvent error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function markAttendance(req, res) {
  try {
    const { student_id, event_id } = req.body;
    if (!student_id || !event_id) {
      return res.status(400).json({ error: 'Missing student_id or event_id' });
    }
    const [eventRows] = await pool.query('SELECT id, is_cancelled FROM events WHERE id = ?', [event_id]);
    const event = eventRows[0];
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.is_cancelled) return res.status(400).json({ error: 'Event is cancelled' });

    await pool.query(
      'INSERT INTO attendance (event_id, student_id, attended_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE attended_at = NOW()',
      [event_id, student_id]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('markAttendance error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function submitFeedback(req, res) {
  try {
    const { student_id, event_id, rating, comment } = req.body;
    if (!student_id || !event_id || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Missing student_id, event_id, or rating' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be 1-5' });
    }

    await pool.query(
      `INSERT INTO feedback (event_id, student_id, rating, comment, created_at)
        VALUES (?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment), created_at = NOW()`,
      [event_id, student_id, rating, comment ?? null]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('submitFeedback error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
