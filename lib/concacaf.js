import concacafSchedule from '../schedule/concacaf'
import concacafGameIds from '../data/gameid/concacaf'
import {getAllGameid, getAllGameStats} from './scraper'

const CONF = 'CONCACAF'

const saveConcacafGameIds = () => {
  getAllGameid(CONF, concacafSchedule)
}

const saveConcacafGameStats = () => {
  getAllGameStats(CONF, concacafGameIds)
}

export {
  saveConcacafGameIds,
  saveConcacafGameStats
}
