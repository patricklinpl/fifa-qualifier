import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import 'babel-polyfill'

const scraper = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://www.espn.com/soccer/scoreboard/_/league/FIFA.WORLDQ.AFC/date/20150312')

    const textContent = await page.evaluate(() => {
      return document.querySelector('#events').textContent
    })

    console.log(textContent)

    browser.close()
  } catch (error) {
    console.log(error)
  }
}

scraper()
