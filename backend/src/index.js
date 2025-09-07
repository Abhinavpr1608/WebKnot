import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import eventsRouter from './routes/events.js';
import studentsRouter from './routes/students.js';
import actionsRouter from './routes/actions.js';
import reportsRouter from './routes/reports.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'campus-events-backend' });
});

app.use('/events', eventsRouter);
app.use('/students', studentsRouter);
app.use('/', actionsRouter);
app.use('/reports', reportsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
