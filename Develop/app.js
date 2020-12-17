const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const validator = require("email-validator");
const joi = require("joi"); // Data Validator

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const gatherInfo = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is your manager's ID?",
            name: "managerID",
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "managerEmail",
            validate: validateEmail,
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber",
        },
        {
            type: "input",
            message: "Which type of team member would you like to add?",
            name: "employeeType",
        }
    ])
    .then((response) => {
        switch (response.employeeType) {
            case "Engineer":
            case "engineer":
                engineer();
                break;
            
            case "Intern":
            case "intern":
                intern();
                break;
            
            case "Employee":
            case "employee":
                employee();
                break;
        }
    });
};

// Function to validate user input value for email
const validateEmail = (email) => {
    const schema = joi.object({
        email: joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]} })
    });
    schema.validate(email);
    return "Please return valid email.";
}

// Initialize application/promts for user
gatherInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
