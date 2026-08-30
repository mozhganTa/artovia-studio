<script setup lang="ts">
import type {
  CheckoutStep,
} from '~/features/checkout/types/checkout'

const props = defineProps<{
  currentStep: CheckoutStep
}>()

const steps: Array<{
  value: CheckoutStep
  label: string
}> = [
  {
    value: 'customer',
    label: 'checkout.steps.customer',
  },
  {
    value: 'shipping',
    label: 'checkout.steps.shipping',
  },
  {
    value: 'review',
    label: 'checkout.steps.review',
  },
]

const currentStepIndex = computed(() => {
  return steps.findIndex((step) => {
    return step.value === props.currentStep
  })
})

function isReached(stepIndex: number) {
  return stepIndex <= currentStepIndex.value
}
</script>

<template>
  <ol
    :aria-label="$t('checkout.title')"
    class="grid grid-cols-3 gap-3"
  >
    <li
      v-for="(step, index) in steps"
      :key="step.value"
      class="text-center"
    >
      <div
        :class="
          isReached(index)
            ? 'border-brand bg-brand text-white'
            : 'border-line bg-surface text-muted'
        "
        class="mx-auto flex size-10 items-center justify-center rounded-full border font-bold transition-colors"
      >
        {{ index + 1 }}
      </div>

      <p
        :class="
          isReached(index)
            ? 'text-ink'
            : 'text-muted'
        "
        class="mt-2 text-xs font-medium sm:text-sm"
      >
        {{ $t(step.label) }}
      </p>
    </li>
  </ol>
</template>