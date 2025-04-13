import { createApp } from 'vue';
import App from '../../App.vue';

export const mount = (el: HTMLElement) => {
  const app = createApp(App);
  app.mount(el);

  return {
    unmount: () => {
      app.unmount();
    },
  };
};
