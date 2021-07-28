const inquirer = require('inquirer');
// const mysql = require('mysql2'); moved to connection.js
const db = require('./db/connection'); // required because of the code organization
// const inputCheck = require('./utils/inputCheck');
const cTable = require('console.table');

console.log(
    `
 /$$$$$$$$                         /$$                                        
| $$_____/                        | $$                                        
| $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$ 
| $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$
| $$__/   | $$ \\ $$ \\ $$| $$  \\ $$| $$| $$  \\ $$| $$  | $$| $$$$$$$$| $$$$$$$$
| $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/
| $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$
|________/|__/ |__/ |__/| $$____/ |__/ \\______/  \\____  $$ \\_______/ \\_______/
                        | $$                     /$$  | $$                    
                        | $$                    |  $$$$$$/                    
                        |__/                     \\______/                     
 /$$$$$$$$                           /$$                                      
|__  $$__/                          | $$                                      
   | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$             
   | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$            
   | $$| $$  \\__/ /$$$$$$$| $$      | $$$$$$/ | $$$$$$$$| $$  \\__/            
   | $$| $$      /$$__  $$| $$      | $$_  $$ | $$_____/| $$                  
   | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \\  $$|  $$$$$$$| $$                  
   |__/|__/      \\_______/ \\_______/|__/  \\__/ \\_______/|__/                  
   `);

function init() {
    inquirer
        .prompt({
            type: 'list',
            name: 'toDo',
            message: 'Would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Update employee managers', 'View employees by manager', 'View employees by department', 'Delete departments', 'roles departments', 'employees departments', 'View the total utilized budget of a department', 'exit'],
        })
        .then(({ toDo }) => {
            if (toDo === 'view all departments') {
                db.query(`SELECT * FROM departments`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`
                    
                    `)
                    console.table(rows);
                    init();
                });
            } else if (toDo === 'view all roles') {
                const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary
                FROM roles
                LEFT JOIN departments ON roles.department_id=departments.id;`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`
                    
                    `)
                    console.table(rows);
                    init();
                });
            } else if (toDo === 'view all employees') {
                const sql = `SELECT A.id, A.first_name, A.last_name, roles.title, departments.name AS department, roles.salary, concat(B.first_name,' ',B.last_name) manager
                FROM employees A
                LEFT JOIN roles ON A.role_id=roles.id
                LEFT JOIN departments ON roles.department_id=departments.id
                LEFT JOIN employees B ON A.manager_id = B.id;`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`
                    
                    `)
                    console.table(rows);
                    init();
                });
            } else if (toDo === 'exit') {
                return;
            }

        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

init();

/*
https://www.npmjs.com/package/console.table
https://www.npmjs.com/package/inquirer
https://www.npmjs.com/package/mysql2
GitHub
https://stackoverflow.com/questions/18680680/can-a-foreign-key-refer-to-a-primary-key-in-the-same-table
https://ezgif.com/split/ezgif-2-fa22708f32a9.gif
 */