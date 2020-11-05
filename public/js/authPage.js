window.onload = function() {
    const loginButton = document.getElementById('login')
    const signupButton = document.getElementById('signup')
    
    loginButton.onsubmit = loginAction
    signupButton.onsubmit = signupAction
}

/**
 * @param {Event} event this is an event
 * 
 */
function loginAction(event) {
    event.preventDefault()
}

/**
 * @param {Event} event this is an event
 * 
 */
function signupAction(event) {
    //do buttoin stuff
}