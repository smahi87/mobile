const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/* -------------------------------
 CONNECT DATABASE
--------------------------------*/
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
.then(() => {
  console.log("DB Connected");

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
})
.catch(err => console.log(err));

/* -------------------------------
 SCHEMA
--------------------------------*/
const empSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String
});

const Employee = mongoose.model('employees', empSchema);

/* -------------------------------
 ADD EMPLOYEE
--------------------------------*/
app.get('/add', async (req, res) => {
  await Employee.create({
    name: "Mahi Shah",
    department: "IT",
    designation: "Developer",
    salary: 60000,
    joiningDate: "2024-01-10"
  });

  res.send("Employee Added");
});

/* -------------------------------
 VIEW ALL EMPLOYEES
--------------------------------*/
app.get('/employees', async (req, res) => {
  const data = await Employee.find();
  res.send(data);
});

/* -------------------------------
 UPDATE EMPLOYEE
--------------------------------*/
app.get('/update/:name', async (req, res) => {
  await Employee.updateOne(
    { name: req.params.name },
    { $set: { salary: 80000 } }
  );

  res.send("Employee Updated");
});

/* -------------------------------
 DELETE EMPLOYEE
--------------------------------*/
app.get('/delete/:name', async (req, res) => {
  await Employee.deleteOne({ name: req.params.name });
  res.send("Employee Deleted");
});