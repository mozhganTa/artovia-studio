<script setup lang="ts">
import ProductCard from '~/features/products/components/ProductCard.vue'
import { featuredProducts } from '~/features/products/data/featured-products'
</script>

<template>
  <section
    id="featured-products"
    class="bg-canvas py-16 sm:py-20 lg:py-24"
  >
    <AppContainer>
      <div class="max-w-2xl">
        <p class="text-sm font-semibold text-brand">
          {{ $t('home.featuredProducts.eyebrow') }}
        </p>

        <h2 class="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {{ $t('home.featuredProducts.title') }}
        </h2>

        <p class="mt-4 text-lg leading-8 text-muted">
          {{ $t('home.featuredProducts.description') }}
        </p>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </AppContainer>
  </section>
</template>