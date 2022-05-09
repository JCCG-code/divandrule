import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    web3Provider: null,
    networkId: null,
    userAddress: null,
    userBalance: null
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getWeb3Provider(state) {
      return state.web3Provider
    },
    getNetworkId(state) {
      return state.networkId
    },
    getUserAddress(state) {
      return state.userAddress
    },
    getUserBalance(state) {
      return state.userBalance
    }
  },
  mutations: {
    setUser(state, newState) {
      state.user = newState
    },
    setWeb3Provider(state, newState) {
      state.web3Provider = newState
    },
    setNetworkId(state, newState) {
      state.networkId = newState
    },
    setUserAddress(state, newState) {
      state.userAddress = newState
    },
    setUserBalance(state, newState) {
      state.userBalance = newState
    }
  },
  actions: {
    loadUser({commit}, param) {
      commit('setUser', param)
    },
    loadWeb3Provider({commit}, param) {
      commit('setWeb3Provider', param)
    },
    loadNetworkId({commit}, param) {
      commit('setNetworkId', param)
    },
    loadUserAddress({commit}, param) {
      commit('setUserAddress', param)
    },
    loadUserBalance({commit}, param) {
      commit('setUserBalance', param)
    }
  },
  modules: {
  }
})
