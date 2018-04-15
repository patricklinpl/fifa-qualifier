import uefaSchedule from '../schedule/uefa'
import uefaGameIds from '../data/gameid/uefa'
import {getAllGameid, getAllGameStats} from './scraper'

const CONF = 'UEFA'

const saveUefaGameIds = () => {
  getAllGameid(CONF, uefaSchedule)
}

const saveUefaGameStats = () => {
  getAllGameStats(CONF, uefaGameIds)
}

export {
  saveUefaGameIds,
  saveUefaGameStats
}
