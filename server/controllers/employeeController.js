const mysql = require("mysql");

//Connection Port
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//main home page
exports.mainHome = (req,res) => {

  var sess= req.app.locals.sess;

if (sess==true) {
  // Output username
  res.render("mainhome");
  console.log("You're in the main page.");
} else {
  // Not logged in
  res.send('Please login to view this page!');
}
};

//View Employees
exports.view = (req, res) => {

  var sess= req.app.locals.sess;

if (sess==true) {
    //Connect to DB
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("Employee database is connected.");
  
      connection.query('SELECT * FROM employees', (err, rows)=> {
        connection.release();
  
        if(!err){
          res.render('employeelist', {rows});
        } else {
          console.log(err);
        }
      });
    });
} else {
  // Not logged in
  res.send('Please login to view this page!');
}
};

//Search Employees
exports.find = (req, res) => {

    var sess= req.app.locals.sess;

if (sess==true) {
  
    //Connect to DB
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("Searching employee.");
  
      let searchTerm = req.body.search;

      
      connection.query("SELECT * FROM employees WHERE employeeLastname LIKE ? OR employeeFirstname LIKE ? OR employeeCode LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows)=> {
        connection.release();
  
        if(!err){
          res.render("employeelist", { rows });
        } else {
          console.log(err);
        }
      }
      );
    });
} else {
  // Not logged in
  res.send('Please login to view this page!');
}
};