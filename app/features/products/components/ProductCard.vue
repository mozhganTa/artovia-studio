<script setup lang="ts">
import type { ProductPreview } from '../types/product'

const props = defineProps<{
  product: ProductPreview
}>()

const { locale, t } = useI18n()

const productTitle = computed(() => {
  return props.product.title[locale.value as 'fa' | 'en']
})

const productCategory = computed(() => {
  return props.product.category[locale.value as 'fa' | 'en']
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US')
    .format(props.product.price)
})
</script>

<template>
  <article
    class="overflow-hidden rounded-3xl border border-line bg-surface"
  >
    <div
      class="flex aspect-[4/3] items-center justify-center bg-canvas text-brand"
    >
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="productTitle"
        class="size-full object-cover"
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

      <h3 class="mt-2 text-xl font-bold text-ink">
        {{ productTitle }}
      </h3>

      <div class="mt-5 flex items-center justify-between gap-4">
        <p class="font-semibold text-ink">
          {{ formattedPrice }}
          {{ t('common.currency') }}
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
  </article>
</template>