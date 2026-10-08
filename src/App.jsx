import { useEffect, useState } from "react";
import axios from "axios";
function App() {
 const [students, setStudents] = useState([]);
 const [name, setName] = useState("");
 const [course, setCourse] = useState("");
 const [age, setAge] = useState("");
 const [Id, setId] = useState(null);
 useEffect(() => {
   axios.get("/api/students").then((response) => {
     setStudents(response.data);
   });
 }, []);
 function getStudents() {
   axios.get("/api/students").then((response) => {
     setStudents(response.data);
   });
 }
 function addStudent() {
   axios
     .post("/api/students", {
       name: name,
       course: course,
       age: age,
     })
     .then(() => {
       setName("");
       setCourse("");
       setAge("");
       getStudents();
     });
 }
 function editStudent(student) {
   setName(student.name);
   setCourse(student.course);
   setAge(student.age);
   setId(student._id);
 }
 function updateStudent() {
   axios
     .put("/api/students/" + Id, {
       name: name,
       course: course,
       age: age,
     })
     .then(() => {
       setName("");
       setCourse("");
       setAge("");
       setId(null);
       getStudents();
     });
 }
 function deleteStudent(id) {
   axios.delete("/api/students/" + id).then(() => {
     getStudents();
   });
 }
 return (
<div>
<h1>Student Management System</h1>
<input
       type="text"
       placeholder="Name"
       value={name}
       onChange={(event) => setName(event.target.value)}
     />
<br></br>
<input
       type="text"
       placeholder="Course"
       value={course}
       onChange={(event) => setCourse(event.target.value)}
     />
<br></br>
<input
       type="number"
       placeholder="Age"
       value={age}
       onChange={(event) => setAge(event.target.value)}
     />
<br></br>
<button onClick={addStudent}>Add Student</button>
<br></br>
<button onClick={updateStudent}>Update Student</button>
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
</div>
     ))}
</div>
 );
}
export default App;