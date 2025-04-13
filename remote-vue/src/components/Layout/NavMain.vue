<script setup lang="ts">
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigation = (url: string) => {
  // Kiểm tra nếu URL bắt đầu bằng http hoặc https thì mở trong tab mới
  if (url.startsWith('http')) {
    window.open(url, '_blank')
    return
  }
  
  // Nếu URL bắt đầu bằng /react/ thì chuyển hướng đến ứng dụng React
  if (url.startsWith('/react/')) {
    window.location.href = url
    return
  }
  
  // Các URL khác sẽ được xử lý bởi Vue Router
  router.push(url)
}

const isActive = (url: string) => {
  if (!router || !router.currentRoute) return false
  return router.currentRoute.value.path === url
}

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Menu</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="item.title">
        <Collapsible
          v-if="item.items"
          as-child
          :default-open="item.isActive"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton
                    :is-active="isActive(subItem.url)"
                    @click="handleNavigation(subItem.url)"
                  >
                    <span>{{ subItem.title }}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuItem v-else>
          <SidebarMenuButton
            :is-active="isActive(item.url)"
            @click="handleNavigation(item.url)"
          >
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
