/**
 * increments the date correctly
 * @param {number} date - date to increment
 * @return {number} data - incremented date
 */
const adjustDate = (date) => {
  let YEAR = date.toString().slice(0, 4)
  let MONTH = date.toString().slice(4, 6)
  let DATE = date.toString().slice(6, date.length)

  if (['01', '03', '05', '07', '08', '10', '12'].indexOf(MONTH) > -1 && DATE === '31') {
    return adjustThirtyOneMonths(YEAR, MONTH)
  }

  if (['04', '06', '09', '11'].indexOf(MONTH) > -1 && DATE === '30') {
    return adjustThirtyMonths(YEAR, MONTH)
  }

  if (MONTH === '02' && (DATE === '28' || DATE === '29')) {
    return adjustLeapYear(YEAR, MONTH, DATE)
  }

  return date + 1
}

/**
 * adjust months with 31 days
 * @param {string} year
 * @param {string} month
 * @return {number} date - incremented date
 */
const adjustThirtyOneMonths = (year, month) => {
  let adjustYear = year
  let adjustMonth = month

  if (month === '12') {
    adjustMonth = '1'
    adjustYear = parseInt(year) + 1
  } else {
    adjustMonth = parseInt(month) + 1
  }

  if (['10, 11, 12'].indexOf(adjustMonth) > -1) {
    return parseInt(`${adjustYear}${adjustMonth}01`)
  }

  return parseInt(`${adjustYear}0${adjustMonth}01`)
}

/**
 * adjust months with 30 days
 * @param {string} year
 * @param {string} month
 * @return {number} date - incremented date
 */
const adjustThirtyMonths = (year, month) => {
  let adjustMonth = month
  adjustMonth = parseInt(month) + 1

  if (['10, 11, 12'].indexOf(adjustMonth) > -1) {
    return parseInt(`${year}${adjustMonth}01`)
  }

  return parseInt(`${year}0${adjustMonth}01`)
}

/**
 * adjust for leap year in February
 * @param {string} year
 * @param {string} month
 * @param {string} date
 * @return {number} date - incremented date
 */
const adjustLeapYear = (year, month, date) => {
  let adjustYear = parseInt(year)
  let adjustMonth = month

  if (((adjustYear % 4 === 0) && (adjustYear % 100 !== 0)) || (adjustYear % 400 === 0)) {
    if (date === '29') {
      adjustMonth = parseInt(month) + 1
      return parseInt(`${year}0${adjustMonth}01`)
    } else {
      return parseInt(`${year}${month}${date}`) + 1
    }
  }

  adjustMonth = parseInt(month) + 1
  return parseInt(`${adjustYear}0${adjustMonth}01`)
}

export default adjustDate
