import inquirer from 'inquirer'

const askActions = () => {
  const questions = [
    {
      name: 'confederationId',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Game IDs',
      validate: (value) => (['caf', 'concacaf', 'conmebol', 'uefa', ''].indexOf(value) > -1 ? true : '[ERROR]: only caf, concacaf, conmebol, uefa are valid inputs')
    },
    {
      name: 'confederationStats',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Stats',
      validate: (value) => (['caf', 'concacaf', 'conmebol', 'uefa', '', 'all'].indexOf(value) > -1 ? true : '[ERROR]: only caf, concacaf, conmebol, uefa, or all are valid inputs')
    }
  ]
  return inquirer.prompt(questions)
}

export default askActions
