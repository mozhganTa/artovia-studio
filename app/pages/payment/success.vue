<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const orderNumber = computed(() => {
  return typeof route.query.order === 'string'
    ? route.query.order
    : ''
})

useSeoMeta({
  title: () => t('seo.paymentSuccess.title'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <section class="bg-canvas py-12 sm:py-16 lg:py-20">
    <AppContainer>
      <div
        class="mx-auto max-w-2xl rounded-3xl border border-line bg-surface px-6 py-12 text-center sm:px-10"
      >
        <div
          class="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-3xl font-bold text-success"
          aria-hidden="true"
        >
          ✓
        </div>

        <h1 class="mt-6 text-3xl font-bold text-ink">
          {{ $t('paymentResult.success.title') }}
        </h1>

        <p class="mt-4 leading-7 text-muted">
          {{ $t('paymentResult.success.description') }}
        </p>

        <div
          v-if="orderNumber"
          class="mt-8 rounded-2xl bg-canvas p-5"
        >
          <p class="text-sm text-muted">
            {{ $t('paymentResult.success.orderNumber') }}
          </p>

          <p
            class="mt-2 text-xl font-bold text-brand"
            dir="ltr"
          >
            {{ orderNumber }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            :to="localePath('/products')"
            class="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
          >
            {{ $t('paymentResult.success.continueShopping') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/')"
            class="inline-flex min-h-12 items-center justify-center rounded-xl border border-line px-6 font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            {{ $t('paymentResult.success.home') }}
          </NuxtLink>
        </div>
      </div>
    </AppContainer>
  </section>
</template>