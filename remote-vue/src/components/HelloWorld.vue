<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Button class="p-3 border-2" type="button" @click="count++">count is {{ count }}</Button>

  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
