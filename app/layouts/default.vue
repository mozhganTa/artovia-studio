<script setup lang="ts">
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const { locale } = useI18n()
</script>

<template>
  <div>
    <header>
      <nav>
        <NuxtLink :to="localePath('/')">
          {{ $t('navigation.home') }}
        </NuxtLink>

        <NuxtLink :to="localePath('/about')">
          {{ $t('navigation.about') }}
        </NuxtLink>
      </nav>

      <div>
        <NuxtLink
          v-if="locale !== 'fa'"
          :to="switchLocalePath('fa')"
        >
          فارسی
        </NuxtLink>

        <NuxtLink
          v-if="locale !== 'en'"
          :to="switchLocalePath('en')"
        >
          English
        </NuxtLink>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>{{ $t('footer.tagline') }}</p>
    </footer>
  </div>
</template>