import { createStore } from 'vuex'

import modules from './modules'

const store = createStore({
  modules,
  state : {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    dasboardStats: JSON.parse(localStorage.getItem('dasboardStats')),
    selectedEtablissement: JSON.parse(localStorage.getItem('selectedEtablissement')),
    selectedAnnee: JSON.parse(localStorage.getItem('selectedAnnee')),
    userRamifications: JSON.parse(localStorage.getItem('userRamifications')),
    userEntites: JSON.parse(localStorage.getItem('userEntites')),

  },
  mutations : {
    SET_CURRENT_USER(state, newValue) {
      state.currentUser = newValue
      saveState('currentUser', newValue)
    },
    SET_USER_ENTITES(state, newValue) {
      state.userEntites = newValue
      saveState('setUserEntites', newValue)
    },
    SET_USER_RAMIFICATIONS(state, newValue) {
      state.userRamifications = newValue
      saveState('setUserRamifications', newValue)
    },
    SET_DASHBOARD_STATS(state, newValue) {
      state.dasboardStats = newValue
      saveState('dasboardStats', newValue)
    },
    SET_SELECTED_ETABLISSEMENT(state, newValue) {
      state.selectedEtablissement = newValue
      saveState('selectedEtablissement', newValue)
    },
    SET_SELECTED_ANNEE(state, annee) {
      state.selectedAnnee = annee
    },
    selectedAnnee: state => state.selectedAnnee

  },
  getters : {
    // Whether the user is currently logged in.
    loggedIn(state) {
      return !!state.currentUser
    },

  },
  actions : {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    setUserEntites({ commit }, entites) {
      commit('SET_USER_ENTITES', entites)
    },
    setAnnee({ commit }, annee) {
      commit('SET_SELECTED_ANNEE', annee)
    },
    setUserRamifications({ commit }, ramifications) {
      commit('SET_USER_RAMIFICATIONS', ramifications)
    },

    // Logs in the current user.
    logIn({ commit }, user= {}) {
      commit('SET_CURRENT_USER', user)
    },
    dasboardStats({ commit }, stats= {}) {

      commit('SET_DASHBOARD_STATS', stats)
    },
    setSelectedEtablissement({ commit }, etablissement= {}) {

      commit('SET_SELECTED_ETABLISSEMENT', etablissement)
    },
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store

function saveState(key, state) {
  window.sessionStorage.setItem(key, JSON.stringify(state))
}