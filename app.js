const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeSelection = [
  {
    message: "What kind of employee profile would you like to create?",
    type: "list",
    name: "createProfile",
    choices: [`Manager`, `Engineer`, `Intern`],
  },
];

const createAdditional = [
  {
    message: "Create an additional employee profile?",
    type: "confirm",
    name: "createAdditionalProfile",
  },
];

function init() {
  inquirer.prompt(employeeSelection).then((answers) => {
    switch (answers.type) {
      case `Manager`:
        createManager();
        break;
      case `Engineer`:
        createEngineer();
        break;
      default:
        createIntern();
    }
  });
}

function createManager() {
  inquirer
    .prompt([
      {
        message: "Enter first name: ",
        type: "input",
        name: "name",
      },
      {
        message: "Enter ID number: ",
        type: "input",
        name: "id",
      },
      {
        message: "Enter email address: ",
        type: "input",
        name: "email",
      },
      {
        message: "Enter office number: ",
        type: "input",
        name: "officeNumber",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        message: "Enter first name: ",
        type: "input",
        name: "name",
      },
      {
        message: "Enter ID number: ",
        type: "input",
        name: "id",
      },
      {
        message: "Enter email address: ",
        type: "input",
        name: "email",
      },
      {
        message: "Enter GitHub username: ",
        type: "input",
        name: "github",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(engineer);
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        message: "Enter first name: ",
        type: "input",
        name: "name",
      },
      {
        message: "Enter ID number: ",
        type: "input",
        name: "id",
      },
      {
        message: "Enter email address: ",
        type: "input",
        name: "email",
      },
      {
        message: "Enter school name: ",
        type: "input",
        name: "school",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employees.push(intern);
    });
}

init();

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
