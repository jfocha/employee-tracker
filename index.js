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
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles'],
   })
    .then((answers) => {
        // Use user feedback for... whatever!!
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