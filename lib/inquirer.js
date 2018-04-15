import inquirer from 'inquirer'

const askActions = () => {
  const questions = [
    {
      name: 'confederationId',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Game IDs',
      validate: (value) => (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', ''].indexOf(value) > -1 ? true : '[ERROR]: only afc, caf, concacaf, conmebol, inter, ofc, or uefa are valid inputs')
    },
    {
      name: 'confederationStats',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Stats',
      validate: (value) => (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', 'all', ''].indexOf(value) > -1 ? true : '[ERROR]: only afc, caf, concacaf, conmebol, inter, ofc, uefa, or all are valid inputs')
    }
  ]
  return inquirer.prompt(questions)
}

export default askActions
