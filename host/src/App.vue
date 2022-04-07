<template>
  <div class="app">
    <r-button round>remote btn</r-button>

    <suspense @resolve="adderResolved">
      <adder ref="adderRef" @add="add"></adder>
      <template #fallback> load </template>
    </suspense>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, nextTick, ref } from 'vue'

const RButton = defineAsyncComponent(() => import('remote_app/RButton'))
const Adder = defineAsyncComponent(() => import('remote_app/Adder'))

const add = (val: number) => {
  console.log(val)
}

const adderRef = ref<InstanceType<typeof Adder>>()

const adderResolved = () => {
  nextTick(() => {
    console.log(adderRef.value?.dec)
  })
}
</script>

<script lang="ts">
export default { name: 'App' }
</script>
