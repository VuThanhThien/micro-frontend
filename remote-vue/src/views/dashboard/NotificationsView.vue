<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/stores/dashboard.store'

const store = useDashboardStore()
const unread = computed(() => store.notifications.filter((n) => !n.read).length)
</script>

<template>
  <div class="space-y-4">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Notifications ({{ unread }} unread)</CardTitle>
        <div class="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            @click="store.addNotification('Demo notification', 'Added from the Notifications page.', 'info')"
          >
            Simulate
          </Button>
          <Button size="sm" @click="store.markAllRead">Mark all read</Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-2">
        <div v-if="store.notifications.length === 0" class="text-sm text-muted-foreground">
          You're all caught up.
        </div>
        <div
          v-for="n in store.notifications"
          :key="n.id"
          class="flex items-start justify-between gap-4 rounded-md border p-3"
          :class="n.read ? 'opacity-60' : ''"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span
                v-if="n.kind === 'warning'"
                class="size-2 rounded-full bg-amber-500"
              />
              <span
                v-else-if="n.kind === 'success'"
                class="size-2 rounded-full bg-emerald-500"
              />
              <span
                v-else
                class="size-2 rounded-full bg-sky-500"
              />
              <span class="text-sm font-medium">{{ n.title }}</span>
              <span v-if="!n.read" class="text-xs text-muted-foreground">New</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ n.message }}</p>
          </div>
          <Button size="sm" variant="ghost" @click="store.removeNotification(n.id)">
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
