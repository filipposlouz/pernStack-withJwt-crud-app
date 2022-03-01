const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json()); // req.body

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

// create instance
app.post("/employee", authenticateToken, async (req, res) => {
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
app.get("/employee", authenticateToken, async (req, res) => {
  try {
    console.log("second", req);
    const allEmployees = await pool.query("SELECT * FROM employee");
    res.status(200).json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(`SELECT * FROM login WHERE username = $1`, [
      username,
    ]);
    if (user.rows.length > 0) {
      bcrypt.compare(password, user.rows[0].userpassword, (error, response) => {
        if (response) {
          const { id } = user.rows[0];
          const token = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
          res.status(200).json({ success: true, token: token });
        } else {
          res.send({ success: false, message: "User doesn't exist." });
        }
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// testing
app.put("/login", async (req, res) => {
  try {
    const { password } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      console.log(hash);
      const result = pool.query(
        "UPDATE login SET userpassword = $1 WHERE username = 'admin'",
        [hash],
        (err, result) => {
          console.log(err);
        }
      );
    });
  } catch (error) {
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
