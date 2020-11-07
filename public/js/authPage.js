window.onload = function() {

    var form = document.getElementById('loginInfo')
    const loginButton = document.getElementById('login')
    const signupButton = document.getElementById('signup')
    
    loginButton.onclick = event => {loginAction(event, form)}
    signupButton.onclick = event => {signupAction(event, form)}
}

/**
 * @param {Event} event submit event
 * @param {HTMLFormElement} form the form with user info
 */
function loginAction(event, form) {
    event.preventDefault()
    console.log('login clicked!');
    form.action = '/login/login'
    form.method = 'POST'
    form.submit()
}

/**
 * @param {Event} event submit event
 * @param {HTMLFormElement} form the form with user info
 */
function signupAction(event, form) {
    //do buttoin stuff
    event.preventDefault()
    console.log('signup clicked!');
    form.action = '/login/signup'
    form.method = 'POST'
    form.submit()
}