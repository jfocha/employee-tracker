const db = require('../db/connection');

// const allEmployeeNames = async () => {
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

const allEmployeeNames = async () => {
    const employeeNameCheck = [];
    const employeeIdCheck = [];
    const sql = `SELECT employees.id, concat(employees.first_name,' ',employees.last_name) employee FROM employees`

    let response = await new Promise((resolve, reject) => db.query(sql, (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }

    }));
    // console.log(response);
    for (let i = 0; i < response.length; i++) {
        employeeNameCheck[i] = response[i].employee;
        employeeIdCheck[i] = response[i].id;
    }
    // console.log(employeeNameCheck);
    return employeeNameCheck;
};

module.exports = allEmployeeNames;