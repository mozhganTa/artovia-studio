<script setup lang="ts">
import type { ProductPreview } from '../types/product'

const props = defineProps<{
  product: ProductPreview
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const productTitle = useLocalizedText(() => props.product.title)

const productCategory = useLocalizedText(() => {
  return props.product.category
})

const formattedPrice = useFormattedPrice(() => {
  return props.product.price
})

const productPath = computed(() => {
  return localePath(`/products/${props.product.slug}`)
})




</script>

<template>
  <article
    class="group overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2"
  >
    <NuxtLink
      :to="productPath"
      class="block h-full focus:outline-none"
    >
      <div
        class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-canvas text-brand"
      >
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="productTitle"
          class="size-full object-cover transition duration-500 group-hover:scale-105"
        >

        <span
          v-else
          class="text-sm font-semibold"
        >
          {{ t('products.imagePlaceholder') }}
        </span>
      </div>

      <div class="p-5">
        <p class="text-sm font-medium text-brand">
          {{ productCategory }}
        </p>

        <h3
          class="mt-2 text-xl font-bold text-ink transition-colors group-hover:text-brand"
        >
          {{ productTitle }}
        </h3>

        <div class="mt-5 flex items-center justify-between gap-4">
          <p class="font-semibold text-ink">
            {{ formattedPrice }}
          </p>

          <span
            :class="product.isAvailable ? 'text-success' : 'text-danger'"
            class="text-sm font-medium"
          >
            {{
              product.isAvailable
                ? t('products.available')
                : t('products.unavailable')
            }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>