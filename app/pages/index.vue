<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("seo.home.title"),
  description: () => t("seo.home.description"),

  ogTitle: () => t("seo.home.title"),
  ogDescription: () => t("seo.home.description"),
  ogType: "website",
});
</script>

<template>
  <AppContainer class="py-16">
    <h1 class="text-4xl font-bold text-brand">
      {{ $t("home.title") }}
    </h1>

    <p class="mt-4 text-lg text-muted">
      {{ $t("home.subtitle") }}
    </p>
  </AppContainer>
</template>
