<template>
  <div class="adder">
    <p class="txt">{{ count }}</p>
    <button @click="add">add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)

const emit = defineEmits({
  add: (vaule: number) => true,
})

const add = () => {
  count.value++
  emit('add', count.value)
}

const dec = () => {
  count.value--
}

defineExpose({ add, dec })
</script>

<script lang="ts">
export default { name: 'Adder' }
</script>

<style scoped>
.txt {
  font-size: 18px;
  font-weight: 600;
  color: cyan;
}

button {
  width: 80px;
  height: 40px;
}
</style>
