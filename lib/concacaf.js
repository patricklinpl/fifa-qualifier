import concacaf from '../schedule/concacaf'
import {getAllGameid} from './scraper'

const CONFEDERATION = 'FIFA.WORLDQ.CONCACAF'

const getConcacafGames = () => {
  getAllGameid(CONFEDERATION, concacaf)
}

export default getConcacafGames
