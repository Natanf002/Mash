// Get form elements
const form = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

async function login(username, password)
{
    const options = {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Username: username,
            Password: password,
        }),
        method: 'POST',
    };
    const response = await fetch('/login', options)
    const data = await response.json();
    
    // Store the User object in the browser
    const User = data.User
    console.log("Heres the actual data ", data)
    console.log('[DEBUG] Saving User: ', User)

   
    if(response.ok){
        if (localStorage.getItem("Username") != username) {
            console.log(localStorage.getItem("Username"))
            console.log(username)
            localStorage.clear()
        }
        for (const key in User) {
            localStorage.setItem(key, User[key]);
        }
        localStorage.setItem('User', JSON.stringify(User))
        window.location.href = 'home.html';

    }

    // return the data for debugging
    return data;
}


async function formSubmitHandler(event) {
// Prevent default form submission
    event.preventDefault();

    // Get username and password from input fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Use the username and password as needed (e.g., send a request to the server)
    console.log("[DEBUG] user entered Username:", username);
    console.log("[DEBUG] user entered Password:", password);

    // Clear input fields (optional)
    usernameInput.value = '';
    passwordInput.value = '';

    await login(username, password);

    // redirect to home page
   //window.location.href = 'home.html';
}

// Event listener for form submission
form.onsubmit = formSubmitHandler;
