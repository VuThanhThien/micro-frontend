import { createApp } from 'vue';
import Dashboard from '@/components/Dashboard.vue';

export const mount = (el: HTMLElement) => {
  const app = createApp(Dashboard);
  app.mount(el);

  return {
    unmount: () => {
      app.unmount();
    },
  };
};
