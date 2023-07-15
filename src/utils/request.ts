import axios,{type Method} from 'axios'
import store from '@/store'
import { showToast } from 'vant';
import router from "@/router";
const instance = axios.create({
    baseURL: 'https://consult-api.itheima.net/',
    timeout: 5000
})
//请求拦截
instance.interceptors.request.use((config): any => {
    if (store.state.user?.token && config.headers) {
        config.headers['Authorization'] = `Bearer ${store.state.user?.token}`
    }
    return config
})

//请求拦截器
instance.interceptors.response.use((res): any => {
    if (res.data?.code !== 10000) {
        showToast(res.data?.message)
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    if (err.response.status === 401) {
        store.commit('user/setLogOut')
        showToast('token错误')
        router.push({ path: '/login', query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) } })
    }
    return Promise.reject(err)
}
)


type Data<T> = {
    code: number,
    message: string,
    data: T

}

const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
    return instance.request<T, Data<T>>({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
  }
export default request
