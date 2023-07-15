import type { User,UserInfo,PatientList,Patient } from '@/types/user'
import  request  from '@/utils/request'


//密码登陆接口
export const loginByPassword = (mobile:string,password:string)=>{
    return request<User>('login/password','post',{mobile,password})
}
//验证码接口
export const getCodeId = (mobile:string,type:string)=>{
    return request<any>('code','get',{mobile,type})
}
//验证码登陆
export const loginByCode = (mobile:string,code:number|string)=>{
    return request<User>('login','post',{mobile,code})
}
//获取个人信息
export const getPersonInfo = ()=>{
    return request<UserInfo>('patient/myUser','get')
}
// 获患者信息列表
export const getPatientList = () => request<PatientList>('/patient/mylist')
//添加患者
export const addPatient = (data:Patient) => request<{id:string}>('patient/add','post',data)
// 编辑患者信息
export const editPatient = (patient: Patient) => request('/patient/update', 'PUT', patient)
// 删除患者信息
export const delPatient = (id:number|string) => request(`patient/del/${id}`, 'delete')

