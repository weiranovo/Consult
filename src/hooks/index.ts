import { followOrUnfollow } from '@/api/consult'
import { ref } from 'vue'
import { showSuccessToast } from "vant";
import type { FollowType } from '@/types/consult'
//关注|取消关注
const useFollow = (type:FollowType = 'doc') => {
    const loading = ref(false)
    const follow = async (item: {id:string,likeFlag:0|1}) => {
        loading.value = true
        try {
            await followOrUnfollow(item.id,type)
            item.likeFlag = item.likeFlag === 1 ? 0 : 1
            showSuccessToast(item.likeFlag === 1 ? '关注成功' : '取关成功')
        } finally {
            loading.value = false
        }
    }
    return {loading,follow}
}


export { useFollow }