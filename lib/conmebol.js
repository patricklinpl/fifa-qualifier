import conmebolSchedule from '../schedule/conmebol'
import conmebolGameIds from '../data/gameid/conmebol'
import {getAllGameid, getAllGameStats} from './scraper'

const CONF = 'CONMEBOL'

const saveConmebolGameIds = () => {
  getAllGameid(CONF, conmebolSchedule)
}

const saveConmebolGameStats = () => {
  getAllGameStats(CONF, conmebolGameIds)
}

export {
  saveConmebolGameIds,
  saveConmebolGameStats
}
