import { stayService } from '../../services/stay-service.js'
export const stay = {
  state: {
    stays: null,
    filterBy: null,
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
      // console.log(state.stays)
    },
    updateStay(state, { newStay }) {
      const idx = state.stays.findIndex((currStay) => currStay._id === newStay._id)
      console.log(newStay._id)
      if (idx !== -1) {
        state.stays.splice(idx, 1, { ...newStay })
      } else {
        console.log('not good shit')
      }
    },
  },
  actions: {
    async loadStays({ commit }) {
      try {
        var stays = await stayService.query(this.filterBy)
        // console.log("here", stays)
        commit({ type: 'setStays', stays })
      } catch (err) {
        console.log('couldnt load stays', err)
      }
    },
    async setFilter({ commit }, { filterBy }) {
      // state.filterBy = filterBy
      try {
        var stays = await stayService.query(filterBy)
        commit({ type: 'setStays', stays })
      } catch (err) {
        console.log(err)
      }
    },
    async updateStay({ commit }, { stay }) {
      stay.isLiked = !stay.isLiked
      // console.log(stay);
      try {
        var newStay = await stayService.updateStay({ ...stay })
        console.log(newStay)
        commit({ type: 'updateStay', newStay })
      } catch (err) {
        console.log('couldnt update stay', err)
      }
    },
  },
  getters: {
    staysForDisplay({ stays }) {
      return stays
    },
    favoritStays({ stays }) {
      return stays.filter((stay) => stay.isLiked)
    },
  },
}
