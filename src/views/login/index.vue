<template>
  <div class="login-page">
    <cp-nav-bar title="登陆" right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ flag ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="flag = !flag">
        <span>{{ flag ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" ref="loginRef" @submit="login">
      <van-field placeholder="请输入手机号" name="tel" type="tel" v-model="loginForm.mobile" :rules="mobileRules"></van-field>
      <!-- 密码登陆 -->
      <van-field v-if="flag" placeholder="请输入密码" :type="!isShowPass ? 'password' : 'text'" v-model="loginForm.password"
        autocomplete="off" :rules="passwordRules">
        <template #right-icon>
          <cpIcon :name="`login-eye-${!isShowPass ? 'on' : 'off'}`" @click="isShowPass = !isShowPass"></cpIcon>
        </template>
      </van-field>
      <!-- 验证码登陆 -->
      <van-field v-else placeholder="请输入验证码" :type="!isShowPass ? 'password' : 'text'" v-model="loginForm.code"
        autocomplete="off" :rules="codeRules">
        <template #button>
          <van-button size="small" round type="primary" @click="getCode">{{ time == 60 ? '获取验证码' : `${time}s后重新获取` }}</van-button>
        </template>
      </van-field>

      <div class="cp-cell">
        <van-checkbox class="checkSpan" v-model="checked">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mobileRules, passwordRules,codeRules } from '@/utils/rules'
import { onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loginByPassword, getCodeId,loginByCode } from '@/api/user'
import { showToast } from 'vant';
import { useStore } from 'vuex';
const store = useStore()
const $router = useRouter()
const $route = useRoute()
//选择用户协议相关
const checked = ref(false)
//显示密码相关
const isShowPass = ref(false)
//验证码时间
let time = ref(60)
let timer: any = ''
//表单相关
const loginRef = ref()
const loginForm = ref({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})
//切换密码登录与验证码登陆
const flag = ref(true)
//获取验证码
const getCode = async () => {
  await loginRef.value.validate('tel')
  if (time.value < 60) return
  let res = await getCodeId(loginForm.value.mobile,'login')
  loginForm.value.code = res.data.code
  timer = setInterval(() => {
    time.value--
    console.log(time.value)
    if (time.value <= 0) {
      time.value = 60
      clearInterval(timer)
    }
  }, 1000)
}
//登录按钮
const login = async () => {
  if (!checked.value) {
    showToast('请勾选按钮')
    return
  }
  let res = flag.value?await loginByPassword(loginForm.value.mobile, loginForm.value.password):await loginByCode(loginForm.value.mobile, loginForm.value.code)
  console.log(res)
  store.dispatch('user/handelLogin', res.data)
  console.log(store.state.user.mobile)
  showToast({
    type: 'success',
    message: '登陆成功！'
  })
  
  let redirect = (decodeURIComponent($route.query.redirect as string))=='undefined'?'':(decodeURIComponent($route.query.redirect as string))

$router.push({path:redirect || '/'})
};
onUnmounted(()=>{
  clearInterval(timer)
})
</script>


<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}

.checkSpan {

  span,
  a {
    line-height: 30px;
  }
}
</style>
