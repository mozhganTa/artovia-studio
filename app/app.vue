<script setup lang="ts">
const i18nHead = useLocaleHead()

useHeadSafe(i18nHead)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>