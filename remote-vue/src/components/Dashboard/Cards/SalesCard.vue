<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">
        Sales
      </CardTitle>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        class="size-4 text-muted-foreground"
      >
        <rect
          width="20"
          height="14"
          x="2"
          y="5"
          rx="2"
        />
        <path d="M2 10h20" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        +12,234
      </div>
      <p class="text-xs text-muted-foreground">
        +19% from last month
      </p>
    </CardContent>
  </Card>
</template>
