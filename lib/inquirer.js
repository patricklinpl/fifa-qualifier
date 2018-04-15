import inquirer from 'inquirer'

const askToUpdateGameId = () => {
  const questions = [
    {
      name: 'confederation',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Game IDs',
      validate: (value) => (['afc', 'caf', 'concacaf', 'conmebol', 'ofc', 'uefa'].indexOf(value) > -1 ? true : 'Enter a Confederation to update the FIFA Qualifier Game IDs')
    }
  ]
  return inquirer.prompt(questions)
}

export default askToUpdateGameId
