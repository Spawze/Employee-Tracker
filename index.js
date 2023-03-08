const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require("console.table")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //Type your MySQL password here
    password: 'root',
    database: 'company_db'
},
    console.log("Connected to company_db."))

//All questions for each menu
const menu = {
    type: "list",
    message: "Please make a choice",
    name: "choice",
    choices: ["View all departments", 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
}

const addDepartmentQuestions = {
    type: 'prompt',
    message: 'Please enter the name of the new department:',
    name: 'name'
}
const addRoleQuestions = [
    {
        type:'prompt',
        message: 'Please enter the name of the new role:',
        name: 'name'
    },{
        type:'prompt',
        message: 'Enter the salary for the new role:',
        name: 'salary',
        validate: (salary)=> {
            const pass = salary.match(/(^[0-9]{4,10}$)/)
            if(pass) {
                return true}
            return 'Please enter a valid salary'
        }
    },{
        type:'prompt',
        message: 'Enter the department ID for the new role:',
        name: 'dep_id',
        validate: (id)=> {
            const pass = id.match(/(^[0-9]+$)/)
            if(pass) {
                return true}
            return 'Please enter a valid id'
        }
    },
]
const addEmployeeQuestions = [{
    type:'prompt',
    message: 'Please enter the first name of the new employee:',
    name: 'firstName'
},{
    type:'prompt',
    message: 'Please enter the last name of the new employee:',
    name: 'lastName'
},{
    type:'prompt',
    message: 'Please enter the role ID of the new employee:',
    name: 'role_id',
    validate: (id)=> {
        const pass = id.match(/(^[0-9]+$)/)
        if(pass) {
            return true}
        return 'Please enter a valid id'
    }
},{
    type:'prompt',
    message: "Please enter the manager's ID of the new employee:",
    name: 'manager_id',
    validate: (id)=> {
        const pass = (id.match(/(^[0-9]+$)/))||(id===null)
        if(pass) {
            return true}
        return 'Please enter a valid id'
    }
}]
const updateEmployeeQuestions = [
    {
        type:'prompt',
        message: "Please enter the ID of the employee you would like to update:",
        name: 'employee_id',
        validate: (id)=> {
            const pass = (id.match(/(^[0-9]+$)/))||(id===null)
            if(pass) {
                return true}
            return 'Please enter a valid id'
        }
    },
    {
        type:'prompt',
        message: "Please enter the ID of the new role for that employee:",
        name: 'role_id',
        validate: (id)=> {
            const pass = (id.match(/(^[0-9]+$)/))||(id===null)
            if(pass) {
                return true}
            return 'Please enter a valid id'
        }
    },
]

//initialize program
function init() {
    mainMenu()
}

function mainMenu() {
    inquirer.prompt(menu)
        .then((answer) => {
            switch (answer.choice) {
                case "View all departments":
                    dbPull('SELECT * FROM departments')
                    break;
                case "View all roles":
                    dbPull('SELECT * FROM roles')
                    break;
                case "View all employees":
                    dbPull('SELECT employees.id, employees.first_name, employees.last_name, roles.role_name, roles.salary, roles.department_id, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id ORDER BY employees.id')
                    break;
                case "Add a department":
                    addDepartment()
                    break;
                case "Add a role":
                    addRole()
                    break;
                case "Add an employee":
                    addEmployee()
                    break;
                case "Update employee role":
                    updateEmployee()
                    break;
            }
        })
}

//simple function for a sql command without any ?'s
function dbPull(sql) {
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }else{
            if(result[0].id == null){
                console.log("This table is currently empty!")
            }else{console.table(result)}
            
        }
        mainMenu()
    })
}

//functions for adding things
function addDepartment(){
    inquirer.prompt(addDepartmentQuestions).then((answer)=>{
        db.query("INSERT INTO departments (dep_name) VALUES (?)", answer.name,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Successfully added ${answer.name} as a new department!`)
            }
            mainMenu()
        })
    })
}
function addRole(){
    inquirer.prompt(addRoleQuestions).then((answer)=>{
        console.log(answer)
        db.query("INSERT INTO roles (role_name, salary, department_id) VALUES (?,?,?)", [answer.name, answer.salary, answer.dep_id], (err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Successfully added ${answer.name} as a new role!`)
            }
            mainMenu()
        })
    })
}
function addEmployee(){
    inquirer.prompt(addEmployeeQuestions).then((answer)=>{
        db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.firstName, answer.lastName, answer.role_id,answer.manager_id], (err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Successfully added ${answer.firstName} ${answer.lastName} as a new employee!`)
            }
            mainMenu()
        })
    })
}
//function for updating employees
function updateEmployee(){
    inquirer.prompt(updateEmployeeQuestions).then((answer)=>{
        db.query("UPDATE employees SET role_id = ? WHERE id = ?", [answer.role_id, answer.employee_id], (err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Successfully changed employee #${answer.employee_id}'s role to role #${answer.role_id}!`)
            }
            mainMenu()
        })
    })
}

//initialize program
init()
