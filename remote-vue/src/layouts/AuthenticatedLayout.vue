<script setup lang="ts">
import DarkModeButton from '@/components/DarkModeButton.vue'
import AppSidebar from '@/components/Layout/AppSidebar.vue'
import Search from '@/components/Layout/Search.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import TopbarNav from '@/layouts/partials/TopbarNav.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="px-4 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="w-full data-[orientation=vertical]:h-4" />
        <TopbarNav class="mx-6" />
        <div class="ml-auto flex items-center gap-2">
          <Search />
          <DarkModeButton />
        </div>
      </header>
      <nav v-if="$slots.breadcrumbs"
        class="px-4 flex h-6 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <slot name="breadcrumbs" />
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <main class="flex flex-col h-full grow">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
