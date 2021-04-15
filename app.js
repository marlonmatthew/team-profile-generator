//requirements for the app
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

//variables for saving the html file to output folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//array containing employee info
const employees = [];

//prompt for selecting the employee profile type to create
const employeeSelection = [
  {
    message: "What kind of employee profile would you like to create?",
    type: "list",
    name: "createProfile",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

//prompt for creating another profile
const createAdditional = [
  {
    message: "Create an additional employee profile?",
    type: "confirm",
    name: "createAdditionalProfile",
  },
];

//function for creating a manager profile
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

      createExtraProfile();
    });
}

//function for creating an engineer profile
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

      createExtraProfile();
    });
}

//function for creating an intern profile
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

      createExtraProfile();
    });
}

//initialization function which starts the app
init();

function init() {
  inquirer.prompt(employeeSelection).then((answers) => {
    switch (answers.createProfile) {
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

//if user wants to create another profile, run init again, otherwise render the html and write the file to output folder
function createExtraProfile() {
  inquirer.prompt(createAdditional).then((answers) => {
    if (answers.createAdditionalProfile) {
      init();
    } else {
      fs.writeFileSync(outputPath, render(employees));
    }
  });
}
