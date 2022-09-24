const mysql = require("mysql");
const session = require('express-session');
const path = require('path');

//Connection Port
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//main home page
exports.adminHome = (req,res) => {

  var sess= req.app.locals.sess;

  if (sess==true) {
		// Output username
    res.render("adminhome");
  console.log("You're in the main admin page.");
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

//View Employees
exports.view = (req, res) => {

    //Connect to DB
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("Employee database is connected.");
  
      connection.query('SELECT * FROM employees', (err, rows)=> {
        connection.release();
  
        if(!err){
          res.render('adminmanage', {rows});
        } else {
          console.log(err);
        }
      });
    });
  };
  
  //Search Employees
  exports.find = (req, res) => {
  
      //Connect to DB
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Searching employee.");
    
        let searchTerm = req.body.search;
  
        
        connection.query("SELECT * FROM employees WHERE employeeLastname LIKE ? OR employeeFirstname LIKE ? OR employeeCode LIKE ?",
        ["%" + searchTerm + "%", "%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows)=> {
          connection.release();
    
          if(!err){
            res.render("adminmanage", { rows });
          } else {
            console.log(err);
          }
        }
        );
      });
  };

  //Go to add an employee
  exports.employeeform = (req, res) => {
    res.render("addemployee");
    console.log("Going to Add Employee page.");
  };

  // Add new employee
exports.createEmployee = (req, res) => {
  //res.render('addemployee');

  pool.getConnection((err, connection) => {
    const { e_code, e_lastname, e_firstname, e_suffix, e_phone, e_address, e_position, e_username, e_password, e_status } = req.body;

    if (err) throw err; //not connected

    let searchTerm = req.body.search;

    // Connect Teacher
    connection.query(
      "INSERT INTO employees SET employeeCode = ?, employeeLastname = ?, employeeFirstname = ?, employeeSuffix = ?, employeePhone = ?, employeeAddress = ?, employeePosition = ?, employeeUsername = ?, employeePassword = ?, employeeStatus = ?",
      [e_code, e_lastname, e_firstname, e_suffix, e_phone, e_address, e_position, e_username, e_password, e_status],
      (err, rows) => {
        //When done with connection, release it
        connection.release();

        if (!err) {
          res.render("addemployee", { alert: "Employee added successfully!" });
        } else {
          console.log("Error loading the data.");
        }

        console.log("I added the employee to your database.");
      }
    );
  });
};

// place details to Edit teacher
exports.editEmployee = (req, res) => {
  //res.render('edit-teacher');
  console.log("Going to edit an employee.");

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("*");

    // Connect Teacher
    connection.query(
      "SELECT * FROM employees WHERE employeeID = ?",
      [req.params.id],
      (err, rows) => {
        //When done with connection, release it
        connection.release();

        if (!err) {
          res.render("editemployee", { rows });
        } else {
          console.log("Error loading the data.");
        }

        console.log("Caught employee's details.");
      }
    );
  });
};

// Update employee details
exports.updateEmployee = (req, res) => {
  //res.render('edit-teacher');
  const { e_code, e_lastname, e_firstname, e_suffix, e_phone, e_address, e_position, e_username, e_password, e_status } = req.body;

  console.log("Got the employee. Going to update their details.");

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("*");

    // Connect Employee
    connection.query(
      "UPDATE employees SET employeeCode = ?, employeeLastname = ?, employeeFirstname = ?, employeeSuffix = ?, employeePhone = ?, employeeAddress = ?, employeePosition = ?, employeeUsername = ?, employeePassword = ?, employeeStatus = ? WHERE employeeID = ?",
      [e_code, e_lastname, e_firstname, e_suffix, e_phone, e_address, e_position, e_username, e_password, e_status, req.params.id],
      (err, rows) => {
        //When done with connection, release it
        connection.release();

        if (!err) {

          pool.getConnection((err, connection) => {
            if (err) throw err; //not connected

            // Connect Employee
            connection.query(
              "SELECT * FROM employees WHERE employeeID = ?",
              [req.params.id],
              (err, rows) => {
                //When done with connection, release it
                connection.release();
                if (!err) {
                  res.render("editemployee", { rows, alert: `${e_lastname} has been updated!` });
                } else {
                  console.log("Error loading the data.");
                }

                console.log("Updating employee successful.");
              }
            );
          });
        } else {
          console.log("Error loading the data.");
        }

        console.log("*");
      }
    );
  });
};


exports.deleteEmployee = (req, res) => {
  //res.render('edit-teacher');
  console.log("Going to delete a employee.");

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("*");

    // Connect Teacher
    connection.query(
      "DELETE FROM employees WHERE employeeID = ?",
      [req.params.id],
      (err, rows) => {
        //When done with connection, release it
        connection.release();

        if (!err) {
          res.redirect('/adminhome');
        } else {
          console.log("Error loading the data.");
        }

        console.log("Employee deleted from the database.");
      }
    );
  });
};