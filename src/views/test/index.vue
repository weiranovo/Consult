<template>
    <div class="icons">
        <!-- {{ store.state.consult.cook }} -->
        <div class="head1">
          <h3 >nihaoma</h3>
          <span >我哈性</span>
          <p>nihaoma</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore()
console.log(store.state.consult.cook)
</script>

<style scoped lang="scss">
:deep(.van-cell__value) {
    color: gold;
    width: 3px;
}
.icons{
    height: 140px;
    position: relative;
    .head1{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    p{
        width: 100%;
    }
}

}

</style>