<script setup lang="ts">
import {
  Mail,
  Rocket,
  Settings2,
} from 'lucide-vue-next'
import NavMain from '@/components/Layout/NavMain.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import type { SidebarProps } from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const menu = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Rocket,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <RouterLink to="/" class="h-14 flex flex-row gap-4 justify-center items-center px-2 hover:text-primary transition-colors border-b group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 group-has-data-[collapsible=icon]/sidebar-wrapper:px-0">
        <i class="fa-solid fa-rocket group-has-data-[state=expanded]/sidebar-wrapper:scale-200" />
        <div class="font-bold text-lg group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">
          Vue Remote App
        </div>
      </RouterLink>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="menu.navMain" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
