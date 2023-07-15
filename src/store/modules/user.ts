import type { User } from '@/types/user'
const state = () => {
  return {
    token: '',
    avatar: '',
    mobile: '',
    account: '',
    id: ''
  } as User}
const mutations = {
  //登陆
  setUserInfo(state: User, userInfo: User) {
    for(const key in state){
      if(Object.keys(state).includes(key)){
        state[key] = userInfo[key]
      }
    }
  },
  //退出登录
  setLogOut(state: User) {
    Object.keys(state).forEach((key)=>{
      state[key] = ''
    })
    console.log(state)
  }
}
const actions = {
    handelLogin({commit}:any,payload:any){
        commit('setUserInfo',payload)
    }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
