import { defineStore } from 'pinia';
import { ref } from 'vue';

export type DashboardTab = 'overview' | 'analytics' | 'reports' | 'notifications';

export interface DashboardNotification {
  id: number;
  title: string;
  message: string;
  kind: 'success' | 'info' | 'warning';
  read: boolean;
}

/**
 * Shared dashboard state kept in a Pinia store (a singleton across the app), so
 * it survives tab switches and is observable from every tab page.
 */
export const useDashboardStore = defineStore('dashboard', () => {
  /** Active tab; kept in Pinia so any component can read or update it. */
  const activeTab = ref<DashboardTab>('overview');

  /** How many times each tab has been opened (demonstrates shared, persistent state). */
  const tabVisits = ref<Record<DashboardTab, number>>({
    overview: 0,
    analytics: 0,
    reports: 0,
    notifications: 0,
  });

  /** Demo notification list shared with the Notifications tab. */
  const notifications = ref<DashboardNotification[]>([
    {
      id: 3,
      title: 'Weekly report ready',
      message: 'Your weekly sales report is ready to view.',
      kind: 'info',
      read: true,
    },
    {
      id: 2,
      title: 'Server alert',
      message: 'CPU usage exceeded 80% on web-01.',
      kind: 'warning',
      read: false,
    },
    {
      id: 1,
      title: 'New sale',
      message: 'A new order worth $1,240 was placed.',
      kind: 'success',
      read: false,
    },
  ]);

  function setActiveTab(tab: DashboardTab) {
    activeTab.value = tab;
    tabVisits.value[tab] += 1;
  }

  function addNotification(
    title: string,
    message: string,
    kind: DashboardNotification['kind'] = 'info'
  ) {
    notifications.value.unshift({ id: Date.now(), title, message, kind, read: false });
  }

  function markAllRead() {
    notifications.value.forEach(n => {
      n.read = true;
    });
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  return {
    activeTab,
    tabVisits,
    notifications,
    setActiveTab,
    addNotification,
    markAllRead,
    removeNotification,
  };
});
