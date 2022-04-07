<template>
  <el-button v-bind="props"><slot></slot></el-button>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'

const props = defineProps<{
  round?: boolean
}>()
</script>

<script lang="ts">
export default { name: 'RButton' }
</script>
