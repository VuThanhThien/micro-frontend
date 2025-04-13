<script setup lang="ts">
import '../style.css'
import Dashboard from '@/components/Dashboard.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'

</script>

<template>
  <AuthenticatedLayout>
    <Dashboard />
  </AuthenticatedLayout>
</template>

<style scoped></style>
