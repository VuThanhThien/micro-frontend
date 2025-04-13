<script setup lang="ts">
import { type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<DropdownMenuItemProps & { to: RouteLocationRaw, class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
   
  const { class: _, ...delegated } = props // eslint-disable-line @typescript-eslint/no-unused-vars

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RouterLink
    v-bind="forwardedProps"
    :class="cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
      inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </RouterLink>
</template>
