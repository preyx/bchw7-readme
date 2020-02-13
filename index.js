const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./utils/api.js')
const generateMarkdown = require('./utils/generateMarkdown.js')

const writeToFile = (fileName, data) => {
}

const init = async _ => {
  const { username } = await prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub user name?'
    }
  ])
  const apiResult = await api.getUser(username)
  const {} = await prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub user name?'
    },
  ])
    .then(({ username }) => getUser(username))
    .catch(e => console.error(e))
}

init()
