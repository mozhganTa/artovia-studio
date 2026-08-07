<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),

  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogType: 'website',
})
</script>

<template>
  <section>
    <h1>{{ $t('home.title') }}</h1>

    <p>{{ $t('home.subtitle') }}</p>
  </section>
</template>