const express = require('express');
const mongoose = require('mongoose');

const app = express();

/* -------------------------------
 a) CONNECT DATABASE
--------------------------------*/
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => {
  console.log("Connected to DB");

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
})
.catch(err => console.log(err));

/* -------------------------------
 b) SCHEMA + COLLECTION
--------------------------------*/
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

/* -------------------------------
 c) INSERT DATA
--------------------------------*/
app.get('/insert', async (req, res) => {
  await Student.insertMany([
    { Name: "A", Roll_No: 1, WAD_Marks: 25, CC_Marks: 26, DSBDA_Marks: 30, CNS_Marks: 28, AI_Marks: 29 },
    { Name: "B", Roll_No: 2, WAD_Marks: 15, CC_Marks: 20, DSBDA_Marks: 18, CNS_Marks: 22, AI_Marks: 25 },
    { Name: "C", Roll_No: 3, WAD_Marks: 30, CC_Marks: 32, DSBDA_Marks: 35, CNS_Marks: 31, AI_Marks: 33 },
    { Name: "D", Roll_No: 4, WAD_Marks: 10, CC_Marks: 12, DSBDA_Marks: 15, CNS_Marks: 18, AI_Marks: 20 },
    { Name: "E", Roll_No: 5, WAD_Marks: 28, CC_Marks: 27, DSBDA_Marks: 29, CNS_Marks: 30, AI_Marks: 26 }
  ]);

  res.send("Students Inserted");
});

/* -------------------------------
 d) COUNT + DISPLAY ALL
--------------------------------*/
app.get('/students', async (req, res) => {
  const data = await Student.find();
  const count = await Student.countDocuments();

  res.send({ total: count, students: data });
});

/* -------------------------------
 e) DSBDA > 20
--------------------------------*/
app.get('/dsbda20', async (req, res) => {
  const data = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.send(data.map(s => s.Name));
});

/* -------------------------------
 f) UPDATE MARKS (+10)
--------------------------------*/
app.get('/update/:name', async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10 } }
  );
  res.send("Updated");
});

/* -------------------------------
 g) >25 IN ALL SUBJECTS
--------------------------------*/
app.get('/gt25all', async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });

  res.send(data.map(s => s.Name));
});

/* -------------------------------
 h) <40 IN MATHS & SCIENCE
(assume WAD = Maths, CNS = Science)
--------------------------------*/
app.get('/less40', async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  });

  res.send(data.map(s => s.Name));
});

/* -------------------------------
 i) DELETE STUDENT
--------------------------------*/
app.get('/delete/:name', async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send("Deleted");
});

/* -------------------------------
 j) TABLE FORMAT
--------------------------------*/
app.get('/table', async (req, res) => {
  const students = await Student.find();

  let html = `
    <h2>Student Table</h2>
    <table border="1" cellpadding="10">
      <tr>
        <th>Name</th><th>Roll</th><th>WAD</th>
        <th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th>
      </tr>
  `;

  students.forEach(s => {
    html += `
      <tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_Marks}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});