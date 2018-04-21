import inquirer from 'inquirer'

const askActions = () => {
  const questions = [
    {
      name: 'confederationId',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Game IDs',
      validate: (value) => (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', '', 'friendly'].indexOf(value) > -1 ? true : '[ERROR]: only afc, caf, concacaf, conmebol, inter, ofc, uefa, or friendly are valid inputs')
    },
    {
      name: 'confederationStats',
      type: 'input',
      message: 'Enter a Confederation to update the FIFA Qualifier Stats',
      validate: (value) => (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', 'all', '', 'friendly'].indexOf(value) > -1 ? true : '[ERROR]: only afc, caf, concacaf, conmebol, inter, ofc, uefa, friendly, or all are valid inputs')
    }
  ]
  return inquirer.prompt(questions)
}

export default askActions
