import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//Need to refactor and add mutations action but for quick state refs
const store = new Vuex.Store({
  state: {
    extractCount:200,
    extractColunm:'7_2009',
    config: {
        lang: {
            modalChartTitle:"Bedford's law ",
            modalChartDesc:"Frequency of first significant digit of physical constants plotted against Benford's law",
            modalBtn1:"Check Bedford's Law"
        }
    }
  },
})

export default store;
