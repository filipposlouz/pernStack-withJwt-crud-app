const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("body-parser");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes

// create instance
app.post("/employee", async (req, res) => {
  try {
    const { first_name, last_name, afm, date_of_birth } = req.body;
    const newEmployee = await pool.query(
      "INSERT INTO employee(first_name, last_name, afm, date_of_birth) VALUES($1, $2, $3, $4)",
      [first_name, last_name, afm, date_of_birth]
    );
    res.status(200).json({ success: true, data: req.body });
  } catch (err) {
    console.error(err.message);
  }
});

// read all
app.get("/employee", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employee");
    res.status(200).json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get instance
app.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      `SELECT * FROM employee WHERE id = ${id}`
    );
    if (employee.rows.length) {
      res.status(200).json(employee.rows[0]);
    } else {
      res.status(404).json("Employee with specified id does not exist...");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// update instance
app.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const currentEmployee = await pool.query(
      `SELECT * FROM employee WHERE id = ${id}`
    );
    if (!currentEmployee.rows.length) {
      res.status(404).json("Employee with specified id does not exist...");
    }
    if (body.length === 4) {
      const { first_name, last_name, afm, date_of_birth } = req.body;
      const updateEmployee = await pool.query(
        "UPDATE employee SET first_name = $1, last_name = $2, afm = $3, date_of_birth = $4 WHERE id = $5",
        [first_name, last_name, afm, date_of_birth, id]
      );
      res.status(200).json("Database was updated");
    } else {
      var data = {};
      for (var k in currentEmployee.rows[0]) {
        if (!(k in body)) {
          data[k] = currentEmployee.rows[0][k];
        } else {
          data[k] = body[k];
        }
      }
      const updateEmployee = await pool.query(
        "UPDATE employee SET first_name = $1, last_name = $2, afm = $3, date_of_birth = $4 WHERE id = $5",
        [
          data["first_name"],
          data["last_name"],
          data["afm"],
          data["date_of_birth"],
          data["id"],
        ]
      );
      res.status(200).json("Database was updated");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// delete instance
app.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      `DELETE FROM employee WHERE id = ${id}`
    );
    res.status(200).json("Employee was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
