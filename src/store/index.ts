import { createStore } from "vuex";
import user from './modules/user';
import getters from '@/store/getters';
const PERSIST_PATHS = ['user.token']
import createPersistedstate  from 'vuex-persistedstate'
const store:any = createStore({
    modules: {
        user,
    },
    getters,
    plugins:[
        createPersistedstate({
          key:'token',// 存数据的key名   自定义的  要有语义化
          paths: PERSIST_PATHS // 要把那些模块加入缓存
        }) 
      ]
    
})

export default store