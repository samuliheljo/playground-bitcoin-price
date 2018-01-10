import * as moment from 'moment'

import Screen from './screen'
import PriceChecker from './price-checker'

const HOW_MANY_EUROS = 10000

const pc = new PriceChecker()
let screen

const priceHistory = {
  x: [],
  y: []
}

const getTime = () => {
  return moment().format('hh:mm:ss');    
}

const update = () => {
  const value = pc.queryValue(HOW_MANY_EUROS)
    .then(res => res.json())
    .then(json => {
      priceHistory.x.push(getTime())
      priceHistory.y.push(json)
    })
    .then(_ => {
      if(!screen) {
        screen = new Screen(HOW_MANY_EUROS, priceHistory.y[0])
      }
      screen.render(priceHistory)
    })
    .catch(e => {
      console.log(e)
    })

}

update()
setInterval(update, 10000)
