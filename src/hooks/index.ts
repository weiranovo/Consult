import { followOrUnfollow,cancelOrder,deleteOrder } from '@/api/consult'
import { getPrescriptionPic } from '@/api/consult'
import { showSuccessToast,showImagePreview,showFailToast } from "vant";
import type { FollowType,ConsultOrderItem } from '@/types/consult'
import { OrderType } from "@/enums";
import { getMedicalOrderDetail } from '@/api/order'
import type { OrderDetail } from '@/types/order'
import { onMounted, ref } from 'vue'
//关注|取消关注
export const useFollow = (type:FollowType = 'doc') => {
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

// 封装查看处方逻辑
export const useShowPrescription = () => {
    const onShowPrescription = async (id?: string) => {
      if (id) {
        const res = await getPrescriptionPic(id)
        showImagePreview([res.data.url])
      }
    }
    return { onShowPrescription }
  }

// 封装取消订单逻辑
export const useCancelOrder = () => {
    const loading = ref(false)
    const cancelConsultOrder = async (item: ConsultOrderItem) => {
      try {
        loading.value = true
        await cancelOrder(item.id)
        item.status = OrderType.ConsultCancel
        item.statusValue = '已取消'
        showSuccessToast('取消成功')
      } catch (error) {
        showFailToast('取消失败')
      } finally {
        loading.value = false
      }
    }
    return { loading, cancelConsultOrder }
  }

  export const useDeleteOrder = (cb: () => void) => {
    // 删除订单
    const loading = ref(false)
    const deleteConsultOrder = async (item: ConsultOrderItem) => {
      try {
        loading.value = true
        await deleteOrder(item.id)
        showSuccessToast('删除成功')
        // 成功，做其他业务
        cb && cb()
      } catch (e) {
        showFailToast('删除失败')
      } finally {
        loading.value = false
      }
    }
    return { loading, deleteConsultOrder }
  }


  export const useOrderDetail = (id: string) => {
    const loading = ref(false)
    const order = ref<OrderDetail>()
    onMounted(async () => {
      loading.value = true
      try {
        const res = await getMedicalOrderDetail(id)
        order.value = res.data
      } finally {
        loading.value = false
      }
    })
    return { order, loading }
  }