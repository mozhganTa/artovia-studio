<script setup lang="ts">
import type {
  ShippingAddress,
  ShippingMethod,
} from '~/features/checkout/types/checkout'

const props = defineProps<{
  initialAddress: ShippingAddress
  initialMethod: ShippingMethod
}>()

const emit = defineEmits<{
  back: []
  submit: [
    address: ShippingAddress,
    method: ShippingMethod,
  ]
}>()

const { t } = useI18n()

const form = reactive<ShippingAddress>({
  province: props.initialAddress.province,
  city: props.initialAddress.city,
  postalCode: props.initialAddress.postalCode,
  addressLine: props.initialAddress.addressLine,
})

const selectedMethod = ref<ShippingMethod>(
  props.initialMethod,
)

const errors = reactive<
  Partial<Record<keyof ShippingAddress, string>>
>({})

const shippingMethods: Array<{
  value: ShippingMethod
  label: string
  description: string
}> = [
  {
    value: 'standard',
    label: 'checkout.shipping.standard',
    description: 'checkout.shipping.standardDescription',
  },
  {
    value: 'express',
    label: 'checkout.shipping.express',
    description: 'checkout.shipping.expressDescription',
  },
]

function clearError(field: keyof ShippingAddress) {
  errors[field] = ''
}

function validateForm() {
  errors.province = ''
  errors.city = ''
  errors.postalCode = ''
  errors.addressLine = ''

  const province = form.province.trim()
  const city = form.city.trim()
  const postalCode = form.postalCode.trim()
  const addressLine = form.addressLine.trim()

  if (!province) {
    errors.province = t(
      'checkout.shipping.errors.provinceRequired',
    )
  }

  if (!city) {
    errors.city = t(
      'checkout.shipping.errors.cityRequired',
    )
  }

  if (!postalCode) {
    errors.postalCode = t(
      'checkout.shipping.errors.postalCodeRequired',
    )
  }
  else if (!/^\d{10}$/.test(postalCode)) {
    errors.postalCode = t(
      'checkout.shipping.errors.postalCodeInvalid',
    )
  }

  if (!addressLine) {
    errors.addressLine = t(
      'checkout.shipping.errors.addressRequired',
    )
  }

  return !errors.province
    && !errors.city
    && !errors.postalCode
    && !errors.addressLine
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  emit(
    'submit',
    {
      province: form.province.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      addressLine: form.addressLine.trim(),
    },
    selectedMethod.value,
  )
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
        {{ $t('checkout.shipping.title') }}
      </h2>

      <p class="mt-2 text-muted">
        {{ $t('checkout.shipping.description') }}
      </p>
    </header>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <div>
        <label
          for="shipping-province"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.shipping.province') }}
        </label>

        <input
          id="shipping-province"
          v-model="form.province"
          type="text"
          autocomplete="address-level1"
          :placeholder="$t('checkout.shipping.provincePlaceholder')"
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="errors.province ? 'border-danger' : 'border-line'"
          @input="clearError('province')"
        >

        <p
          v-if="errors.province"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.province }}
        </p>
      </div>

      <div>
        <label
          for="shipping-city"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.shipping.city') }}
        </label>

        <input
          id="shipping-city"
          v-model="form.city"
          type="text"
          autocomplete="address-level2"
          :placeholder="$t('checkout.shipping.cityPlaceholder')"
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="errors.city ? 'border-danger' : 'border-line'"
          @input="clearError('city')"
        >

        <p
          v-if="errors.city"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.city }}
        </p>
      </div>

      <div class="sm:col-span-2">
        <label
          for="shipping-postal-code"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.shipping.postalCode') }}
        </label>

        <input
          id="shipping-postal-code"
          v-model="form.postalCode"
          type="text"
          inputmode="numeric"
          autocomplete="postal-code"
          dir="ltr"
          maxlength="10"
          :placeholder="$t('checkout.shipping.postalCodePlaceholder')"
          class="min-h-12 w-full rounded-xl border bg-surface px-4 text-left text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="errors.postalCode ? 'border-danger' : 'border-line'"
          @input="clearError('postalCode')"
        >

        <p
          v-if="errors.postalCode"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.postalCode }}
        </p>
      </div>

      <div class="sm:col-span-2">
        <label
          for="shipping-address"
          class="mb-2 block text-sm font-medium text-ink"
        >
          {{ $t('checkout.shipping.addressLine') }}
        </label>

        <textarea
          id="shipping-address"
          v-model="form.addressLine"
          rows="4"
          autocomplete="street-address"
          :placeholder="$t('checkout.shipping.addressPlaceholder')"
          class="w-full resize-y rounded-xl border bg-surface px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          :class="errors.addressLine ? 'border-danger' : 'border-line'"
          @input="clearError('addressLine')"
        />

        <p
          v-if="errors.addressLine"
          class="mt-2 text-sm text-danger"
        >
          {{ errors.addressLine }}
        </p>
      </div>
    </div>

    <fieldset class="mt-8">
      <legend class="font-bold text-ink">
        {{ $t('checkout.shipping.methodTitle') }}
      </legend>

      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <label
          v-for="method in shippingMethods"
          :key="method.value"
          class="cursor-pointer rounded-2xl border p-4 transition"
          :class="
            selectedMethod === method.value
              ? 'border-brand bg-brand/5'
              : 'border-line bg-surface hover:border-brand/50'
          "
        >
          <div class="flex items-start gap-3">
            <input
              v-model="selectedMethod"
              type="radio"
              name="shipping-method"
              :value="method.value"
              class="mt-1 accent-brand"
            >

            <span>
              <span class="block font-semibold text-ink">
                {{ $t(method.label) }}
              </span>

              <span class="mt-1 block text-sm leading-6 text-muted">
                {{ $t(method.description) }}
              </span>
            </span>
          </div>
        </label>
      </div>
    </fieldset>

    <div class="mt-8 flex flex-wrap justify-between gap-4">
      <button
        type="button"
        class="min-h-12 rounded-xl border border-line px-6 font-semibold text-ink transition hover:border-brand hover:text-brand"
        @click="emit('back')"
      >
        {{ $t('checkout.shipping.back') }}
      </button>

      <button
        type="submit"
        class="min-h-12 rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
      >
        {{ $t('checkout.shipping.continue') }}
      </button>
    </div>
  </form>
</template>