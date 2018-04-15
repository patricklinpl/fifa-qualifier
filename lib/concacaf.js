import concacaf_JSON from '../schedule/concacaf'
import {getAllGameid} from './scraper'

const CONCACAF = 'CONCACAF'

const getConcacafGames = () => {
  getAllGameid(CONCACAF, concacaf_JSON)
}

export default getConcacafGames
