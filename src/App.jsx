import { useState, useEffect } from "react";
import axios from "axios";
const API_URL =
 import.meta.env.VITE_API_URL || "https://mern-zeta-jade.vercel.app/students";
function App() {
 const [name, setName] = useState("");
 const [course, setCourse] = useState("");
 const [age, setAge] = useState("");
 const [students, setStudents] = useState([]);
 const [editingId, setEditingId] = useState(null);
 const getStudents = async () => {
   const response = await axios.get(API_URL);
   setStudents(response.data);
 };
 useEffect(() => {
   getStudents();
 }, []);
 const saveStudent = async () => {
   if (editingId) {
     await axios.put(`${API_URL}/${editingId}`, {
       name,
       course,
       age,
     });
     setEditingId(null);
   } else {
     await axios.post(API_URL, {
       name,
       course,
       age,
     });
   }
   setName("");
   setCourse("");
   setAge("");
   getStudents();
 };
 const editStudent = (student) => {
   setName(student.name);
   setCourse(student.course);
   setAge(student.age);
   setEditingId(student._id);
 };
 const deleteStudent = async (id) => {
   await axios.delete(`${API_URL}/${id}`);
   getStudents();
 };
 return (
<div>
<h1>Student Management System</h1>
<h2>{editingId ? "Edit Student" : "Add Student"}</h2>
<input
       placeholder="Name"
       value={name}
       onChange={(e) => setName(e.target.value)}
     />
<br />
<br />
<input
       placeholder="Course"
       value={course}
       onChange={(e) => setCourse(e.target.value)}
     />
<br />
<br />
<input
       placeholder="Age"
       value={age}
       onChange={(e) => setAge(e.target.value)}
     />
<br />
<br />
<button onClick={saveStudent}>
       {editingId ? "Update Student" : "Add Student"}
</button>
<h2>Students</h2>
     {students.map((student) => (
<div key={student._id}>
<p>Name: {student.name}</p>
<p>Course: {student.course}</p>
<p>Age: {student.age}</p>
<button onClick={() => editStudent(student)}>
           Edit
</button>
<button onClick={() => deleteStudent(student._id)}>
           Delete
</button>
<hr />
</div>
     ))}
</div>
 );
}
export default App;