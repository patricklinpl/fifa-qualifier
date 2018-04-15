import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import 'babel-polyfill'
import askToUpdateGameId from './inquirer'
import getConcacafGames from './concacaf'

getConcacafGames()

// clear()
// console.log(
//   chalk.yellow(
//     figlet.textSync('Ginit', { horizontalLayout: 'full' })
//   )
// )

// const run = async () => {
//   const credentials = await askToUpdateGameId()
//   console.log(credentials)
// }

// run()
