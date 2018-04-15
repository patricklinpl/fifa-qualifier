import 'babel-polyfill'
// import chalk from 'chalk'
// import clear from 'clear'
// import figlet from 'figlet'
// import askToUpdateGameId from './inquirer'
import getConcacafGames from './concacaf'
import getCafGames from './caf'
import getConmebolGames from './conmebol'
import getUefaGames from './uefa'

// getConcacafGames()
getCafGames()
// getConmebolGames()
// getUefaGames()

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
