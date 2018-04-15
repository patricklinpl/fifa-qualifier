import afcSchedule from '../schedule/afc'
import afcGameIds from '../data/gameid/afc'
import cafSchedule from '../schedule/caf'
import cafGameIds from '../data/gameid/caf'
import concacafSchedule from '../schedule/concacaf'
import concacafGameIds from '../data/gameid/concacaf'
import conmebolSchedule from '../schedule/conmebol'
import conmebolGameIds from '../data/gameid/conmebol'
import interConfSchedule from '../schedule/interConf'
import interConfGameIds from '../data/gameid/inter'
import ofcSchedule from '../schedule/ofc'
import ofcGameIds from '../data/gameid/ofc'
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
  await getAllGameStats('AFC', afcGameIds)
  await getAllGameStats('CAF', cafGameIds)
  await getAllGameStats('CONCACAF', concacafGameIds)
  await getAllGameStats('CONMEBOL', conmebolGameIds)
  await getAllGameStats('INTERCONF', interConfGameIds)
  await getAllGameStats('OFC', ofcGameIds)
  await getAllGameStats('UEFA', uefaGameIds)
}

const determineFiles = (conf) => {
  let schedule = ''
  let ids = ''

  if (conf === 'AFC') {
    schedule = afcSchedule
    ids = afcGameIds
  }

  if (conf === 'CAF') {
    schedule = cafSchedule
    ids = cafGameIds
  }

  if (conf === 'CONCACAF') {
    schedule = concacafSchedule
    ids = concacafGameIds
  }

  if (conf === 'CONMEBOL') {
    schedule = conmebolSchedule
    ids = conmebolGameIds
  }

  if (conf === 'INTER') {
    schedule = interConfSchedule
    ids = interConfGameIds
  }

  if (conf === 'OFC') {
    schedule = ofcSchedule
    ids = ofcGameIds
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
