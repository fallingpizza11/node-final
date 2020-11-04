const { TestScheduler } = require('jest')

const priceCalc = require('./price-calc')
const calculator = new priceCalc()

const fs = require('fs')

let pizzaFile = fs.readFileSync('./resource/samplePizzas.json')
let lookupFile = fs.readFileSync('./resource/lookup.json')
let pizzas = JSON.parse(pizzaFile).pizzas
let lookup = JSON.parse(lookupFile)

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[0].pizza, lookup)).toBe("13.44")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[1].pizza, lookup)).toBe("6.72")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[2].pizza, lookup)).toBe("14.56")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[3].pizza, lookup)).toBe("13.44")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[4].pizza, lookup)).toBe("11.20")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[5].pizza, lookup)).toBe("23.52")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[6].pizza, lookup)).toBe("15.12")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[7].pizza, lookup)).toBe("14.56")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[8].pizza, lookup)).toBe("28.00")
})

test('properly calculates the price of a pizza configuration', () => {
    expect(calculator.calculate(pizzas[9].pizza, lookup)).toBe("21.28")
})