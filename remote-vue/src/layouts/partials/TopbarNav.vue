<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
</script>

<template>
  <nav
    class="main-nav *:font-medium *:transition-colors *:hover:text-primary *:border-b-2 *:border-transparent *:hover:border-primary *:-mb-1 *:px-2"
    :class="cn('flex items-center space-x-4 lg:space-x-6 text-sm', $attrs.class ?? '')">
    <RouterLink to="/" class="group-has-data-[collapsible=icon]/sidebar-wrapper:py-3 py-5">
      Dashboard
    </RouterLink>
  </nav>
</template>

<style>
@reference '../../style.css';

.main-nav .active {
  @apply border-primary;
}
</style>
