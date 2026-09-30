import { useState } from "react";
import "./App.css";

const initialStudents = [
  {
    name: "Aarav Sen",
    roll: "CSE-2401",
    department: "Computer Science",
    semester: 4,
    cgpa: 9.2,
    photo: "photo-1534528741775-53994a69daeb",
  },
  {
    name: "Diya Mukherjee",
    roll: "ECE-2318",
    department: "Electronics",
    semester: 5,
    cgpa: 8.7,
    photo: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Ishaan Roy",
    roll: "CSE-2332",
    department: "Computer Science",
    semester: 5,
    cgpa: 9.6,
    photo: "photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Mira Das",
    roll: "IT-2411",
    department: "Information Technology",
    semester: 3,
    cgpa: 8.9,
    photo: "photo-1531123897727-8f129e1688ce",
  },
  {
    name: "Kabir Bose",
    roll: "ME-2225",
    department: "Mechanical",
    semester: 6,
    cgpa: 7.9,
    photo: "photo-1517841905240-472988babdf9",
  },
  {
    name: "Naina Ghosh",
    roll: "CSE-2209",
    department: "Computer Science",
    semester: 6,
    cgpa: 9.1,
    photo: "photo-1544005313-94ddf0286df2",
  },
];

function Header({ count }) {
  return (
    <header className="app-header">
      <a className="brand" href="#top">
        Campus<span> /</span> People
      </a>
      <span className="term">DIRECTORY · SPRING 2026</span>
      <span className="student-total">{count} STUDENTS</span>
    </header>
  );
}

function StudentCard({ student, rank }) {
  return (
    <article className="student-card">
      <div className="card-top">
        <span>0{rank}</span>
        <span className="cgpa">
          {student.cgpa.toFixed(1)} <small>CGPA</small>
        </span>
      </div>
      <img
        className="student-photo"
        src={`https://images.unsplash.com/${student.photo}?auto=format&fit=crop&crop=faces&w=480&q=85`}
        alt={`${student.name} portrait`}
      />
      <h2>{student.name}</h2>
      <p className="roll-number">{student.roll}</p>
      <dl>
        <div>
          <dt>Department</dt>
          <dd>{student.department}</dd>
        </div>
        <div>
          <dt>Semester</dt>
          <dd>
            {student.semester}
            <sup>th</sup>
          </dd>
        </div>
      </dl>
    </article>
  );
}

function StudentList({ students }) {
  return (
    <section className="student-grid" aria-label="Student list">
      {students.map((student, index) => (
        <StudentCard key={student.roll} student={student} rank={index + 1} />
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <span>DEPARTMENT REGISTRY</span>
      <span>Updated 29 September 2026</span>
    </footer>
  );
}

export default function App() {
  const [students] = useState(initialStudents);
  const [descending, setDescending] = useState(true);
  const orderedStudents = [...students].sort((first, second) =>
    descending ? second.cgpa - first.cgpa : first.cgpa - second.cgpa,
  );
  return (
    <main className="students-app" id="top">
      <Header count={students.length} />
      <section className="student-heading">
        <div>
          <p className="kicker">STUDENT INFORMATION</p>
          <h1>
            Good work
            <br />
            <em>starts together.</em>
          </h1>
        </div>
        <p className="heading-note">
          A closer look at the people
          <br />
          learning alongside us.
        </p>
      </section>
      <div className="student-toolbar">
        <span>Showing all students</span>
        <button
          type="button"
          className="sort-button"
          onClick={() => setDescending(!descending)}
        >
          CGPA {descending ? "↓" : "↑"}{" "}
          <span>{descending ? "Highest first" : "Lowest first"}</span>
        </button>
      </div>
      <StudentList students={orderedStudents} />
      <Footer />
    </main>
  );
}
