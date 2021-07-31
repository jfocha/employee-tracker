const inquirer = require('inquirer');
// const mysql = require('mysql2'); moved to connection.js
const db = require('./db/connection'); // required because of the code organization
// const inputCheck = require('./utils/inputCheck');
const cTable = require('console.table');

const employeeNames = require('./utils/getEmployeeNames')

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

// let allEmployeeNames = async () => {
//     const employeeNameCheck = [];
//     const employeeIdCheck = [];
//     const sql = `SELECT employees.id, concat(employees.first_name,' ',employees.last_name) employee FROM employees`

//     let response = await new Promise((resolve, reject) => db.query(sql, (err, rows) => {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(rows);
//         }

//     }));
//     // console.log(response);
//     for (let i = 0; i < response.length; i++) {
//         employeeNameCheck[i] = response[i].employee;
//         employeeIdCheck[i] = response[i].id;
//     }
//     // console.log(employeeNameCheck);
//     return employeeNameCheck;
// };
// console.log(allEmployeeNames());
// let allEmployeeNames = async () => {
//     const employeeNameCheck = [];
//     const employeeIdCheck = [];
//     const sql = `SELECT employees.id, concat(employees.first_name,' ',employees.last_name) employee FROM employees`

//     await db.query(sql, (err, rows) => {
//         if (err) {
//             reject(err);
//         }
        
//         for (let i = 0; i < rows.length; i++) {
//             employeeNameCheck[i] = rows[i].employee;
//             employeeIdCheck[i] = rows[i].id;
//         }
//         console.log(employeeNameCheck);
//         // return employeeNameCheck;
//     });
//     return employeeNameCheck;

    
    
// };

function init() {
    
    inquirer
        .prompt({
            type: 'list',
            name: 'toDo',
            message: 'Would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Update employee managers', 'View employees by manager', 'View employees by department', 'Delete departments', 'Delete roles', 'Delete employees', 'View the total utilized budget of a department', 'exit'],
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
            } else if (toDo === 'add a department') {
                inquirer
                    .prompt({
                        type: 'input',
                        name: 'departmentName',
                        message: 'What is the department\'s name?',
                    })
                    .then((departmentName) => {
                        const sql = `INSERT INTO departments (name) VALUES (?)`;
                        const params = departmentName.departmentName;
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        console.log('Updated departments')
                        init();
                    })
            } else if (toDo === 'add a role') {
                // Get department names and ids
                const departmentNameCheck = [];
                const departmentIdCheck = [];
                db.query(`SELECT * FROM departments`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < rows.length; i++) {
                        departmentNameCheck[i] = rows[i].name;
                        departmentIdCheck[i] = rows[i].id;
                    }
                });
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the role\'s title?',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary?',
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'What is the department for this role?',
                            choices: departmentNameCheck,
                        }
                    ])
                    .then((input) => {
                        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                        // find department id choice
                        let deptId = 0;
                        for (let index = 0; index < departmentNameCheck.length; index++) {
                            if (departmentNameCheck[index] === input.department) {
                                deptId = departmentIdCheck[index];
                            }
                        }
                        const params = [input.roleName, input.salary, deptId];
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        console.log('Updated roles')
                        init();
                    })
            } else if (toDo === 'add an employee') {
                // Get role titles and ids
                const roleTitleCheck = [];
                const roleIdCheck = [];
                db.query(`SELECT roles.id, roles.title FROM roles`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < rows.length; i++) {
                        roleTitleCheck[i] = rows[i].title;
                        roleIdCheck[i] = rows[i].id;
                    }
                });
                const employeeNameCheck = [];
                const employeeIdCheck = [];
                db.query(`SELECT employees.id, concat(employees.first_name,' ',employees.last_name) manager FROM employees`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < rows.length; i++) {
                        employeeNameCheck[i] = rows[i].manager;
                        employeeNameCheck.push('None');
                        employeeIdCheck[i] = rows[i].id;
                    }
                });

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the employee\'s first name?',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the employee\'s last name?',
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the role for this employee?',
                            choices: roleTitleCheck,
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the manager for this employee?',
                            choices: employeeNameCheck,
                        }
                    ])
                    .then((input) => {
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                        // find department id choice
                        let roleId = 0;
                        for (let index = 0; index < roleTitleCheck.length; index++) {
                            if (roleTitleCheck[index] === input.role) {
                                roleId = roleIdCheck[index];
                            }
                        }
                        let employeeId = 0;
                        if (input.manager === 'None') {
                            employeeId = null;
                        } else {
                            for (let index = 0; index < employeeNameCheck.length; index++) {
                                if (employeeNameCheck[index] === input.manager) {
                                    employeeId = employeeIdCheck[index];
                                }
                            }
                        }
                        const params = [input.firstName, input.lastName, roleId, employeeId];
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        console.log('Updated employees')
                        init();
                    })
            } else if (toDo === 'update an employee role') {
                
                
                // Get role titles and ids
                const roleTitleCheck = [];
                const roleIdCheck = [];
                db.query(`SELECT roles.id, roles.title FROM roles`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < rows.length; i++) {
                        roleTitleCheck[i] = rows[i].title;
                        roleIdCheck[i] = rows[i].id;
                    }
                });
                const employeeNameCheck = [];
                const employeeIdCheck = [];
                db.query(`SELECT employees.id, concat(employees.first_name,' ',employees.last_name) employee FROM employees`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    for (let i = 0; i < rows.length; i++) {
                        employeeNameCheck[i] = rows[i].employee;
                        employeeIdCheck[i] = rows[i].id;
                    }
                    console.log(employeeNameCheck)
                });
                console.log(employeeNameCheck)
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: 'Which employee do you want to update?',
                            choices: [employeeNameCheck],
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the new role for this employee?',
                            choices: [roleTitleCheck],
                        }
                    ])
                    .then((input) => {
                        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                        // find department id choice
                        let roleId = 0;
                        for (let index = 0; index < roleTitleCheck.length; index++) {
                            if (roleTitleCheck[index] === input.role) {
                                roleId = roleIdCheck[index];
                            }
                        }
                        let employeeId = 0;
                        for (let index = 0; index < employeeNameCheck.length; index++) {
                            if (employeeNameCheck[index] === input.employee) {
                                employeeId = employeeIdCheck[index];
                            }
                        }
                        const params = [roleId, employeeId];
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        console.log('Updated employees')
                        init();
                    })
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

// async function foo () {
//     let names = await allEmployeeNames();
//     console.log(names);
//     return names;
// }
// names.then(foo());
// console.log(foo());
// console.log(names);
init();

/*
https://www.npmjs.com/package/console.table
https://www.npmjs.com/package/inquirer
https://www.npmjs.com/package/mysql2
GitHub
https://stackoverflow.com/questions/18680680/can-a-foreign-key-refer-to-a-primary-key-in-the-same-table
https://ezgif.com/split/ezgif-2-fa22708f32a9.gif
 */