<script setup lang="ts">
import type { CartItem } from "~/features/cart/types/cart";
import type {
  CustomerInformation,
  ShippingAddress,
  ShippingMethod,
} from "~/features/checkout/types/checkout";

const props = defineProps<{
  items: CartItem[];
  customer: CustomerInformation;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  subtotal: number;
  shippingCost: number;
  isSubmitting: boolean;
  submissionError?: string;
}>();

const emit = defineEmits<{
  back: [];
  editCustomer: [];
  editShipping: [];
  submit: [];
}>();

const { locale } = useI18n();

const currentLocale = computed(() => {
  return locale.value as "fa" | "en";
});

const productItems = computed(() => {
  return props.items.map((item) => {
    return {
      id: item.product.id,
      title: item.product.title[currentLocale.value],
      quantity: item.quantity,
    };
  });
});

const total = computed(() => {
  return props.subtotal + props.shippingCost;
});

const formattedSubtotal = useFormattedPrice(() => {
  return props.subtotal;
});

const formattedShippingCost = useFormattedPrice(() => {
  return props.shippingCost;
});

const formattedTotal = useFormattedPrice(() => {
  return total.value;
});
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <header>
      <h2 class="text-2xl font-bold text-ink">
        {{ $t("checkout.review.title") }}
      </h2>

      <p class="mt-2 text-muted">
        {{ $t("checkout.review.description") }}
      </p>
    </header>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <!-- اطلاعات خریدار -->
      <section class="rounded-2xl border border-line p-5">
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-bold text-ink">
            {{ $t("checkout.review.customerTitle") }}
          </h3>

          <button
            type="button"
            class="text-sm font-semibold text-brand hover:underline"
            @click="emit('editCustomer')"
          >
            {{ $t("checkout.review.edit") }}
          </button>
        </div>

        <dl class="mt-4 space-y-2 text-sm">
          <div>
            <dt class="sr-only">
              {{ $t("checkout.customer.fullName") }}
            </dt>

            <dd class="font-medium text-ink">
              {{ customer.fullName }}
            </dd>
          </div>

          <div>
            <dt class="sr-only">
              {{ $t("checkout.customer.phone") }}
            </dt>

            <dd class="text-muted" dir="ltr">
              {{ customer.phone }}
            </dd>
          </div>

          <div>
            <dt class="sr-only">
              {{ $t("checkout.customer.email") }}
            </dt>

            <dd class="text-muted" dir="ltr">
              {{ customer.email || $t("checkout.review.emailNotProvided") }}
            </dd>
          </div>
        </dl>
      </section>

      <!-- اطلاعات ارسال -->
      <section class="rounded-2xl border border-line p-5">
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-bold text-ink">
            {{ $t("checkout.review.shippingTitle") }}
          </h3>

          <button
            type="button"
            class="text-sm font-semibold text-brand hover:underline"
            @click="emit('editShipping')"
          >
            {{ $t("checkout.review.edit") }}
          </button>
        </div>

        <div class="mt-4 space-y-2 text-sm">
          <p class="font-medium text-ink">
            {{ shippingAddress.province }}،
            {{ shippingAddress.city }}
          </p>

          <p class="leading-6 text-muted">
            {{ shippingAddress.addressLine }}
          </p>

          <p class="text-muted" dir="ltr">
            {{ shippingAddress.postalCode }}
          </p>

          <p class="text-muted">
            {{
              shippingMethod === "standard"
                ? $t("checkout.shipping.standard")
                : $t("checkout.shipping.express")
            }}
          </p>
        </div>
      </section>
    </div>

    <!-- محصولات -->
    <section class="mt-6 rounded-2xl border border-line p-5">
      <h3 class="font-bold text-ink">
        {{ $t("checkout.review.itemsTitle") }}
      </h3>

      <ul class="mt-4 divide-y divide-line">
        <li
          v-for="item in productItems"
          :key="item.id"
          class="flex items-center justify-between gap-4 py-3"
        >
          <span class="font-medium text-ink">
            {{ item.title }}
          </span>

          <span class="text-sm text-muted">
            {{
              $t("checkout.review.quantity", {
                count: item.quantity,
              })
            }}
          </span>
        </li>
      </ul>
    </section>

    <!-- محاسبه مبلغ -->
    <section class="mt-6 rounded-2xl border border-line p-5">
      <dl class="space-y-4">
        <div class="flex items-center justify-between gap-4">
          <dt class="text-muted">
            {{ $t("checkout.review.subtotal") }}
          </dt>

          <dd class="font-semibold text-ink">
            {{ formattedSubtotal }}
          </dd>
        </div>

        <div class="flex items-center justify-between gap-4">
          <dt class="text-muted">
            {{ $t("checkout.review.shippingCost") }}
          </dt>

          <dd class="font-semibold text-ink">
            {{ formattedShippingCost }}
          </dd>
        </div>

        <div
          class="flex items-center justify-between gap-4 border-t border-line pt-4"
        >
          <dt class="font-bold text-ink">
            {{ $t("checkout.review.total") }}
          </dt>

          <dd class="text-xl font-bold text-brand">
            {{ formattedTotal }}
          </dd>
        </div>
      </dl>
    </section>
    <p
      v-if="submissionError"
      role="alert"
      class="mt-6 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger"
    >
      {{ submissionError }}
    </p>

    <div class="mt-8 flex flex-wrap justify-between gap-4">
      <button
        type="button"
        class="min-h-12 rounded-xl border border-line px-6 font-semibold text-ink transition hover:border-brand hover:text-brand"
        @click="emit('back')"
      >
        {{ $t("checkout.review.back") }}
      </button>

      <button
        type="button"
        :disabled="isSubmitting"
        class="min-h-12 rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        @click="emit('submit')"
      >
        {{
          isSubmitting
            ? $t("checkout.review.submitting")
            : $t("checkout.review.submit")
        }}
      </button>
    </div>
  </div>
</template>
