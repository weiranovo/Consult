<script setup lang="ts">

import KnowledgeCard from './knowledgeCard.vue'

import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'

import { getKnowledgePage } from '@/api/consult'
import { ref } from 'vue';
const props = defineProps<{
    type: KnowledgeType
}>()
const list = ref<KnowledgeList>([]);
const params = ref<KnowledgeParams>({
    type: props.type,
    current: 1,
    pageSize: 10
})
const loading = ref(false);
const finished = ref(false);
//获取列表数据
const onLoad = async () => {
    loading.value = true
    let res = await getKnowledgePage(params.value)
    list.value.push(...res.data.rows)
    
    if(params.value.current<res.data.pageTotal){    
        params.value.current++
    }else{
        finished.value = true
    }
    console.log('出发了')
    loading.value = false
}

</script>

<template>
    <div class="knowledge-list">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
        </van-list>
    </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
    padding: 0 15px;
}
</style>