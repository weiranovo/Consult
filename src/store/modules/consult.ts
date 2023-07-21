import type { PartialConsult } from '@/types/consult'
import { ConsultType } from '@/enums'
const state = () => ({})
const mutations = {
    // 设置问诊类型
    setType(state: PartialConsult, type: ConsultType) {
        state.type = type
    },
    // 设置极速问诊类型
    setIllnessType(state: PartialConsult, illnessType: 0 | 1) {
        state.illnessType = illnessType
        console.log(state.type,state.illnessType)
    },
    // 设置科室
    setDep(state: PartialConsult, depId: string) {
        state.depId = depId
    },
    // 设置病情描述
    setIllness(state: PartialConsult, illness: Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>) {
        state.consultFlag = illness.consultFlag
        state.illnessDesc = illness.illnessDesc
        state.illnessTime = illness.illnessTime
        state.pictures = illness.pictures
    },
    // 设置患者
    setPatient(state: PartialConsult, patientId: string) {
        state.patientId = patientId
    },
     // 设置优惠券
     setCoupon(state: PartialConsult, couponId?: string) {
        state.couponId  = couponId 
    },
     // 设置患者
     clear(state: PartialConsult) {
        Object.keys(state).forEach(key=>delete state[key])
        console.log(state)
    },

    //ceshi
    test1(state:any,data:any){
        state.cook = data
    }

}
const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
