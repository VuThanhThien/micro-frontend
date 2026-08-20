<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DateRangePicker from '@/components/Dashboard/DateRangePicker.vue'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useDashboardStore, type DashboardTab } from '@/stores/dashboard.store'
import OverviewView from '@/views/dashboard/OverviewView.vue'
import AnalyticsView from '@/views/dashboard/AnalyticsView.vue'
import ReportsView from '@/views/dashboard/ReportsView.vue'
import NotificationsView from '@/views/dashboard/NotificationsView.vue'

interface TabDefinition {
  value: DashboardTab
  label: string
  route: string
  component: Component
}

const TABS: TabDefinition[] = [
  { value: 'overview', label: 'Overview', route: '/', component: OverviewView },
  { value: 'analytics', label: 'Analytics', route: '/analytics', component: AnalyticsView },
  { value: 'reports', label: 'Reports', route: '/reports', component: ReportsView },
  { value: 'notifications', label: 'Notifications', route: '/notifications', component: NotificationsView },
]

const route = useRoute()
const router = useRouter()
const store = useDashboardStore()

// The active tab is driven by the current route (Vue Router).
const activeTab = computed<DashboardTab>(() => {
  return TABS.find((t) => route.path === t.route)?.value ?? 'overview'
})

const currentView = computed<Component>(() => {
  return (TABS.find((t) => route.path === t.route) ?? TABS[0]).component
})

const title = computed(() => TABS.find((t) => t.value === activeTab.value)?.label ?? 'Dashboard')

// On tab change: update the Pinia store and navigate with Vue Router.
const onTabChange = (value: string | number) => {
  const tab = TABS.find((t) => t.value === String(value))
  if (!tab || tab.route === route.path) return
  store.setActiveTab(tab.value)
  router.push(tab.route)
}
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        {{ title }}
      </h2>
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button>Download</Button>
      </div>
    </div>
    <Tabs
      :model-value="activeTab"
      @update:model-value="onTabChange"
      class="space-y-4"
    >
      <TabsList>
        <TabsTrigger
          v-for="tab in TABS"
          :key="tab.value"
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <component :is="currentView" />
  </div>
</template>
