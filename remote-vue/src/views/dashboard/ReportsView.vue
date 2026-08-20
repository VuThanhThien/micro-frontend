<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/stores/dashboard.store'

const store = useDashboardStore()

const reportRows = [
  { metric: 'Total revenue', value: '$128,440' },
  { metric: 'Active users', value: '8,204' },
  { metric: 'Conversion rate', value: '3.62%' },
  { metric: 'Avg. order value', value: '$212.40' },
]

function generateReport() {
  // Demonstrates cross-tab state: publish an observable notification from here.
  store.addNotification(
    'Report generated',
    'A new summary report was generated from the Reports page.',
    'success',
  )
}
</script>

<template>
  <div class="space-y-4">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Monthly summary</CardTitle>
        <Button size="sm" @click="generateReport">Generate</Button>
      </CardHeader>
      <CardContent>
        <p class="mb-3 text-sm text-muted-foreground">
          Shared Pinia state — Reports opened
          <strong class="text-foreground">{{ store.tabVisits.reports }}</strong>
          time(s).
        </p>
        <div class="rounded-md border">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b bg-muted/50 text-left text-muted-foreground">
                <th class="px-4 py-2 font-medium">Metric</th>
                <th class="px-4 py-2 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in reportRows"
                :key="row.metric"
                class="border-b last:border-0"
              >
                <td class="px-4 py-2">{{ row.metric }}</td>
                <td class="px-4 py-2">{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
