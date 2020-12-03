const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

let promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
        },
        // Descripton
        {
            type: 'input',
            message: 'Enter project description:',
            name: 'description',
        },
        // Installation instructions
        {
            type: 'input',
            message: 'Enter installation instructions:',
            name: 'installation',
        },
        // Usage information
        {
            type: 'input',
            message: 'Enter usage instructions:',
            name: 'usage',
        },
        // Contribution guidelines
        {
            type: 'input',
            message: 'Who can contribute to this project?',
            name: 'contribution',
        },
        // Test instructions
        {
            type: 'input',
            message: 'Enter testing instructions for your project:',
            name: 'testing',
        },
    ])
        .then((response) => {
            console.log(response.title);
            console.log(response.description);
            console.log(response.installation);
            console.log(response.usage);
            console.log(response.contribution);
            console.log(response.testing);
        }
        );
};

promptUser();