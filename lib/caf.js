import cafJSON from '../schedule/caf'
import {getAllGameid} from './scraper'

const CAF = 'CAF'

const getCafGames = () => {
  getAllGameid(CAF, cafJSON)
}

export default getCafGames
