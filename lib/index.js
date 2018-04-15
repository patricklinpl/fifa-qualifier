import 'babel-polyfill'
// import chalk from 'chalk'
// import clear from 'clear'
// import figlet from 'figlet'
// import askToUpdateGameId from './inquirer'
import {saveConcacafGameIds, saveConcacafGameStats} from './concacaf'
import {saveConmebolGameIds, saveConmebolGameStats} from './conmebol'
import {saveCafGameIds, saveCafGameStats} from './caf'
import {saveUefaGameIds, saveUefaGameStats} from './uefa'

// getConcacafGameIds()
// saveConmebolGameIds()
//  saveCafGameIds()
//saveUefaGameIds()

saveConcacafGameStats()
saveConmebolGameStats()
saveCafGameStats()
saveUefaGameStats()

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
