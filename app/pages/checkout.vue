<script setup lang="ts">
import CheckoutStepper from "~/features/checkout/components/CheckoutStepper.vue";
import CustomerInformationForm from "~/features/checkout/components/CustomerInformationForm.vue";
import ShippingInformationForm from "~/features/checkout/components/ShippingInformationForm.vue";
import CheckoutReview from "~/features/checkout/components/CheckoutReview.vue";
import { createOrder } from "~/features/orders/services/order.service";
import type {
  CreateOrderInput,
  OrderPaymentStatus,
} from "~/features/orders/types/order";
import type {
  CustomerInformation,
  ShippingAddress,
  ShippingMethod,
} from "~/features/checkout/types/checkout";
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const localePath = useLocalePath();
const { t } = useI18n();

const isSubmitting = ref(false);
const submissionError = ref("");

watch(
  () => [cartStore.isHydrated, cartStore.isEmpty] as const,
  ([isHydrated, isEmpty]) => {
    if (isHydrated && isEmpty) {
      navigateTo(localePath("/cart"));
    }
  },
  {
    immediate: true,
  },
);

useSeoMeta({
  title: () => t("seo.checkout.title"),
  robots: "noindex, nofollow",
});

function handleCustomerSubmit(information: CustomerInformation) {
  checkoutStore.updateCustomer(information);
  checkoutStore.goToStep("shipping");
}

function handleShippingSubmit(
  address: ShippingAddress,
  method: ShippingMethod,
) {
  checkoutStore.updateShippingAddress(address);
  checkoutStore.setShippingMethod(method);
  checkoutStore.goToStep("review");
}

function handleShippingBack() {
  checkoutStore.goToStep("customer");
}
function handleReviewBack() {
  checkoutStore.goToStep("shipping");
}

function handleEditCustomer() {
  checkoutStore.goToStep("customer");
}

function handleEditShipping() {
  checkoutStore.goToStep("shipping");
}

const paymentResultPaths: Record<OrderPaymentStatus, string> = {
  paid: "/payment/success",
  failed: "/payment/failed",
  pending: "/payment/pending",
};

async function handleOrderSubmit() {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  submissionError.value = "";

  const input: CreateOrderInput = {
    customer: {
      ...checkoutStore.customer,
    },

    shippingAddress: {
      ...checkoutStore.shippingAddress,
    },

    shippingMethod: checkoutStore.shippingMethod,

    items: cartStore.items.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    }),
  };

  try {
    const result = await createOrder(input);

    await navigateTo({
      path: localePath(paymentResultPaths[result.paymentStatus]),
      query: {
        order: result.orderNumber,
      },
    });

    if (result.paymentStatus === "paid") {
      cartStore.clearCart();
      checkoutStore.resetCheckout();
    }
  } catch {
    submissionError.value = t("checkout.review.submitError");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="bg-canvas py-10 sm:py-14 lg:py-16">
    <AppContainer>
      <div
        v-if="!cartStore.isHydrated"
        role="status"
        class="rounded-3xl border border-line bg-surface px-6 py-16 text-center"
      >
        <div
          class="mx-auto size-8 animate-spin rounded-full border-4 border-line border-t-brand"
        />

        <p class="mt-4 font-medium text-muted">
          {{ $t("checkout.loading") }}
        </p>
      </div>

      <template v-else-if="!cartStore.isEmpty">
        <header class="max-w-2xl">
          <h1 class="text-3xl font-bold text-ink sm:text-4xl">
            {{ $t("checkout.title") }}
          </h1>

          <p class="mt-4 text-muted">
            {{ $t("checkout.description") }}
          </p>
        </header>

        <div class="mt-10 max-w-2xl">
          <CheckoutStepper :current-step="checkoutStore.currentStep" />
        </div>

        <div class="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <CustomerInformationForm
            v-if="checkoutStore.currentStep === 'customer'"
            :initial-values="checkoutStore.customer"
            @submit="handleCustomerSubmit"
          />

          <ShippingInformationForm
            v-else-if="checkoutStore.currentStep === 'shipping'"
            :initial-address="checkoutStore.shippingAddress"
            :initial-method="checkoutStore.shippingMethod"
            @back="handleShippingBack"
            @submit="handleShippingSubmit"
          />

          <CheckoutReview
            v-else
            :items="cartStore.items"
            :customer="checkoutStore.customer"
            :shipping-address="checkoutStore.shippingAddress"
            :shipping-method="checkoutStore.shippingMethod"
            :subtotal="cartStore.subtotal"
            :shipping-cost="checkoutStore.shippingCost"
            :is-submitting="isSubmitting"
            :submission-error="submissionError"
            @back="handleReviewBack"
            @edit-customer="handleEditCustomer"
            @edit-shipping="handleEditShipping"
            @submit="handleOrderSubmit"
          />
        </div>
      </template>
    </AppContainer>
  </section>
</template>
