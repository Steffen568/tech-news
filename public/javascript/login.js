// function for sigup form. take data from front end and pass to database 
async function signupFormHandler(event) {
    event.preventDefault()

    const username = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    if(username && email && password) {
        // using async/await and setting response to promise allows us to get rid of .then() and .catch()
       const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status. replaces error code
        if (response.ok) {
            console.log("success")
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)

// function for user login 
async function loginFormHandler(event) {
    event.preventDefault()

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    if(email && password) {
        const response = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)