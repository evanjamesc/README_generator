// Package installs (had to research 'util' async to fix an error with some code running out of order)
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user for input which will be written to README.md
let promptUser = () => {
    return inquirer.prompt([
        // Title
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
        // License
        {
            type: 'checkbox',
            message: 'Select a software license:',
            choices: [
                "MIT",
                "Apache",
                "ISC",
            ],
            name: 'license',
        },
        // GitHub username
        {
            type: 'input',
            message: 'Please enter your GitHub username:',
            name: 'gitHub',
        },
        // Email address
        {
            type: 'input',
            message: 'Please enter your email address:',
            name: 'email',
        },
    ]);

};
// This function takes the user input from promptUser and puts it in markdown language
function generateReadme(response) {
    return `
# ${response.title}

# Table of Contents

-[Description](#description)

-[Installation](#installation)

-[Usage](#usage)

-[Contribution](#contribution)

-[Tests](#testing)

-[License](#license)

-[Questions](#questions)

## Description:
[![License](https://img.shields.io/badge/License-${response.license}-purple.svg)](https://opensource.org/licenses/${response.license})

${response.description}
## Installation:
${response.installation}
## Usage:
${response.usage}
## Contributing:
${response.contribution}
## Tests:
${response.testing}
## License:
This program is covered under the ${response.license} license.
- [${response.license} License Documentation](https://opensource.org/licenses/${response.license})
## Questions:
Questions? Find me on GitHub:
https://github.com/${response.gitHub}

or email me at:
${response.email}
`;
}
// Function to start the application once user opens with node
async function init() {

        const response = await promptUser();
        const readMe = generateReadme(response);
        await writeFileAsync("README.md", readMe);
        console.log("Generated README.md");

}
// Initialize program
init();

