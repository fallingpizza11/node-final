const url = '/api/orders/history'

window.onload = function() {
    /**
     * @param {HTMLElement} historySection shows the order history
     */
    const historySection = document.querySelector('.history')
    const newElement = document.createElement('pre')

    getPizzas()
    .then(data => {
        let output= []
        data.reverse()
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const order = data[key];
                if(order.status === 'confirmed') {
                    let tastyPizza = JSON.parse(JSON.stringify(order.pizza, ['size', 'crust', 'sauce', 'cheese', 'meat', 'veg']))

                    // debug
                    //console.log('key = ', key, 'elem = ', order);

                    output.push('<article>')

                    output.push('<h3>Order Number</h3>') 
                    output.push('<p>' + order._id + '</p>')

                    for (const option in tastyPizza) {
                        if (tastyPizza.hasOwnProperty(option)) {
                            let choise = tastyPizza[option];
                            if(choise.length > 0) {
                                if(choise.constructor === Array) {
                                    output.push('<h3>' + titleCase(option) + '</h3>')
                                    output.push('<p>' + choise.join(', ') + '</p>')
                                } 
                                else {
                                    output.push('<h3>' + titleCase(option) + '</h3>')
                                    output.push('<p>' + choise + '</p>')
                                }
                            }
                        }
                    }
                    output.push('<h3>Price</h3>')
                    output.push('<p>$' + (Math.round(order.price * 100) / 100).toFixed(2) + '</p>')
                    output.push('</article>')
                }
            }
        }
        historySection.innerHTML = output.join('')
    })
    .catch(err => {
        const output = JSON.stringify(err)
        newElement.innerHTML = 'There has been an error' + output
        historySection.appendChild(newElement)
    })

    
}

function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


async function getPizzas() {
    response = await fetch(url, {
        credentials: 'same-origin'
    })
    return response.json()
}
