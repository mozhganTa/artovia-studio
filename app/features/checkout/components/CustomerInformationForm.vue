<script setup lang="ts">
import type {
  CustomerInformation,
} from '~/features/checkout/types/checkout'

const props = defineProps<{
  initialValues: CustomerInformation
}>()

const emit = defineEmits<{
  submit: [information: CustomerInformation]
}>()

const { t } = useI18n()

const form = reactive<CustomerInformation>({
  fullName: props.initialValues.fullName,
  phone: props.initialValues.phone,
  email: props.initialValues.email,
})

const errors = reactive<
  Partial<Record<keyof CustomerInformation, string>>
>({})

function clearError(
  field: keyof CustomerInformation,
) {
  errors[field] = ''
}

function validateForm() {
  errors.fullName = ''
  errors.phone = ''
  errors.email = ''

  const fullName = form.fullName.trim()
  const phone = form.phone.trim()
  const email = form.email.trim()

  if (!fullName) {
    errors.fullName = t(
      'checkout.customer.errors.fullNameRequired',
    )
  }

  if (!phone) {
    errors.phone = t(
      'checkout.customer.errors.phoneRequired',
    )
  }
  else if (!/^09\d{9}$/.test(phone)) {
    errors.phone = t(
      'checkout.customer.errors.phoneInvalid',
    )
  }

  if (
    email
    && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = t(
      'checkout.customer.errors.emailInvalid',
    )
  }

  return !errors.fullName
    && !errors.phone
    && !errors.email
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  emit('submit', {
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
  })
}
</script>

<template>
  <form
    class="mx-auto max-w-2xl"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <header>
      <h2 class="text-2xl font-bold text-ink">
        {{ $t('checkout.customer.title') }}
      </h2>

      <p class="mt-2 text-muted">
        {{ $t('checkout.customer.description') }}
      </p>
    </header>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label
          for="customer-full-name"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.customer.fullName') }}
        </label>

        <input
          id="customer-full-name"
          v-model="form.fullName"
          type="text"
          autocomplete="name"
          :placeholder="$t('checkout.customer.fullNamePlaceholder')"
          :aria-invalid="Boolean(errors.fullName)"
          :aria-describedby="
            errors.fullName
              ? 'customer-full-name-error'
              : undefined
          "
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="
            errors.fullName
              ? 'border-danger'
              : 'border-line'
          "
          @input="clearError('fullName')"
        >

        <p
          v-if="errors.fullName"
          id="customer-full-name-error"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.fullName }}
        </p>
      </div>

      <div>
        <label
          for="customer-phone"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.customer.phone') }}
        </label>

        <input
          id="customer-phone"
          v-model="form.phone"
          type="tel"
          inputmode="numeric"
          autocomplete="tel"
          dir="ltr"
          :placeholder="$t('checkout.customer.phonePlaceholder')"
          :aria-invalid="Boolean(errors.phone)"
          :aria-describedby="
            errors.phone
              ? 'customer-phone-error'
              : undefined
          "
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-left text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="
            errors.phone
              ? 'border-danger'
              : 'border-line'
          "
          @input="clearError('phone')"
        >

        <p
          v-if="errors.phone"
          id="customer-phone-error"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.phone }}
        </p>
      </div>

      <div>
        <label
          for="customer-email"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.customer.email') }}
        </label>

        <input
          id="customer-email"
          v-model="form.email"
          type="email"
          inputmode="email"
          autocomplete="email"
          dir="ltr"
          :placeholder="$t('checkout.customer.emailPlaceholder')"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="
            errors.email
              ? 'customer-email-error'
              : 'customer-email-hint'
          "
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-left text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="
            errors.email
              ? 'border-danger'
              : 'border-line'
          "
          @input="clearError('email')"
        >

        <p
          v-if="errors.email"
          id="customer-email-error"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.email }}
        </p>

        <p
          v-else
          id="customer-email-hint"
          class="mt-2 text-sm text-muted"
        >
          {{ $t('checkout.customer.emailHint') }}
        </p>
      </div>
    </div>

    <div class="mt-8 flex justify-end">
      <button
        type="submit"
        class="min-h-12 rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
      >
        {{ $t('checkout.customer.continue') }}
      </button>
    </div>
  </form>
</template>