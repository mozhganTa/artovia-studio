<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("seo.about.title"),
  description: () => t("seo.about.description"),

  ogTitle: () => t("seo.about.title"),
  ogDescription: () => t("seo.about.description"),
  ogType: "website",
});
</script>

<template>
  <AppContainer class="py-16">
    <h1 class="text-4xl font-bold text-brand">
      {{ $t("about.title") }}
    </h1>

    <p class="mt-4 max-w-2xl text-lg leading-8 text-muted">
      {{ $t("about.description") }}
    </p>
  </AppContainer>
</template>
