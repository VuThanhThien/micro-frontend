<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActiveNowCard from '@/components/Dashboard/Cards/ActiveNowCard.vue'
import SalesCard from '@/components/Dashboard/Cards/SalesCard.vue'
import SubscriptionsCard from '@/components/Dashboard/Cards/SubscriptionsCard.vue'
import TotalRevenueCard from '@/components/Dashboard/Cards/TotalRevenueCard.vue'
import Overview from '@/components/Dashboard/Overview.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/stores/dashboard.store'

const store = useDashboardStore()
const router = useRouter()

// `/admin/dashboard` is a host-owned route (React Router), not a Vue tab. It is
// not in the Vue route table, so it hits the `host-redirect` catch-all and is
// forwarded to the host's React Router via `onNavigate` — no full page reload.
const goToHostDashboard = () => {
  router.push('/admin/dashboard')
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalRevenueCard />
      <SubscriptionsCard />
      <SalesCard />
      <ActiveNowCard />
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Router + Pinia demo</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm text-muted-foreground">
          <p>
            Each tab is its own Vue Router route. This page lives at
            <code class="text-foreground">/</code>.
          </p>
          <p>
            Opened
            <strong class="text-foreground">{{ store.tabVisits.overview }}</strong>
            time(s).
          </p>
          <p>
            Active tab (Pinia):
            <strong class="text-foreground">{{ store.activeTab }}</strong>.
          </p>
          <div class="pt-1">
            <Button @click="goToHostDashboard">Go to Admin Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
