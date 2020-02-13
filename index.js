const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./utils/api.js')
const generateMarkdown = require('./utils/generateMarkdown.js')

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}

const init = async _ => {
  let rmObject = {}
  do {
    const { rmUser, rmRepo } = await prompt([
      {
        type: 'input',
        name: 'rmUser',
        message: 'What is your GitHub user name?'
      },
      {
        type: 'input',
        name: 'rmRepo',
        message: 'What is your repository name?'
      }
    ])
    rmObject = await api.getUser(rmUser, rmRepo)
    if (!rmObject) {
      console.error('Repo not found!')
    } else {
      console.log(`${rmObject.fullName} found!`)
    }
  } while (!rmObject)
  // const ghApi = await api.getUser(rmUser)
  Object.assign(rmObject, await prompt([
    // {
    //   type: 'input',
    //   name: 'rmTitle',
    //   message: 'What is the project title?'
    // },
    // {
    //   type: 'input',
    //   name: 'rmDesc',
    //   message: 'What is the project description?'
    // },
    {
      type: 'input',
      name: 'inst',
      message: 'What are the installation instructions?'
    },
    {
      type: 'input',
      name: 'use',
      message: 'What is the usage description?'
    },
    // {
    //   type: 'input',
    //   name: 'rmLic',
    //   message: 'What is the license?'
    // },
    {
      type: 'input',
      name: 'con',
      message: 'Who are the contributors?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'What are the tests?'
    },
    {
      type: 'input',
      name: 'qs',
      message: 'Any questions?'
    }
  ]))
  writeToFile(rmObject.title, await generateMarkdown(rmObject))
}

init()
