-- ==========================================
-- 1. CREATE TABLE STATEMENTS
-- ==========================================

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL  -- UNIQUE prevents duplicate emails
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,
    -- Foreign keys link this table to the other two
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    -- This rule prevents the same student from enrolling in the same course twice
    UNIQUE(student_id, course_id) 
);

-- ==========================================
-- 2. INSERT SAMPLE DATA
-- ==========================================

-- Adding 4 students (We add a 4th one so Query 4 has someone with no enrolments!)
INSERT INTO students (name, email) VALUES 
('Alice Smith', 'alice@school.com'),
('Bob Jones', 'bob@school.com'),
('Charlie Brown', 'charlie@school.com'),
('Diana Prince', 'diana@school.com'); 

-- Adding 3 courses
INSERT INTO courses (title, description) VALUES 
('Math 101', 'Introduction to Algebra'),
('History 101', 'World History Overview'),
('Science 101', 'Basic Physics and Chemistry');

-- Adding 5 enrolments
INSERT INTO enrolments (student_id, course_id, grade) VALUES 
(1, 1, 'A'),   -- Alice in Math
(1, 2, 'B'),   -- Alice in History
(2, 1, 'C'),   -- Bob in Math
(2, 3, 'B'),   -- Bob in Science
(3, 3, 'A');   -- Charlie in Science
-- (Notice Diana has no enrolments, which is perfect for Query 4)

-- ==========================================
-- 3. THE FIVE REQUIRED QUERIES
-- ==========================================

-- Query 1: All courses for one student (by name)
SELECT c.title, e.grade 
FROM students s
JOIN enrolments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.name = 'Alice Smith';

-- Query 2: All students on one course
SELECT s.name, e.grade 
FROM courses c
JOIN enrolments e ON c.id = e.course_id
JOIN students s ON e.student_id = s.id
WHERE c.title = 'Math 101';

-- Query 3: The number of students per course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON c.id = e.course_id
GROUP BY c.id, c.title;

-- Query 4: Students who have no enrolments
SELECT s.name 
FROM students s
LEFT JOIN enrolments e ON s.id = e.student_id
WHERE e.student_id IS NULL;

-- Query 5: Update one enrolment's grade (Let's change Bob's Math grade to 'A-')
UPDATE enrolments 
SET grade = 'A-' 
WHERE student_id = 2 AND course_id = 1;