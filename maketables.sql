CREATE SCHEMA `em_db` ;

use em_db;

CREATE TABLE employees(
employeeID INT(11) PRIMARY KEY AUTO_INCREMENT,
employeeCode INT(5),
employeeLastname VARCHAR(50),
employeeFirstname VARCHAR(50),
employeeSuffix VARCHAR(50),
employeePhone VARCHAR(11),
employeeAddress VARCHAR(200),
employeePosition VARCHAR(50),
employeeUsername VARCHAR(50),
employeePassword VARCHAR(50),
employeeStatus VARCHAR(50)
)ENGINE=INNODB;

INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00001, 'Dela Torre', 'Maria Jose', 'none', '09984916189', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Admin', 'mjpdelatorre', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00002, 'Lao', 'Kiefer Renz', 'none', '09978657482', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'krenzlao', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00003, 'Cordoviz', 'Alfonso', 'none', '09876543827', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'acordoviz', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00004, 'Binarao', 'Kean', 'none', '09346726589', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'kbinarao', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00005, 'Salutillo', 'Gwennyth', 'none', '09678293671', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'pgsalutillo', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00006, 'Rivera', 'Barbara', 'none', '09863526109', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'brivera', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00007, 'Hamilton', 'Clayton', 'none', '09982351786', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'chamilton', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00008, 'Pratt', 'Anne', 'none', '09987530298', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'apratt', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 00009, 'Brunson', 'Martin', 'none', '09763827156', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'mbrunson', 'compshop', 'active');
INSERT INTO employees (employeeID, employeeCode, employeeLastname, employeeFirstname, employeeSuffix, employeePhone, employeeAddress, employeePosition, employeeUsername, employeePassword, employeeStatus) 
VALUES (NULL, 000010, 'Moon', 'Robert', 'none', '09234156725', 'Blk. 16 Lot 2, Rosalina 3 Village, Baliok, Talomo District, Davao City', 'Cashier', 'rmoon', 'compshop', 'active');

CREATE TABLE attendance_records(
attendanceID INT(11) PRIMARY KEY AUTO_INCREMENT,
employeeID INT(11),
attendance_type BOOLEAN,
attendance_dt DATETIME
)ENGINE=INNODB;

SELECT * FROM em_db.employees;
SELECT * FROM attendance_records;

