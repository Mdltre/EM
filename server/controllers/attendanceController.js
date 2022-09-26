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
};

exports.TimeInOut = (req,res) => {

pool.getConnection((err, connection) => {
  if (err) throw err;
  const{e_ID} = req.body;

  if(e_ID){
    connection.connect(function(err) {
      console.log("Connected!");
      var sql = "SELECT * FROM employees WHERE employeeID = '"+e_ID+"'" // setup your query
      connection.query(sql, function (err, result) {  // pass your query
        console.log("Result: " + result);
        if (result != "") {
        // true logic
          var timeinout = "SELECT * FROM attendance_records WHERE employeeID = '"+e_ID+"'"
          connection.query(timeinout, function (err,result){
            console.log("TimeInOut Result: " + result);
            if (result.length % 2 == 0){
              connection.query(
                "INSERT INTO attendance_records SET employeeID = ?, attendance_type = '1', attendance_dt = NOW()",
                [e_ID],
                (err, rows) => {
            
                  connection.query(
                    "SELECT * FROM attendance_records ORDER BY employeeID DESC LIMIT 1",
                    (err, rows) => {
                  //When done with connection, release it
                  connection.release();
            
                  if (!err) {
                    res.render("attendancerecord", {alert: "Attendance added successfully!" });
                  } else {
                    console.log("Error loading the data.", rows);
                  }
                  console.log(e_ID);
                }
              );
            });
            }else{
              connection.query(
                "INSERT INTO attendance_records SET employeeID = ?, attendance_type = '0', attendance_dt = NOW()",
                [e_ID],
                (err, rows) => {
            
                  connection.query(
                    "SELECT * FROM attendance_records ORDER BY employeeID DESC LIMIT 1",
                    (err, rows) => {
                  //When done with connection, release it
                  connection.release();
            
                  if (!err) {
                    res.render("attendancerecord", {alert: "Attendance added successfully!" });
                  } else {
                    console.log("Error loading the data.", rows);
                  }
                  console.log(e_ID);
                }
              );
            });
            }
          })
        }
        else
        {
        // false logic
        res.render("attendancerecord", {alert: "This employee code does not exist!" });
        }
      });
      });

  }else{
    res.render("attendancerecord", {alert: "Please enter an employee code!" });
  }
});
};