import { setTimeout } from 'timers'
/**
 * delay function to help improve performance
 * @param {number} timeout - seconds to delay
 * @return {Promise}
 */
const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export default delay
