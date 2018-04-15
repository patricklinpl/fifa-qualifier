import fs from 'fs'
import mkdirp from 'mkdirp'
import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import delay from './util'
import adjustDate from './date'

/**
 * grabs all the game ids for the confederation qualifier
 * @param {string} confederation - official name of the confederation
 * @param {object} confSchedule - date ranges for the confederation qualifier
 */
const getAllGameid = async (confederation, confSchedule) => {
  console.log(`Start update ${confederation}`)
  console.log(`processing...`)

  process.setMaxListeners(10000)

  const promises = []
  const gameids = []
  const browser = await puppeteer.launch({ timeout: 0, headless: false })

  const rounds = Object.keys(confSchedule)
  // const rounds = [Object.keys(confSchedule)[5]]
  rounds.forEach((round, index) => {
    let date = confSchedule[round]['start']
    while (confSchedule[round]['end'] >= date) {
      const scrapeURL = `http://www.espn.com/soccer/scoreboard/_/league/FIFA.WORLDQ.${confederation}/date/${date}`
      promises.push(browser.newPage().then(async page => {
        await delay(index * 20000)
        await scrapeGameId(page, scrapeURL, gameids)
      }))
      date = adjustDate(date)
    }
  })

  await Promise.all(promises)
  browser.close()

  await saveFile(confederation, gameids)
}

/**
 * scrapes the game id from the website
 * @param {object} page - puppeteer page
 * @param {string} scrapeURL - url to scrape from
 * @param {array} gameids - list of game ids
 */
const scrapeGameId = async (page, scrapeURL, gameids) => {
  try {
    await page.goto(scrapeURL, { timeout: 0 })
    const content = await page.content()
    const $ = cheerio.load(content)
    $('#events').find('article').each((i, elem) => {
      gameids.push($(elem).attr('id'))
    })
    await page.close()
  } catch (error) {
    console.log(scrapeURL)
    console.log(error)
  }
}

/**
 * saves or updates the game ids in a json file locally
 * @param {string} confederation - official name of the confederation
 * @param {array} scrapeURL - array of scraped game ids
 */
const saveFile = async (confederation, gameids) => {
  const json = JSON.stringify({id: gameids})
  if (!fs.existsSync('data/gameid')) {
    await mkdirp('data/gameid', (err) => {
      if (err) console.error(err)
      else console.log('Create path')
    })
  }

  await fs.writeFile(`data/gameid/${confederation}.gameid.json`, json, 'utf8', (err) => {
    if (err) throw err
    console.log('The file has been saved!')
    console.log(`End update ${confederation}`)
  })
}

export {
  getAllGameid
}
