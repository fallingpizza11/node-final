class PriceCalc {
    calculate(pizza, lookup) {
        const taxRate = 1.12
        let cost = 0
        if(pizza.cheese.length > 0) {
            for (const cheese in pizza.cheese) {
                if (pizza.cheese.hasOwnProperty(cheese)) {
                    const element = pizza.cheese[cheese];
                    if(lookup.cheese.hasOwnProperty(element)) {
                        cost += lookup.cheese[element]
                    }
                }
            }
        }
        if(pizza.meat.length > 0) {
            for (const meat in pizza.meat) {
                if (pizza.meat.hasOwnProperty(meat)) {
                    const element = pizza.meat[meat];
                    if(lookup.meat.hasOwnProperty(element)) {
                        cost += lookup.meat[element]
                    }
                }
            }
        }
        if(pizza.veg.length > 0) {
            for (const veg in pizza.veg) {
                if (pizza.veg.hasOwnProperty(veg)) {
                    const element = pizza.veg[veg];
                    if(lookup.veg.hasOwnProperty(element)) {
                        cost += lookup.veg[element]
                    }
                }
            }
        }
    
        cost += lookup.size[pizza.size]
        cost += lookup.sauce[pizza.sauce]
        cost += lookup.crust[pizza.crust]

        cost *= taxRate
        return (Math.round(cost * 100) / 100).toFixed(2)
    }
}
// try i might, but i was not able to get ES6 modules working in node
module.exports = PriceCalc