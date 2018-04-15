import uefaJSON from '../schedule/uefa'
import {getAllGameid} from './scraper'

const UEFA = 'UEFA'

const getUefaGames = () => {
  getAllGameid(UEFA, uefaJSON)
}

export default getUefaGames
