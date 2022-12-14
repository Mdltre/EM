const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

var sess;

const app = express();
const port = process.env.PORT || 5000;

//Parse application/json
app.use(bodyParser.json());
//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//Static Files
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');

//Connection Port
const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err, connection)=> {
    if(err) throw err;
    console.log('Employee database is connected.');
});

//Routes
const employeeroutes = require('./server/routes/employee');
app.use('/', employeeroutes);
const adminroutes = require('./server/routes/admin');
app.use('/', adminroutes);
const attendanceroutes = require('./server/routes/attendance');
app.use('/', attendanceroutes);

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'em_db'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/attendance', function(request, response){
	response.render("attendancerecord");
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM employees WHERE employeeUsername = ? AND employeePassword = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;

				connection.connect(function(err) {
					console.log("Connected!");
					var sql = "SELECT * FROM employees WHERE employeeUsername = '"+username+"' AND employeePassword = '"+password+"' AND employeePosition = 'Admin'" // setup your query
					connection.query(sql, function (err, result) {  // pass your query
					  console.log("Result: " + result);
					  if (result != "") {
						// true logic
						response.redirect('/adminhome');
						console.log(request.session);
						app.locals.sess= request.session.loggedin;
					  }
					  else
					  {
						// false logic
						response.redirect('/employee/home');
						console.log(request.session);
						app.locals.sess= request.session.loggedin;
					  }
					});
				  });

				// Redirect to home page
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/logout',function(req, res){
	req.session.destroy(function(){
		app.locals.sess= false;
	  res.redirect('/');
	  console.log("out.");
	});
  }); 

app.listen(port, () => console.log(`Listening on port ${port}`));