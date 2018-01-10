import fetch from 'node-fetch'

export default class PriceChecker {
  async queryValue(howManyEuros) {
    return fetch(`https://blockchain.info/tobtc?currency=EUR&value=${howManyEuros}`)
  }
}