import Vue from 'vue'
import Vuex from 'vuex'
import { data as levels } from './mockLevels.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    levels,
    currentLevel: null,
    currentPoints: 2512,
    nextPoints: 0,
    levelsCount: 6
  },
  mutations: {
    setLevel(state, payload) {
      state.currentLevel = payload
    },
    setPoints(state, payload) {
      state.currentPoints = payload
    },
    setLevelsCount(state, payload) {
      state.levelsCount = payload
    }
  },
  getters: {
    getLevels(state) {
      return state?.levels.slice(0, state.levelsCount)
    },
    getPoints(state) {
      return state?.currentPoints
    },
    getCurrentLevel(state) {
      return state?.currentLevel
    }
  }
})