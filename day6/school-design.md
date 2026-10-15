# School Database Design

## Table Explanations

### Students Table
Stores information about students. Each student has a unique ID (primary key), a name, and an email address. The email is marked as `UNIQUE` to prevent duplicate student records and `NOT NULL` to ensure every student has contact information.

### Courses Table
Stores information about available courses. Each course has a unique ID (primary key), a title, and an optional description. The title is `NOT NULL` because every course must have a name.

### Enrolments Table
This is a **join table** (also called a junction or linking table) that connects students to courses. It contains:
- `student_id` (foreign key linking to students table)
- `course_id` (foreign key linking to courses table)
- `grade` (stores the student's grade in that course)

The combination of `student_id` and `course_id` is marked as `UNIQUE` to prevent the same student from enrolling in the same course twice.

## Relationships

### One-to-Many Relationships
- **One student can have many enrolments** (a student can take multiple courses)
- **One course can have many enrolments** (many students can take the same course)

### Many-to-Many Relationship
The relationship between **Students and Courses** is **many-to-many** because:
- One student can enroll in many courses
- One course can have many students

### Why a Join Table is Needed
A join table (`enrolments`) is necessary to implement a many-to-many relationship in a relational database. Without it, we would have to store multiple course IDs in a single student record (which violates database normalization rules) or duplicate student information for each course. The enrolments table also allows us to store additional data specific to the relationship, such as the `grade`.

## Index Recommendation

I would add an index on `enrolments.student_id`:

```sql
CREATE INDEX idx_enrolments_student ON enrolments(student_id);