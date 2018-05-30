import * as types from './mutation-types'
import state from './state'
const mutations = {
  [types.SET_SLOT](state,data) {
    console.log(999999,data)
    state.slotInfor = data
  },
  
}

export default mutations
