const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

function validateNumber(value) {
    const isValid = !isNaN(value) && parseInt(value) > 0;
    return isValid || "Please enter a valid positive number.";
}

// Function to collect manager info
function createManager() {
    console.log("Please enter the team manager's information:");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Manager's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Manager's employee ID Numer:",
                validate: validateNumber,
            },
            {
                type: "input",
                name: "email",
                message: "Manager's email:",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Manager's office number:",
            },
        ])
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            teamMembers.push(manager);
            createTeam();
        });
}

// Function to choose a team member to add
function createTeam() {
    console.log("Select the type of team member you want to add:");
    inquirer
        .prompt([
            {
                type: "list",
                name: "memberType",
                message: "Choose a team member type:",
                choices: ["Engineer", "Intern", "No more team member to add"],
            },
        ])
        .then((answer) => {
            if (answer.memberType === "Engineer") {
                createEngineer();
            } else if (answer.memberType === "Intern") {
                createIntern();
            } else {
                generateHTML();
            }
        });
}

// Function to collect engineer info
function createEngineer() {
    console.log("Please enter the engineer's information:");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Engeneer's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Engineer's employee ID Number:",
                validate: validateNumber,
            },
            {
                type: "input",
                name: "email",
                message: "Engineer's email:",
            },
            {
                type: "input",
                name: "github",
                message: "Engineer's GitHub username:",
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            teamMembers.push(engineer);
            createTeam();
        });
}


// Function to collect intern info
function createIntern() {
    console.log("Please enter the intern's information:");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Intern's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Intern's employee ID Number:",
                validate: validateNumber,
            },
            {
                type: "input",
                name: "email",
                message: "Intern's email:",
            },
            {
                type: "input",
                name: "school",
                message: "Intern's school:",
            },
        ])
        .then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            teamMembers.push(intern);
            createTeam();
        });
}


function generateHTML() {
    const html = render(teamMembers);
    fs.writeFileSync(outputPath, html);
    console.log(`HTML file generated at ${outputPath}`);
}

// Start the application with the team manager info
createManager();