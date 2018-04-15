import concacafSchedule from '../schedule/concacaf'
import concacafGameIds from '../data/gameid/concacaf'
import cafSchedule from '../schedule/caf'
import cafGameIds from '../data/gameid/caf'
import conmebolSchedule from '../schedule/conmebol'
import conmebolGameIds from '../data/gameid/conmebol'
import uefaSchedule from '../schedule/uefa'
import uefaGameIds from '../data/gameid/uefa'
import {getAllGameid, getAllGameStats} from './scraper'

const saveConfGameIds = async (conf) => {
  const detObj = determineFiles(conf)
  await getAllGameid(conf, detObj['schedule'])
}

const saveConfGameStats = async (conf) => {
  const detObj = determineFiles(conf)
  await getAllGameStats(conf, detObj['ids'])
}

const saveAllConfGameStats = async () => {
  await getAllGameStats('CONCACAF', concacafGameIds)
  await getAllGameStats('CAF', cafGameIds)
  await getAllGameStats('CONMEBOL', conmebolGameIds)
  await getAllGameStats('UEFA', uefaGameIds)
}

const determineFiles = (conf) => {
  let schedule = ''
  let ids = ''

  if (conf === 'CONCACAF') {
    schedule = concacafSchedule
    ids = concacafGameIds
  }

  if (conf === 'CAF') {
    schedule = cafSchedule
    ids = cafGameIds
  }

  if (conf === 'CONMEBOL') {
    schedule = conmebolSchedule
    ids = conmebolGameIds
  }

  if (conf === 'UEFA') {
    schedule = uefaSchedule
    ids = uefaGameIds
  }

  return {
    'schedule': schedule,
    'ids': ids
  }
}

export {
  saveConfGameIds,
  saveConfGameStats,
  saveAllConfGameStats
}
