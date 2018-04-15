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

  if (actions['confederationId'] === 'concacaf') await saveConfGameIds(actions['confederationId'].toUpperCase())
  if (actions['confederationId'] === 'conmebol') await saveConfGameIds(actions['confederationId'].toUpperCase())
  if (actions['confederationId'] === 'caf') await saveConfGameIds(actions['confederationId'].toUpperCase())
  if (actions['confederationId'] === 'uefa') await saveConfGameIds(actions['confederationId'].toUpperCase())

  if (actions['confederationStats'] === 'concacaf') await saveConfGameStats(actions['confederationStats'].toUpperCase())
  if (actions['confederationStats'] === 'conmebol') await saveConfGameStats(actions['confederationStats'].toUpperCase())
  if (actions['confederationStats'] === 'caf') await saveConfGameStats(actions['confederationStats'].toUpperCase())
  if (actions['confederationStats'] === 'uefa') await saveConfGameStats(actions['confederationStats'].toUpperCase())

  if (actions['confederationStats'] === 'all') {
    const promises = [await saveAllConfGameStats()]
    await Promise.all(promises)
  }
}

run()
