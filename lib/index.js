import 'babel-polyfill'
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import askActions from './inquirer'
import {saveConfGameIds, saveConfGameStats, saveAllConfGameStats} from './confederations'

clear()
console.log(
  chalk.yellow(
    figlet.textSync('2018 FIFA World Cup Qualifiers', { horizontalLayout: 'full' })
  )
)

const run = async () => {
  const actions = await askActions()

  if (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', 'friendly'].indexOf(actions['confederationId']) > -1) await saveConfGameIds(actions['confederationId'].toUpperCase())

  if (['afc', 'caf', 'concacaf', 'conmebol', 'inter', 'ofc', 'uefa', 'friendly'].indexOf(actions['confederationStats']) > -1) await saveConfGameStats(actions['confederationStats'].toUpperCase())

  if (actions['confederationStats'] === 'all') {
    const promises = [await saveAllConfGameStats()]
    await Promise.all(promises)
  }
}

run()
