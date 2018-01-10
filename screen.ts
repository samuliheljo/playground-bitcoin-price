import * as blessed from 'blessed'
// @ts-ignore
import * as contrib from 'blessed-contrib'

export default class Screen {
  private screen
  private line

  constructor(howManyEuros, currentValue) {
    const screen = blessed.screen()
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    const line = contrib.line(
      { 
        style:
        { 
          line: "yellow",
          text: "green",
          baseline: "black"
      },
      xLabelPadding: 3,
      xPadding: 5,
      minY: currentValue - (100.0 / howManyEuros),
      maxY: currentValue + (100.0 / howManyEuros),
      label: `Bitcoin price - BTC / ${howManyEuros} EUR`
    })

    screen.append(line)
    this.screen = screen
    this.line = line
  }

  render(data) {
    this.line.setData([data])
    this.screen.render()
  }
}