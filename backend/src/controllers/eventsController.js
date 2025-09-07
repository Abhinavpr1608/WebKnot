import pool from '../db/pool.js';

const ALLOWED_TYPES = new Set(['Workshop','Fest','Talk']);

export async function createEvent(req, res) {
  try {
    const { title, description, type, date, college_id } = req.body;
    if (!title || !type || !date || !college_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!ALLOWED_TYPES.has(type)) {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const [collegeRows] = await pool.query('SELECT id FROM colleges WHERE id = ?', [college_id]);
    if (collegeRows.length === 0) {
      return res.status(400).json({ error: 'Invalid college_id' });
    }

    const [result] = await pool.query(
      'INSERT INTO events (title, description, type, date, college_id) VALUES (?, ?, ?, ?, ?)',
      [title, description ?? '', type, date, college_id]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description: description ?? '',
      type,
      date,
      college_id,
      is_cancelled: 0
    });
  } catch (err) {
    console.error('createEvent error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function listEvents(req, res) {
  try {
    const { type, college_id, q, dateFrom, dateTo } = req.query;
    const params = [];
    const where = ['1=1'];

    if (type) {
      where.push('e.type = ?');
      params.push(type);
    }
    if (college_id) {
      where.push('e.college_id = ?');
      params.push(college_id);
    }
    if (q) {
      where.push('(e.title LIKE ? OR e.description LIKE ?)');
      params.push(`%${q}%`, `%${q}%`);
    }
    if (dateFrom) {
      where.push('e.date >= ?');
      params.push(dateFrom);
    }
    if (dateTo) {
      where.push('e.date <= ?');
      params.push(dateTo);
    }

    const sql = `
      SELECT e.id, e.title, e.description, e.type, e.date, e.college_id, e.is_cancelled, c.name AS college_name
      FROM events e
      JOIN colleges c ON c.id = e.college_id
      WHERE ${where.join(' AND ')}
      ORDER BY e.date DESC
    `;

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('listEvents error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
