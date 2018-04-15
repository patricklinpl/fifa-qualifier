import cafSchedule from '../schedule/caf'
import cafGameIds from '../data/gameid/caf'
import {getAllGameid, getAllGameStats} from './scraper'

const CONF = 'CAF'

const saveCafGameIds = () => {
  getAllGameid(CONF, cafSchedule)
}

const saveCafGameStats = () => {
  getAllGameStats(CONF, cafGameIds)
}

export {
  saveCafGameIds,
  saveCafGameStats
}
