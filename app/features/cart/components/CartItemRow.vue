<script setup lang="ts">
import type { CartItem } from '~/features/cart/types/cart'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  increase: []
  decrease: []
  remove: []
}>()

const localePath = useLocalePath()

const productTitle = useLocalizedText(() => {
  return props.item.product.title
})

const formattedPrice = useFormattedPrice(() => {
  return props.item.product.price
})

const formattedTotalPrice = useFormattedPrice(() => {
  return props.item.product.price * props.item.quantity
})
</script>

<template>
  <article
    class="grid gap-5 border-b border-line py-6 sm:grid-cols-[120px_1fr_auto] sm:items-center"
  >
    <NuxtLink
      :to="localePath(`/products/${item.product.slug}`)"
      class="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-surface"
    >
      <img
        v-if="item.product.imageUrl"
        :src="item.product.imageUrl"
        :alt="productTitle"
        class="size-full object-cover"
      >

      <span v-else class="text-sm font-semibold text-brand">
        {{ $t('products.imagePlaceholder') }}
      </span>
    </NuxtLink>

    <div>
      <NuxtLink
        :to="localePath(`/products/${item.product.slug}`)"
        class="font-bold text-ink transition hover:text-brand"
      >
        {{ productTitle }}
      </NuxtLink>

      <p class="mt-2 text-sm text-muted">
        {{ formattedPrice }}
      </p>

      <button
        type="button"
        class="mt-3 text-sm font-semibold text-danger hover:underline"
        @click="emit('remove')"
      >
        {{ $t('cart.remove') }}
      </button>
    </div>

    <div class="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
      <div
        class="inline-flex items-center overflow-hidden rounded-xl border border-line bg-surface"
      >
        <button
          type="button"
          :aria-label="$t('cart.decreaseQuantity')"
          class="size-10 text-lg text-ink transition hover:bg-canvas"
          @click="emit('decrease')"
        >
          −
        </button>

        <span class="min-w-10 text-center font-semibold text-ink">
          {{ item.quantity }}
        </span>

        <button
          type="button"
          :aria-label="$t('cart.increaseQuantity')"
          class="size-10 text-lg text-ink transition hover:bg-canvas"
          @click="emit('increase')"
        >
          +
        </button>
      </div>

      <p class="font-bold text-ink">
        {{ formattedTotalPrice }}
      </p>
    </div>
  </article>
</template>