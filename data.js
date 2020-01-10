exports.students = [
  {
    name: "Pepe Lorem",
    dni: 123,
    id: 1
  },
  {
    name: "Juan Carlos",
    dni: 456,
    id: 2
  }
];
exports.courses = [
  { name: "Course 1", students: [1, 2], id: 1 },
  { name: "Course 2", students: [1], id: 2 }
];

exports.exams = [
  {
    course: 1,
    student: 1,
    date: 1578674629040,
    grade: 5
  },
  {
    course: 2,
    student: 1,
    date: 1578674629041,
    grade: 7
  },
  {
    course: 2,
    student: 1,
    date: 1578674629045,
    grade: 9
  },
  {
    course: 2,
    student: 1,
    date: 1578674629041,
    grade: 10
  },
  {
    course: 1,
    student: 2,
    date: 1578674629040,
    grade: 7
  },
  {
    course: 1,
    student: 2,
    date: 1578674629045,
    grade: 10
  }
];
