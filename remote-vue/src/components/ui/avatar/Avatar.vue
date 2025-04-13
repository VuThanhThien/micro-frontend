<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'
import { cn } from '@/lib/utils'
import { avatarVariant, type AvatarVariants } from '.'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  shape?: AvatarVariants['shape']
  size?: AvatarVariants['size']
}>(), {
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
