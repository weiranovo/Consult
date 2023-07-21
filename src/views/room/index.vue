<script setup lang="ts">
import RoomStatus from '@/views/room/components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { io, type Socket } from 'socket.io-client'
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import type { Message, TimeMessages } from '@/types/room'
import { MsgType, OrderType } from "@/enums";
import { ConsultOrderItem, Image } from "@/types/consult";
import { getConsultOrderDetail } from "@/api/consult";
import dayjs from 'dayjs'
import { showToast } from "vant";
const store = useStore()
const route = useRoute()
let socket: Socket
let list = ref<Message[]>([])
onMounted(async () => {
  // 建立链接，创建 socket.io 实例
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: `Bearer ${store.state.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
    list.value = []
  })

  socket.on('error', () => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    console.log(data)
    const arr: Message[] = []
    data.forEach((item, i) => {
      if (i === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)
    console.log('liaotianjilu',list.value)
    loading.value = false
    if (!data.length) {
      return showToast('没有聊天记录了')
    }
    nextTick(() => {
      if (initialMsg.value) {
        socket.emit('updateMsgStatus', arr[arr.length - 1].id)
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      }
    })
  })
  socket.on('statusChange', async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consult.value = res.data
  })

  socket.on('receiveChatMsg', async (msg) => {
    console.log('接受的消息', msg)
    list.value.push(msg)
    console.log('接受消息的消息数组', list.value)
    await nextTick()
    socket.emit('updateMsgStatus', msg.id)
    window.scrollTo(0, document.body.scrollHeight)
  })
})

const consult = ref<ConsultOrderItem>()


onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
  console.log(res)
})
//发送文字
const sendText = (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.state.user.id,
    to: consult.value?.docInfo?.id,    //接单医生
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}
const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.state.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}
const initialMsg = ref(true)
const loading = ref(false)
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list" />
    </van-pull-refresh>
    <room-action @send-image="sendImage" @text-send="sendText"
      :disabled="consult?.status !== OrderType.ConsultChat"></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);

  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>