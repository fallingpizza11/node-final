const { TestScheduler } = require('jest')

const priceCalc = require('./price-calc')
const fs = require('fs')

test('properly calculates the price of a pizza', () => {
    let pizzaFile = fs.readFileSync('./resource/samplePizzas.json')
    let lookup = fs.readFileSync('./resource/lookup.json')
    console.log(pizzaFile)
    console.log(lookup)
})
