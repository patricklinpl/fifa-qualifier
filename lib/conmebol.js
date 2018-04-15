import conmebolJSON from '../schedule/conmebol'
import {getAllGameid} from './scraper'

const CONMEBOL = 'CONMEBOL'

const getConmebolGames = () => {
  getAllGameid(CONMEBOL, conmebolJSON)
}

export default getConmebolGames
