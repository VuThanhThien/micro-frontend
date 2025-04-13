<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'
import Button from '@/components/ui/button/Button.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggleDark()"
  >
    <Icon :icon="isDark ? 'lucide:moon' : 'lucide:sun'" />
  </Button>
</template>
