import { useDark, useLocalStorage, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { watch } from 'vue';

const allowedColors = ['sky', 'violet', 'purple', 'emerald', 'green', 'slate'] as const;

type TThemeColor = (typeof allowedColors)[number];
type TGuestLayoutVariant = 'centered' | 'two-columns';

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const themeColor = useLocalStorage<TThemeColor>(`boilerplate:theme-color`, 'sky');

  const updateThemeClass = (color: TThemeColor) => {
    const classes = [...document.documentElement.classList].filter(
      className => !className.startsWith('theme-')
    );

    classes.unshift(`theme-${color}`);

    document.documentElement.className = classes.join(' ');
  };

  watch(
    themeColor,
    (color: TThemeColor) => {
      updateThemeClass(color);
    },
    { immediate: true }
  );

  const guestLayoutVariant = useLocalStorage<TGuestLayoutVariant>(
    `boilerplate:layout:guest-layout:variant`,
    'centered'
  );

  return {
    isDark,
    toggleDark,
    themeColor,
    allowedColors,
    guestLayoutVariant,
  };
});
