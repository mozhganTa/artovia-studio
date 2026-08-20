<script setup lang="ts">
import { getProductBySlug } from '~/features/products/services/product.service'
const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();

const slug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug;

const { data: productData } = await useAsyncData(
  `product-${slug}`,
  () => getProductBySlug(slug),
)

if (!productData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('productDetails.notFound'),
  })
}

const product = computed(() => productData.value!)

const productTitle = useLocalizedText(() => {
  return product.value.title
})

const productCategory = useLocalizedText(() => {
  return product.value.category
})

const productDescription = useLocalizedText(() => {
  return product.value.description
})

const productMaterial = useLocalizedText(() => {
  return product.value.material
})

const productDimensions = useLocalizedText(() => {
  return product.value.dimensions
})

const formattedPrice = useFormattedPrice(() => {
  return product.value.price
})

useSeoMeta({
  title: () => `${productTitle.value} — ${t("home.title")}`,
  description: () => productDescription.value,

  ogTitle: () => productTitle.value,
  ogDescription: () => productDescription.value,
  ogType: "website",
});
</script>

<template>
  <section class="bg-canvas py-6 sm:py-8 lg:py-10">
    <AppContainer>
      <nav
        :aria-label="$t('productDetails.breadcrumb')"
        class="mb-5 flex items-center gap-2 text-sm text-muted"
      >
        <NuxtLink
          :to="localePath('/')"
          class="transition-colors hover:text-brand"
        >
          {{ $t("navigation.home") }}
        </NuxtLink>

        <span aria-hidden="true">/</span>

        <span class="line-clamp-1 text-ink">
          {{ productTitle }}
        </span>
      </nav>

      <div
        class="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10"
      >
        <div
          class="flex h-72 items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface sm:h-80 lg:h-[360px]"
        >
          <img
            v-if="product.imageUrl"
            :src="product.imageUrl"
            :alt="productTitle"
            class="size-full object-cover"
          />

          <span v-else class="font-semibold text-brand">
            {{ $t("products.imagePlaceholder") }}
          </span>
        </div>

        <div class="lg:py-2">
          <p class="text-sm font-semibold text-brand">
            {{ productCategory }}
          </p>

          <h1 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
            {{ productTitle }}
          </h1>

          <p class="mt-4 text-base leading-7 text-muted sm:text-lg">
            {{ productDescription }}
          </p>

          <dl class="mt-6 divide-y divide-line border-y border-line">
            <div class="flex justify-between gap-4 py-3">
              <dt class="text-muted">
                {{ $t("productDetails.material") }}
              </dt>

              <dd class="font-medium text-ink">
                {{ productMaterial }}
              </dd>
            </div>

            <div class="flex justify-between gap-4 py-3">
              <dt class="text-muted">
                {{ $t("productDetails.dimensions") }}
              </dt>

              <dd class="font-medium text-ink">
                {{ productDimensions }}
              </dd>
            </div>
          </dl>

          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p class="text-xl font-bold text-ink sm:text-2xl">
              {{ formattedPrice }}
            </p>

            <span
              :class="product.isAvailable ? 'text-success' : 'text-danger'"
              class="font-semibold"
            >
              {{
                product.isAvailable
                  ? $t("products.available")
                  : $t("products.unavailable")
              }}
            </span>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
