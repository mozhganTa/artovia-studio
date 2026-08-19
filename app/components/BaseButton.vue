<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

interface Props {
  to?: RouteLocationRaw
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

const variantClasses = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border border-brand text-brand hover:bg-brand hover:text-white',
}

const sizeClasses = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
}

const classes = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    :class="classes"
  >
    <slot />
  </NuxtLink>

  <button
    v-else
    :type="props.type"
    :disabled="props.disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>