USE campus_events;

INSERT INTO colleges (name) VALUES ('Engineering College'), ('Business School'), ('Arts College');

INSERT INTO students (student_uid, name, email, college_id) VALUES
('S1001','Alice Johnson','alice@example.com',1),
('S1002','Bob Smith','bob@example.com',1),
('S1003','Eve Turner','eve@example.com',1),
('S2001','Carol White','carol@example.com',2),
('S3001','Dave Brown','dave@example.com',3);

INSERT INTO events (title, description, type, date, college_id) VALUES
('Intro to React','Workshop on React basics','Workshop', DATE_ADD(NOW(), INTERVAL 7 DAY), 1),
('Annual Tech Fest','Campus-wide fest with booths','Fest', DATE_ADD(NOW(), INTERVAL 15 DAY), 1),
('Leadership Talk','Guest lecture by industry leader','Talk', DATE_ADD(NOW(), INTERVAL 3 DAY), 2),
('Art Showcase','Student art exhibition','Fest', DATE_ADD(NOW(), INTERVAL 10 DAY), 3),
('Advanced SQL','Deep dive into SQL techniques','Workshop', DATE_ADD(NOW(), INTERVAL 20 DAY), 1),
('Design Thinking','Hands-on design workshop','Workshop', DATE_ADD(NOW(), INTERVAL 12 DAY), 2);

-- registrations
INSERT INTO registrations (event_id, student_id) VALUES
(1,1),(1,2),(1,3),
(2,1),(2,4),
(3,2),(3,4),
(4,5),
(5,1),(5,2),(5,3),
(6,4);

-- attendance (partial)
INSERT INTO attendance (event_id, student_id) VALUES
(1,1),(1,2),
(3,2),
(5,1),(5,3);

-- feedback
INSERT INTO feedback (event_id, student_id, rating, comment) VALUES
(1,1,5,'Great intro'), (1,2,4,'Good session'),
(3,2,3,'Informative'), (5,1,4,'Very useful');
