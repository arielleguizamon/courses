const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { students, exams, courses } = require("./data");
app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post("/courses", (req, res) => {
  if (req.body.dni && req.body.name) {
    const course = findCourseByName(req.body.name);
    const student = findStudentByDni(req.body.dni);
    if (!course || !student)
      return res.status(400).json("Dni or course are invalid");
    if (!findStudentOnCourse(student.id, course)) {
      course.students.push(student.id);
      res.status(201).json(course);
    } else
      return res.status(400).json("Student already exists on given course");
  } else
    return res.status(400).json("Dni and course name params are mandatory");
});

app.get("/courses/:dni", (req, res) => {
  if (req.params.dni) {
    const student = findStudentByDni(parseInt(req.params.dni));
    if (!student)
      return res.status(400).json("No student found with given dni");
    const courses = findCoursesByStudent(student.id);
    return res.status(200).json(courses);
  } else return res.status(400).json("Dni params is mandatory");
});

app.post("/exam", (req, res) => {
  if (req.body.dni && req.body.date && req.body.course && req.body.grade) {
    const student = findStudentByDni(req.body.dni);
    const course = findCourseByName(req.body.course);
    if (!course || !student)
      return res.status(400).json("Dni or course are invalid");
    if (req.body.grade > 10 || req.body.grade < 0)
      return res.status(400).json("Grade must be between 0-10");
    exams.push({
      course: course.id,
      student: student.id,
      date: req.body.date,
      grade: req.body.grade
    });
    return res.status(201).json(exams);
  } else return res.status(400).json("All params are mandatory");
});

app.get("/list", (req, res) => {
  const list = {};
  students.forEach(student => {
    list[student.name] = {};
    const courses = findCoursesByStudent(student.id);
    courses.forEach(course => {
      list[student.name][course.name] = isGraded(student.id, course.id);
    });
  });
  return res.status(200).json(list);
});

const findStudentByDni = dni => students.find(e => e.dni === dni);

const findCourseByName = name => courses.find(e => e.name === name);

const findStudentOnCourse = (studentId, course) =>
  course.students.find(e => e === studentId);

const findCoursesByStudent = id =>
  courses.filter(e => e.students.find(e => e === id));

const findExams = (student, course) =>
  exams.filter(e => e.student === student && e.course === course);

const isGraded = (student, course) => {
  const exams = findExams(student, course);
  const notGraded = exams.find(e => e.grade < 5);
  if (notGraded) return "No Aprobo";
  else {
    const sum = exams.reduce((total, current) => total + current.grade, 0);
    if (sum / exams.length >= 7) return "Aprobo";
    else return "No aprobo";
  }
};
