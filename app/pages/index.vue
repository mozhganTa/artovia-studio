<script setup lang="ts">
import HomeHero from "~/features/home/components/HomeHero.vue";
import HomeFeaturedCategories from "~/features/home/components/HomeFeaturedCategories.vue";
import HomeFeaturedProducts from "~/features/home/components/HomeFeaturedProducts.vue";
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
  <HomeHero />
  <HomeFeaturedCategories/>
  <HomeFeaturedProducts/>
</template>
