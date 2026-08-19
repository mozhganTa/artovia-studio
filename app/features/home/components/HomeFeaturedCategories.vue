<script setup lang="ts">
const { t } = useI18n()

const categories = computed(() => [
  {
    id: 'copper',
    number: '01',
    title: t('home.categories.items.copper.title'),
    description: t('home.categories.items.copper.description'),
  },
  {
    id: 'ceramic',
    number: '02',
    title: t('home.categories.items.ceramic.title'),
    description: t('home.categories.items.ceramic.description'),
  },
  {
    id: 'painting',
    number: '03',
    title: t('home.categories.items.painting.title'),
    description: t('home.categories.items.painting.description'),
  },
])
</script>

<template>
  <section class="bg-surface py-16 sm:py-20 lg:py-24">
    <AppContainer>
      <div class="max-w-2xl">
        <p class="text-sm font-semibold text-brand">
          {{ $t('home.categories.eyebrow') }}
        </p>

        <h2 class="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {{ $t('home.categories.title') }}
        </h2>

        <p class="mt-4 text-lg leading-8 text-muted">
          {{ $t('home.categories.description') }}
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article
          v-for="category in categories"
          :key="category.id"
          class="group rounded-3xl border border-line bg-canvas p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
        >
          <span class="text-sm font-semibold text-brand">
            {{ category.number }}
          </span>

          <h3 class="mt-8 text-xl font-bold text-ink">
            {{ category.title }}
          </h3>

          <p class="mt-3 leading-7 text-muted">
            {{ category.description }}
          </p>
        </article>
      </div>
    </AppContainer>
  </section>
</template>