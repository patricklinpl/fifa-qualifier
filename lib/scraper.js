import fs from 'fs'
import mkdirp from 'mkdirp'
import puppeteer from 'puppeteer'
import axios from 'axios'
import cheerio from 'cheerio'
import Promise from 'bluebird'
import adjustDate from './date'

/**
 * grabs all the game ids for the confederation qualifier
 * @param {string} confederation - official name of the confederation
 * @param {object} confSchedule - date ranges for the confederation qualifier
 */
const getAllGameid = async (confederation, confSchedule) => {
  console.log(`[${confederation}] Start update of game ids`)
  console.log(`[${confederation}] processing...`)

  const urls = []
  const gameids = []
  // const browser = await puppeteer.launch({ timeout: 0 })
  const browser = await puppeteer.launch({ timeout: 0, headless: false })
  const page = await browser.newPage()

  const rounds = Object.keys(confSchedule)
  rounds.forEach((round, index) => {
    let date = confSchedule[round]['start']
    while (confSchedule[round]['end'] >= date) {
      let scrapeURL = `http://www.espn.com/soccer/scoreboard/_/league/FIFA.WORLDQ.${confederation}/date/${date}`
      if (confederation === 'INTER') scrapeURL = `http://www.espn.com/soccer/scoreboard/_/league/FIFA.WORLDQ.${rounds[index]}/date/${date}`
      if (confederation === 'FRIENDLY') scrapeURL = `http://www.espn.com/soccer/scoreboard/_/league/FIFA.${confederation}/date/${date}`
      urls.push(scrapeURL)
      date = adjustDate(date)
    }
  })

  console.log(`[${confederation}] Parsed links ${urls.length}`)

  await Promise.map(urls, async scrapeURL => { await scrapeGameId(page, scrapeURL, gameids) }, {concurrency: 1})

  browser.close()

  await saveGameIdFile(confederation, gameids)
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
    console.log(`scraping ${scrapeURL}` )
    const content = await page.content()
    const $ = cheerio.load(content)
    $('#events').find('article').each((i, elem) => {
      gameids.push($(elem).attr('id'))
    })
  } catch (error) {
    console.log(scrapeURL)
    console.log(error)
  }
}

/**
 * saves or updates the game ids in a json file locally
 * @param {string} confederation - official name of the confederation
 * @param {array} gameids - all the game ids for the confederation
 */
const saveGameIdFile = async (confederation, gameids) => {
  console.log(`[${confederation}] Scraped rows: ${gameids.length}`)
  const json = JSON.stringify({id: gameids})
  if (!fs.existsSync('data/gameid')) {
    await mkdirp('data/gameid', (err) => {
      if (err) console.error(err)
      else console.log('Create path')
    })
  }

  await fs.writeFile(`data/gameid/${confederation}.json`, json, 'utf8', (err) => {
    if (err) throw err
    console.log(`[${confederation}] The file has been saved!`)
    console.log(`[${confederation}] End update of game ids`)
  })
}

/**
 * grabs all the game stats for the confederation qualifier
 * @param {string} confederation - official name of the confederation
 * @param {object} confGameIds - all the game ids for the confederation
 */
const getAllGameStats = async (confederation, confGameIds) => {
  console.log(`[${confederation}] Start update of game summaries`)
  console.log(`[${confederation}] processing...`)

  const confSummarys = []

  await Promise.map(confGameIds['id'], async gameid => {
    const scrapeURL = `http://www.espn.com/soccer/matchstats?gameId=${gameid}`
    await scrapeGameSummary(scrapeURL, gameid, confSummarys)
  })

  await saveGameSummary(confederation, confSummarys)
}

/**
 * scrapes the game summary
 * @param {string} scrapeURL - url to scrape from
 * @param {string} gameid -  game id
 * @param {array} confSummarys -  all games in the confederation
 */
