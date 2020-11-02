// By Isaac Giuricich
const request = new XMLHttpRequest()
const url = '/api/orders'

async function getPizza(orderId) {
    response = await fetch(url + '/' + orderId, {
        credentials: 'same-origin'
    })
    return response.json()
}

function sendPizza(pizza) {
    // did not have time to turn this into a fetch post request, otherwise this would not be here
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let savedPizza = JSON.parse(request.response)._id
            window.location = `/review/${savedPizza}`
        }
    }
    request.send(pizza)
}

async function updatePizza(orderId) {
    response = await fetch(url + '/' + orderId, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify({ status: 'confirmed' })
    })
    return response
}

async function deletePizza(orderId) {
    response = await fetch(url + '/' + orderId, {
        credentials: 'same-origin',
        method: 'DELETE'
    })
    return response
}

function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// ======================================= when the page loads ============================================
window.onload = function() {
    const path = window.location.pathname.split('/')
    if(path[1] === "") {
        document.getElementById('pizza-form').onsubmit = function(event){
    
            event.preventDefault()
    
            let formData = new FormData(document.getElementById('pizza-form'))
            
            let size = formData.get('size')
            let sauce = formData.get('sauce')
            let crust = formData.get('crust')
    
            let cheese = formData.getAll('cheese')
            let meat = formData.getAll('meat')
            let veg = formData.getAll('veg')
    
            let stringy = JSON.stringify({
                size: size,
                sauce: sauce,
                crust: crust,
                cheese: cheese,
                meat: meat,
                veg: veg
            })
            sendPizza(stringy)
        }
    } 
    else if(path[1] === 'review') {
        if(path.length >= 3) {

            const section = document.getElementsByClassName('review')[0]
            const jsonData = document.createElement('pre')
            const orderId = path[2]

            // 'looks good' button functionality
            document.getElementById('the-butt').onclick = () => {
                updatePizza(orderId)
                .then( () => {
                    window.location =  '/thank'
                })
                .catch(err => console.log('there has been an error: ' + err))
            }
            
            // go back button functionality
            document.getElementById('delete').onclick = () => {
                deletePizza(orderId)
                .then( (res) => {
                    window.location = '/'
                })
                .catch( err => console.log('there has been an error: ' + err))
            }

            // this puts data on the page 
            getPizza(orderId)
            .then(data => {
                let tastyPizza = JSON.parse(JSON.stringify(data.pizza, ['size', 'crust', 'sauce', 'cheese', 'meat', 'veg']))

                for (const key in tastyPizza) {
                    if (tastyPizza.hasOwnProperty(key)) {
                        const element = tastyPizza[key]
                        if (element.length > 0) {
                        const elementTitle = document.createElement('h3')
                        elementTitle.innerHTML = titleCase(key)
                        const elementOption = document.createElement('p')
                        elementOption.innerHTML = element
                        section.appendChild(elementTitle)
                        section.appendChild(elementOption)
                        }
                    }
                }
                const elementTitle = document.createElement('h3')
                elementTitle.innerHTML = 'Cost'
                const elementOption = document.createElement('p')
                elementOption.innerHTML = '$ ' + data.price
                section.appendChild(elementTitle)
                section.appendChild(elementOption)
            })
            .catch( err => console.log('there has been an error: ' + err))
        }
    }
}
