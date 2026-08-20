<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/stores/dashboard.store'

const store = useDashboardStore()

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]
</script>

<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">24,512</div>
          <p class="text-xs text-muted-foreground">+12% this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">Avg. duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">3m 42s</div>
          <p class="text-xs text-muted-foreground">+4% this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">Tab visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ store.tabVisits.analytics }}</div>
          <p class="text-xs text-muted-foreground">times this tab was opened</p>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Audience by month</CardTitle>
      </CardHeader>
      <CardContent class="pl-2">
        <BarChart
          :data="data"
          :categories="['desktop', 'mobile']"
          :index="'month'"
          :rounded-corners="4"
        />
      </CardContent>
    </Card>
  </div>
</template>
