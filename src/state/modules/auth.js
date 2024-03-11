
export const state = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),

}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('currentUser', newValue)
    }
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    }
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars


    // Logs in the current user.
    logIn({ commit }, user= {}) {

        commit('SET_CURRENT_USER', user)
    },




}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
