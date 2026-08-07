<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description'),

  ogTitle: () => t('seo.about.title'),
  ogDescription: () => t('seo.about.description'),
  ogType: 'website',
})
</script>

<template>
  <section>
    <h1>{{ $t('about.title') }}</h1>

    <p>{{ $t('about.description') }}</p>
  </section>
</template>