const scrapeGameSummary = async (scrapeURL, gameid, confSummarys) => {
  try {
    let response = await axios.get(scrapeURL)
    let $ = cheerio.load(response.data)

    // #################### TEAM 1 ######################
    const team1 = $('.away').find('.long-name').text()
    const team1Score = $('.away').find('.score').text().replace(/\s/g, '')
    const team1Fouls = $('.stat-list').find('td[data-home-away=home][data-stat=foulsCommitted]').text()
    let team1Yellows = $('.stat-list').find('td[data-home-away=home][data-stat=yellowCards]').text()
    let team1Reds = $('.stat-list').find('td[data-home-away=home][data-stat=redCards]').text()
    const team1Offsides = $('.stat-list').find('td[data-home-away=home][data-stat=offsides]').text()
    const team1Corners = $('.stat-list').find('td[data-home-away=home][data-stat=wonCorners]').text()
    const team1Saves = $('.stat-list').find('td[data-home-away=home][data-stat=saves]').text()
    const team1Possession = $('.stat-graph').find('span[data-home-away=home][data-stat=possessionPct]').text()
    const team1ShotsAndGoal = $('.data-vis-container').find('span[data-home-away=home][data-stat=shotsSummary]').text()
    const team1Shots = team1ShotsAndGoal.slice(0, team1ShotsAndGoal.indexOf('('))
    const team1OnGoal = team1ShotsAndGoal.slice(team1ShotsAndGoal.indexOf('(') + 1, team1ShotsAndGoal.length - 1)

    // #################### TEAM 2 ######################
    const team2 = $('.home').find('.long-name').text()
    const team2Score = $('.home').find('.score').text().replace(/\s/g, '')
    const team2Fouls = $('.stat-list').find('td[data-home-away=away][data-stat=foulsCommitted]').text()
    let team2Yellows = $('.stat-list').find('td[data-home-away=away][data-stat=yellowCards]').text()
    let team2Reds = $('.stat-list').find('td[data-home-away=away][data-stat=redCards]').text()
    const team2Offsides = $('.stat-list').find('td[data-home-away=away][data-stat=offsides]').text()
    const team2Corners = $('.stat-list').find('td[data-home-away=away][data-stat=wonCorners]').text()
    const team2Saves = $('.stat-list').find('td[data-home-away=away][data-stat=saves]').text()
    const team2Possession = $('.stat-graph').find('span[data-home-away=away][data-stat=possessionPct]').text()
    const team2ShotsAndGoal = $('.data-vis-container').find('span[data-home-away=away][data-stat=shotsSummary]').text()
    const team2Shots = team2ShotsAndGoal.slice(0, team2ShotsAndGoal.indexOf('('))
    const team2OnGoal = team2ShotsAndGoal.slice(team2ShotsAndGoal.indexOf('(') + 1, team2ShotsAndGoal.length - 1)

    // #################### No Summaries ######################
    if (!team1Yellows & !team1Reds & !team2Yellows & !team2Reds) {
      response = await axios.get(`http://www.espn.com/soccer/match?gameId=${gameid}`)
      $ = cheerio.load(response.data)

      team1Yellows = $('.details[data-event-home-away=home]').find('li[data-events-type=yellow-card]').length
      team1Reds = $('.details[data-event-home-away=home]').find('li[data-events-type=red-card]').length

      team2Yellows = $('.details[data-event-home-away=away]').find('li[data-events-type=yellow-card]').length
      team2Reds = $('.details[data-event-home-away=away]').find('li[data-events-type=red-card]').length
    }

    confSummarys.push({
      'espnGameLink': scrapeURL,
      'espnGameId': gameid,
      'team1': team1,
      'team1Score': team1Score,
      'team2': team2,
      'team2Score': team2Score,
      'team1Fouls': team1Fouls,
      'team1Yellows': team1Yellows,
      'team1Reds': team1Reds,
      'team1Offsides': team1Offsides,
      'team1Corners': team1Corners,
      'team1Saves': team1Saves,
      'team1Possession': team1Possession,
      'team1Shots': team1Shots,
      'team1OnGoal': team1OnGoal,
      'team2Fouls': team2Fouls,
      'team2Yellows': team2Yellows,
      'team2Reds': team2Reds,
      'team2Offsides': team2Offsides,
      'team2Corners': team2Corners,
      'team2Saves': team2Saves,
      'team2Possession': team2Possession,
      'team2Shots': team2Shots,
      'team2OnGoal': team2OnGoal
    })
  } catch (error) {
    console.log(scrapeURL)
    console.log(error)
  }
}

/**
 * save game summaries of the conferation as a csv locally
 * @param {string} confederation - official name of the confederation
 * @param {array} confSummarys - scraped game summaries for the confederation
 */
const saveGameSummary = async (confederation, confSummarys) => {
  if (!fs.existsSync('data/summary')) {
    await mkdirp('data/summary', (err) => {
      if (err) console.error(err)
      else console.log('Create path')
    })
  }

  const header = Object.keys(confSummarys[0])
  const filterSummary = confSummarys.filter(match => (match['team1Score'].length > 0))
  let csv = filterSummary.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')

  await fs.writeFile(`data/summary/${confederation}.csv`, csv, 'utf8', (err) => {
    if (err) throw err
    console.log(`[${confederation}] The file has been saved!`)
    console.log(`[${confederation}] End update of game summaries`)
  })
}

export {
  getAllGameid,
  getAllGameStats
}
