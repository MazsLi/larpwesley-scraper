const puppeteer = require('puppeteer')

const { fetch, sleep } = require('./utils')

const url_website = 'https://larpwesley.simplybook.asia/v2/#book/count/1/provider/any/'
const url_location = 'https://larpwesley.simplybook.asia/v2/ext/location/'
const url_service = 'https://larpwesley.simplybook.asia/v2/service/'

const locationArr = { 'all': 1 }
const difficultyArr = { 'all': 1, 'easy': 10, 'medium': 11, 'hard': 12 }
const serviceArr = {}

const dateStart = '2021-02-27', dateEnd = '2021-02-27', location = 'all', difficulty = 'easy'

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url_website);

  // locations
  const locations = await fetch(url_location)
  locations.map(item => {
    locationArr[item.name] = item.id
  })
  console.log('location list:', locationArr)
  
  // services
  const services = await fetch(url_service)
  services.map(item => {
    serviceArr[item.id] = item
  })
  console.log(`service list(${services.length}): `, services.map(item => item.name))

  // query script
  let result = {}, count = 0

  console.log(`query condition: ${dateStart} - ${dateEnd}, location: ${location}, difficulty: ${difficulty}`)

  for (const script of services) {
    const { id, name, short_description } = script
    const data = await fetch(getQueryURL(dateStart, dateEnd, locationArr[location], difficultyArr[difficulty], id))
    await sleep(200)
    if (data.length > 0) {
      result[count] = {
        script: id,
        name,
        description: short_description.slice(0, 50) + '...',
        available: data.map(item => item.time)
      }
      count ++
    }
  }

  console.table(result, ['script', 'name', 'available', 'description'])
}

function getQueryURL(dateStart, dateEnd, location, difficulty, script) {
  return `https://larpwesley.simplybook.asia/v2/booking/time-slots/?from=${dateStart}&to=${dateEnd}&location=${location}&category=${difficulty}&provider=any&count=1&booking_id=&service=${script}`
}

main()