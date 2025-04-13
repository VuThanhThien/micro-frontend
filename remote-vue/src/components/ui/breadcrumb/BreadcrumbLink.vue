<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'a',
})
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="RouterLink"
    :as-child="asChild"
    :class="cn('hover:text-foreground transition-colors', props.class)"
  >
    <slot />
  </Primitive>
</template>
