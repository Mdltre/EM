const mysql = require("mysql");

//Connection Port
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.AttendancePage = (req,res) => {

  pool.getConnection((err, connection) => {
    console.log("Attendance database is connected.");

    connection.query('SELECT * FROM attendance_records', (err, rows)=> {
      connection.release();

      if(!err){
        res.render("attendancerecord", {rows});
      } else {
        console.log(err);
      }
    });
  });
    console.log("In attendance records.")
};

exports.TimeIn = (req,res) => {

pool.getConnection((err, connection) => {
  const{e_ID} = req.body;


  if (err) throw err; //not connected

  // Connect Teacher
  connection.query(
    "INSERT INTO attendance_records SET employeeID = ?, attendance_type = '1', attendance_dt = NOW()",
    [e_ID],
    (err, rows) => {
      //When done with connection, release it
      connection.release();

      if (!err) {
        res.render("attendancerecord", {alert: "Attendance added successfully!" });

      } else {
        console.log("Error loading the data.");
      }
      console.log(e_ID);
      console.log("I added the attendance to your database.");
    }
  );
});
};

exports.TimeOut = (req,res) => {

  pool.getConnection((err, connection) => {
    const{e_ID} = req.body;
  
  
    if (err) throw err; //not connected
  
    // Connect Teacher
    connection.query(
      "INSERT INTO attendance_records SET employeeID = ?, attendance_type = '0', attendance_dt = NOW()",
      [e_ID],
      (err, rows) => {
        //When done with connection, release it
        connection.release();
  
        if (!err) {
          res.render("attendancerecord", {alert: "Attendance added successfully!" });
  
        } else {
          console.log("Error loading the data.");
        }
  
        console.log("I added the attendance to your database.");
      }
    );
  });
  };