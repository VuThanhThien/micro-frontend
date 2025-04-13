<script setup lang="ts">
import ActiveNowCard from '@/components/Dashboard/Cards/ActiveNowCard.vue'
import SalesCard from '@/components/Dashboard/Cards/SalesCard.vue'
import SubscriptionsCard from '@/components/Dashboard/Cards/SubscriptionsCard.vue'
import TotalRevenueCard from '@/components/Dashboard/Cards/TotalRevenueCard.vue'
import DateRangePicker from '@/components/Dashboard/DateRangePicker.vue'
import Overview from '@/components/Dashboard/Overview.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button>Download</Button>
      </div>
    </div>
    <Tabs
      default-value="overview"
      class="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          disabled
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          disabled
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          disabled
        >
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        class="space-y-4"
      >
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
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
