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
        {
            type: 'input',
            message: 'Please enter your GitHub username:',
            name: 'gitHub',
        },
        {
            type: 'input',
            message: 'Please enter your email address:',
            name: 'email',
        },
    ]);

};

function generateReadme(response) {
    return `
# ${response.title}

# Table of Contents

-[Description](#description)
-[Installation](#installation)
-[Usage instructions](#usage)
-[Contribution](#contribution)
-[Testing](#testing)
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
- [${response.license} license documentation](https://opensource.org/licenses/${response.license})
## Questions:
Questions? Find me on GitHub:
https://github.com/${response.gitHub}

or email me at:
${response.email}
`;
}

async function init() {

    try {
        const response = await promptUser();
        const readMe = generateReadme(response);
        console.log(readMe);
        await writeFileAsync("README.md", readMe);
        console.log("Success");
    } catch (err) {
        console.log(err);
    }
}

init();

