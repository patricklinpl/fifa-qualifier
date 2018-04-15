import concacafJSON from '../schedule/concacaf'
import {getAllGameid} from './scraper'

const CONCACAF = 'CONCACAF'

const getConcacafGames = () => {
  getAllGameid(CONCACAF, concacafJSON)
}

export default getConcacafGames
