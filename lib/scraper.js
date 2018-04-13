import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import adjustDate from './date'

/**
 * grabs all the game ids for the confederation qualifier
 * @param {string} confederation - official name of the confederation
 * @param {object} confSchedule - date ranges for the confederation qualifier
 * @return {object} data -
 */
const getAllGameid = async (confederation, confSchedule) => {
  const promises = []
  process.setMaxListeners(10000);
  const rounds = Object.keys(confSchedule)
  //const rounds = [Object.keys(confSchedule)[0]]

  rounds.forEach(round => {
    let date = confSchedule[round]['start']
    while (confSchedule[round]['end'] >= date) {
      const scrapeURL = `http://www.espn.com/soccer/scoreboard/_/league/${confederation}/date/${date}`
      promises.push(scrapeGameId(scrapeURL))
      date = adjustDate(date)
      // console.log(date)
    }
  })

  await Promise.all(promises)
}

/**
 * scrapes the game id from the website
 * @param {string} scrapeURL - url to scrape from
 * @return {object} data -
 */
const scrapeGameId = async (scrapeURL) => {
  try {
    const browser = await puppeteer.launch({
      timeout: 0
    })
    const page = await browser.newPage()
    await page.goto(scrapeURL, {
      timeout: 0
    })
    const content = await page.content()
    const $ = cheerio.load(content)
    $('#events').find('article').each((i, elem) => {
      console.log($(elem).attr('id'))
    })
    browser.close()
  } catch (error) {
    console.log(error)
  }
}

export {
  getAllGameid
}
