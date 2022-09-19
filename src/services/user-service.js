import { httpService } from "./http.service.js"
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout
}

// async function getLoggedInUser() {
//     const user =  {
//         _id: "leet1337user",
//         fullname:"James Richardson"
//     }
//     return user
//   }

  async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
    return user
}
async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
    // return user
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedInUser() {
    var user =  JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || {
        _id: "leet1337user",
        username:"geust",
        fullname:"James Richardson"
    }
    console.log("service", user);
    return user
}