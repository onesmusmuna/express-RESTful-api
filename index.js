const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());

const coursesArr = [
  { id: 1, name: "Node js" },
  { id: 2, name: "React" },
  { id: 3, name: "Django" },
  { id: 4, name: "MongoDB" },
];

// get all courses
app.get("/api/courses/", (req, res) => {
  res.json({ coursesArr });
});

// get one course
app.get("/api/courses/:id", (req, res) => {
  const course = matchParamIdandCourseID(coursesArr, req.params.id);
  res.json({ course });
});

// add course
app.post("/api/courses", (req, res) => {
  const course = {
    id: coursesArr.length + 1,
    name: req.body.name,
  };
  coursesArr.push(course);
  res.json({ course });
});

// update course
app.put("/api/courses/:id", (req, res) => {
  const course = matchParamIdandCourseID(coursesArr, req.params.id);
  course.name = req.body.name;
  res.json({ course });
});

app.delete("/api/courses/:id", (req, res) => {
  const course = matchParamIdandCourseID(coursesArr, req.params.id);

  const index = coursesArr.indexOf(course);
  coursesArr.splice(index, 1);
  res.json({ course });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port: ${port}`));

// -------------------- Helpers ----------------------------
function matchParamIdandCourseID(courseArr, paramsId) {
  return coursesArr.find((c) => c.id === parseInt(paramsId));
}
