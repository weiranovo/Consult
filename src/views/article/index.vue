<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <cpNavBar :title="(route?.meta.title as string)" right-text="nihao"></cpNavBar>
  <div class="article-page">article</div>
</template>

<style lang="scss" scoped></style>