<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <section class="overflow-hidden py-12 sm:py-16 lg:py-24">
    <AppContainer>
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="max-w-2xl">
          <p class="text-sm font-semibold text-brand">
            {{ $t("home.hero.eyebrow") }}
          </p>

          <h1
            class="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {{ $t("home.hero.title") }}
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
            {{ $t("home.hero.description") }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <BaseButton to="#featured-products" size="lg">
              {{ $t("home.hero.primaryAction") }}
            </BaseButton>

            <BaseButton
              :to="localePath('/about')"
              variant="secondary"
              size="lg"
            >
              {{ $t("home.hero.secondaryAction") }}
            </BaseButton>
          </div>
        </div>

        <div
          class="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-brand-dark p-8 shadow-xl shadow-brand/10 sm:min-h-[440px]"
          aria-hidden="true"
        >
          <div
            class="absolute -end-16 -top-16 size-56 rounded-full border-[32px] border-white/10"
          />

          <div
            class="absolute -bottom-20 -start-16 size-64 rounded-full bg-brand/50 blur-3xl"
          />

          <div
            class="relative flex min-h-[296px] items-center justify-center sm:min-h-[376px]"
          >
            <div
              class="aspect-square w-56 rounded-full border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:w-72"
            >
              <div
                class="flex h-full items-center justify-center rounded-full border border-white/30"
              >
                <span
                  class="text-center text-2xl font-bold leading-relaxed text-white"
                >
                  {{ $t("home.title") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
