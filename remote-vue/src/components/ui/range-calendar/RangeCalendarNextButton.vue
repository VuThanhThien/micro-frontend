<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next'
import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props // eslint-disable-line @typescript-eslint/no-unused-vars

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarNext
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRight class="size-4" />
    </slot>
  </RangeCalendarNext>
</template>
