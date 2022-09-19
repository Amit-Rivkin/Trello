import { createStore } from 'vuex'
// import { stay } from './modules/stay.js'
// import { order } from './modules/order.js'
import { user } from './modules/user.js'

export const store = createStore({
  strict: true,
  state: {
    isOpenModalFilter: false,
  },
  getters: {
    getIsOpenModalFilter({ isOpenModalFilter }) {
      return isOpenModalFilter
    },
  },
  mutations: {
    onOpenModalFiter(state) {
      state.isOpenModalFilter = true
    },
  },
  actions: {},
  modules: {
    // stay,
    // order,
    user,
  },
})
