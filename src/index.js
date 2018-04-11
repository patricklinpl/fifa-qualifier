import axios from 'axios'
import cheerio from 'cheerio'
import 'babel-polyfill'

const scraper = async () => {
  try {
    const response = await axios.get('')
    const $ = cheerio.load(response.data)
    console.log($.html())
  } catch (error) {
    console.log(error)
  }
}

scraper()
