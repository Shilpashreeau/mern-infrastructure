// import { getToken } from "./users-service";


//* The users-service.js module will definitely need to make AJAX requests to the Express server.

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

// * handleSubmit <--->[signUp]users-service <-->[signUp]-users-api <- Internet->server.js[Express]

/*export async function signUp(userData){
const BASE_URL='/api/users';
const res=await fetch(BASE_URL,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(userData) //userData is  javascript object from signup form so converting it into string in order to send over internet to work in backend
});

if(res.ok){
return res.json(); //JWT Token

} else{
throw new Error('Invalid Sign Up!')
}
}
//* handleSubmit <--->[login]users-service <-->[login]-users-api <- Internet->server.js[Express]
//* Login
export async function login(credentials) {
    const BASE_URL = '/api/users';

    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Invalid Sign In!')
    }
}*/

//*=================================OR below is the  refactored code
// * The users-service.js module will definitely need to make AJAX requests to the Express server.

import { getToken } from "./users-service";

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)


const BASE_URL = '/api/users';

//* SignUp
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}


//* Login
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//* Check Token
export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
} 

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
// this is to send the token to backend through Authorization 
  const token = getToken();

  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
