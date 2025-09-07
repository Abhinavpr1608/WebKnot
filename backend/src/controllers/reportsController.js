import pool from '../db/pool.js';

export async function eventPopularity(req, res) {
  try {
    const { type } = req.query;
    const params = [];
    const where = ['e.is_cancelled = 0'];
    if (type) {
      where.push('e.type = ?');
      params.push(type);
    }

    const sql = `
      SELECT e.id, e.title, e.type, e.date, COUNT(r.id) AS registrations
      FROM events e
      LEFT JOIN registrations r ON r.event_id = e.id
      WHERE ${where.join(' AND ')}
      GROUP BY e.id
      ORDER BY registrations DESC, e.date DESC
    `;

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('eventPopularity error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function studentParticipation(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.student_uid AS student_id, COUNT(a.id) AS attended
       FROM students s
       LEFT JOIN attendance a ON a.student_id = s.id
       GROUP BY s.id
       ORDER BY attended DESC, s.name ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('studentParticipation error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function topStudents(req, res) {
  try {
    const limit = Number(req.query.limit ?? 3);
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.student_uid AS student_id, COUNT(a.id) AS attended
       FROM students s
       LEFT JOIN attendance a ON a.student_id = s.id
       GROUP BY s.id
       ORDER BY attended DESC, s.name ASC
       LIMIT ?`,
      [limit]
    );
    res.json(rows);
  } catch (err) {
    console.error('topStudents error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function eventMetrics(req, res) {
  try {
    const eventId = req.params.eventId;
    const [eventRows] = await pool.query('SELECT id, title FROM events WHERE id = ?', [eventId]);
    const event = eventRows[0];
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const [[regRow]] = await pool.query('SELECT COUNT(DISTINCT student_id) AS registrations FROM registrations WHERE event_id = ?', [eventId]);
    const [[attRow]] = await pool.query('SELECT COUNT(DISTINCT student_id) AS attended FROM attendance WHERE event_id = ?', [eventId]);
    const [[fbRow]] = await pool.query('SELECT AVG(rating) AS avg_rating FROM feedback WHERE event_id = ?', [eventId]);

    const registrations = Number(regRow.registrations ?? 0);
    const attended = Number(attRow.attended ?? 0);
    const attendance_percentage = registrations > 0 ? Math.round((attended / registrations) * 100) : 0;
    const average_feedback = fbRow.avg_rating !== null ? Number(fbRow.avg_rating).toFixed(2) : null;

    res.json({
      event_id: eventId,
      title: event.title,
      registrations,
      attended,
      attendance_percentage,
      average_feedback
    });
  } catch (err) {
    console.error('eventMetrics error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
