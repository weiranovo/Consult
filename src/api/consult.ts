import type { ConsultOrderListParams, ConsultOrderPage,ConsultOrderItem,PartialConsult,ConsultOrderPreData, ConsultOrderPreParams,KnowledgePage, KnowledgeParams, PageParams,Image, DoctorPage,FollowType,TopDep } from '@/types/consult'
import request from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
//获取全部科室
export const getAllDep = () => request<TopDep[]>('/dep/all')
//上传图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

  // 生成订单
export const createConsultOrder = (data: PartialConsult) =>
request<{ id: string }>('/patient/consult/order', 'POST', data)

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })

  // 查看处方
export const getPrescriptionPic = (id: string) =>
request<{ url: string }>(`/patient/consult/prescription/${id}`)

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)

  // 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')

// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')

