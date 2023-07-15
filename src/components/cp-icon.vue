<template>
        <svg aria-hidden="true" class="cp-icon">
            <use :xlink:href="`#icon-${name}`"></use>
        </svg>
</template>

<script setup lang="ts">
defineProps<{
    name:string
}>()
</script>

<style scoped lang=scss>
.cp-icon{
    width: 1em;
    height: 1em;
}

</style>