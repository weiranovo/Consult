<script setup lang="ts">
import { onMounted } from 'vue';
import { showConfirmDialog, showToast  } from 'vant';
import { getPersonInfo } from "@/api/user";
import type { UserInfo } from '@/types/user'
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const $router = useRouter()
const store = useStore()
//用户信息
const userInfo = ref({} as UserInfo)
//快捷工具
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
//获取用户信息
const getUserInfo = async () => {
  const { data } = await getPersonInfo()
  userInfo.value = data
  console.log(userInfo.value.orderInfo.finishedNumber)
}
//退出登陆
const logout = () => {
  showConfirmDialog({
  title: '退出登录',
  message:
    '你确定要退出登录吗？。',
})
  .then(() => {
    store.commit('user/setLogOut')
    showToast({
      type:'success',
      message:'退出成功！'
    });
    $router.push('/')
  })
  .catch(() => {
    // on cancel
  });
}
onMounted(async () => {
  getUserInfo()
})
</script>

<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="userInfo.avatar" />
        <div class="name">
          <p>{{ userInfo.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userInfo.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row >
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo?.paidNumber">
            <cp-icon name="user-paid" />
            <p>待付款</p>
          </van-badge>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo?.shippedNumber">
            <cp-icon name="user-shipped" />
            <p>待发货</p>
          </van-badge>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo?.receivedNumber">
            <cp-icon name="user-received" />
            <p>待收货</p>
          </van-badge>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo.orderInfo?.finishedNumber">
            <cp-icon name="user-finished" />
            <p>已完成</p>
          </van-badge>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell :title="item.label" is-link :to="item.path" :border="false" v-for="(item,index) in tools" :key="index">
        <template #icon><cp-icon  :name="`user-tool-0${index+1}`" /></template>
      </van-cell>
    </div>
    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;

  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;

      .van-image {
        width: 70px;
        height: 70px;
      }

      .name {
        padding-left: 10px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      padding-top: 15px;

      p {
        text-align: center;
        
        &:first-child {
          font-size: 18px;
          font-weight: 500;
          
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;

        }
      }
    }
  }

  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;

      a {
        color: var(--cp-tip);
      }
    }

    .van-col {
      text-align: center;
      
      .cp-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
        
      }
    }
  }

  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      line-height: 1;
      align-items: center;
    }

    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }

  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>