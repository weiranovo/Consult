<template>
    <div class="icons">
        <cpIcon name="consult-alipay"></cpIcon>
        <cp-icon name="home-order"></cp-icon>
    </div>
</template>
<script setup lang="ts">
// import { useStore } from "vuex";
import request from '@/utils/request'
import { computed } from 'vue';
// import cpNavBar from "@/components/cp-nav-bar.vue";
// const store = useStore()
// const login = async () => {
//   const res = await request<any>('/login/password', 'POST', {
//     mobile: '13211112222',
//     // 密码 abc123456 测试：出现非10000的情况
//     password: 'abc12345'
//   })
//   if(res.code == 10000){
//     await store.dispatch('user/handelLogin',res.data)
//     console.log(store)
//   }
// }
// login()
// const getUserInfo = async () => {
//     const res = await request('/patient/myUser')
//     console.log(res)
// }
// getUserInfo()

// const a = 'abcd'
// const b = 'efgh'
// // const mixx = computed({
// //     get(){
// //         return a+b
// //     },
// //     set(value){
// //         console.log('123')
// //         console.log(val)
// //     },
// // })
// console.log(mixx.value)

// let arr1 = [{name:'zhangfei',age:20},{name:'zhangfei',age:21},{name:'zhangfei',age:22}]
// let arr2 = []
// arr2.push([...arr1])
// console.log(arr2)

import { showToast } from 'vant';

showToast('提示内容');
</script>

<style scoped lang="scss">
:deep(.van-cell__value) {
    color: gold;
    width: 3px;
}
.icons{
    .cp-icon{
        font-size: 30px;
    }   
}
</style>