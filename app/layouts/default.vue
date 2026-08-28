<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { locale } = useI18n();
const cartStore = useCartStore();
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header
      class="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur"
    >
      <AppContainer class="flex h-16 items-center justify-between gap-4">
        <NuxtLink :to="localePath('/')" class="text-xl font-bold text-brand">
          {{ $t("home.title") }}
        </NuxtLink>

        <nav class="flex items-center gap-4 sm:gap-6">
          <NuxtLink
            :to="localePath('/')"
            class="text-sm font-medium text-muted transition-colors hover:text-brand"
            exact-active-class="text-brand"
          >
            {{ $t("navigation.home") }}
          </NuxtLink>

          <NuxtLink :to="localePath('/products')"
           class="text-sm font-medium text-muted transition-colors hover:text-brand"
            exact-active-class="text-brand"
          >
            {{ $t("navigation.shop") }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/about')"
            class="text-sm font-medium text-muted transition-colors hover:text-brand"
            exact-active-class="text-brand"
          >
            {{ $t("navigation.about") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/cart')"
            class="relative inline-flex items-center gap-2"
          >
            <span>
              {{ $t("navigation.cart") }}
            </span>

            <span
              v-if="cartStore.totalItems > 0"
              class="inline-flex min-w-6 items-center justify-center rounded-full bg-brand px-1.5 py-0.5 text-xs font-bold text-white"
            >
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>
        </nav>

        <div>
          <NuxtLink
            v-if="locale !== 'fa'"
            :to="switchLocalePath('fa')"
            class="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            فارسی
          </NuxtLink>

          <NuxtLink
            v-if="locale !== 'en'"
            :to="switchLocalePath('en')"
            class="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            English
          </NuxtLink>
        </div>
      </AppContainer>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-line bg-surface">
      <AppContainer class="py-6 text-center text-sm text-muted">
        {{ $t("footer.tagline") }}
      </AppContainer>
    </footer>
  </div>
</template>
