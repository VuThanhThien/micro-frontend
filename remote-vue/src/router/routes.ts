import HomeView from '@/views/HomeView.vue';
import type { RouteRecordRaw } from 'vue-router';

/**
 * Each dashboard tab is its own named route. All tabs render through HomeView
 * (which provides the standalone layout + Dashboard); Dashboard itself reads the
 * current route to decide which tab page to show.
 */
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'overview', component: HomeView },
  { path: '/analytics', name: 'analytics', component: HomeView },
  { path: '/reports', name: 'reports', component: HomeView },
  { path: '/notifications', name: 'notifications', component: HomeView },
];
