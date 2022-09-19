import { userService } from '../../services/user-service.js'
export const user = {
    state: {
        user : null,
    },
    mutations: {
     setUser(state, {user}){
        state.user = user
     },
     setLoggedinUser(state, { user }) {
        state.user = (user)? {...user} : {
            _id: "leet1337user",
            username:"geust",
            fullname:"James Richardson"
        }
        console.log("on store set logged in user", state.user);
    },
    },
    actions:{
        async loadUser({commit}){
            try{
                var user = userService.getLoggedInUser()
                // console.log("here", user)
                commit({type:'setUser', user})
            }
            catch(err){
                console.log("couldnt load user", err)
            }
        },
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                console.log("on store", user);
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: {
                    _id: "leet1337user",
                    username:"geust",
                    fullname:"James Richardson"
                } })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },        
    },
    getters: {
        getLoggedInUser({user}){
            return user
        }
    }
  }