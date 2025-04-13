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
        Active Now
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        +573
      </div>
      <p class="text-xs text-muted-foreground">
        +201 since last hour
      </p>
    </CardContent>
  </Card>
</template>
