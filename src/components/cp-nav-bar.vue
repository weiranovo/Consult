<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="emit('click-right')"
  ></van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const { title='首页', rightText,back } = defineProps<{
  title:string,
  rightText?:string,
  back?:()=> void
}>()
const emit = defineEmits<{
   (e:'click-right'):void
}>()
const onClickLeft = () => {
  if(back) return back()
  if(history.state.back){
    router.back()
  }else{
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>