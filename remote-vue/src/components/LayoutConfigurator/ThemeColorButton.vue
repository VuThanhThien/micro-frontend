<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/button/Button.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import LayoutColorSection from './LayoutColorSection.vue'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
      >
        <Icon icon="lucide:paintbrush" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-96 space-y-3">
      <LayoutColorSection />
    </PopoverContent>
  </Popover>
</template>
