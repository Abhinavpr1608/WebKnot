import pool from '../db/pool.js';

export async function registerStudent(req, res) {
  try {
    const { student_id, name, email, college_id } = req.body;
    if (!student_id || !name || !email || !college_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const [college] = await pool.query('SELECT id FROM colleges WHERE id = ?', [college_id]);
    if (college.length === 0) {
      return res.status(400).json({ error: 'Invalid college_id' });
    }
    const [result] = await pool.query(
      'INSERT INTO students (student_uid, name, email, college_id) VALUES (?, ?, ?, ?)',
      [student_id, name, email, college_id]
    );
    res.status(201).json({ id: result.insertId, student_id, name, email, college_id });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Student already exists (email or student_id)' });
    }
    console.error('registerStudent error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function loginStudent(req, res) {
  try {
    const { email, student_id } = req.body;
    if (!email || !student_id) {
      return res.status(400).json({ error: 'Missing email or student_id' });
    }
    const [rows] = await pool.query(
      'SELECT id, student_uid AS student_id, name, email, college_id FROM students WHERE email = ? AND student_uid = ?',
      [email, student_id]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('loginStudent error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
