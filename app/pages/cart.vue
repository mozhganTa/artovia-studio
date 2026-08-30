<script setup lang="ts">
import CartItemRow from "~/features/cart/components/CartItemRow.vue";

const cartStore = useCartStore();
const localePath = useLocalePath();
const { t } = useI18n();

const formattedSubtotal = useFormattedPrice(() => {
  return cartStore.subtotal;
});

useSeoMeta({
  title: () => t("seo.cart.title"),
  robots: "noindex, nofollow",
});
</script>

<template>
  <section class="bg-canvas py-10 sm:py-14 lg:py-16">
    <AppContainer>
      <h1 class="text-3xl font-bold text-ink sm:text-4xl">
        {{ $t("cart.title") }}
      </h1>

      <div
        v-if="!cartStore.isHydrated"
        role="status"
        class="mt-10 rounded-3xl border border-line bg-surface px-6 py-16 text-center"
      >
        <div
          class="mx-auto size-8 animate-spin rounded-full border-4 border-line border-t-brand"
        />

        <p class="mt-4 font-medium text-muted">
          {{ $t("cart.loading") }}
        </p>
      </div>

      <!-- سبد خرید خالی -->
      <div
        v-else-if="cartStore.isEmpty"
        class="mt-10 rounded-3xl border border-line bg-surface px-6 py-16 text-center"
      >
        <h2 class="text-xl font-bold text-ink">
          {{ $t("cart.emptyTitle") }}
        </h2>

        <p class="mt-3 text-muted">
          {{ $t("cart.emptyDescription") }}
        </p>

        <NuxtLink
          :to="localePath('/products')"
          class="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
        >
          {{ $t("cart.continueShopping") }}
        </NuxtLink>
      </div>

      <!-- محصولات و خلاصه سفارش -->
      <div
        v-else
        class="mt-10 grid gap-8 min-[900px]:grid-cols-[minmax(0,1fr)_280px] min-[900px]:items-start lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10"
      >
        <!-- فهرست محصولات -->
        <div>
          <CartItemRow
            v-for="item in cartStore.items"
            :key="item.product.id"
            :item="item"
            @increase="cartStore.increaseQuantity(item.product.id)"
            @decrease="cartStore.decreaseQuantity(item.product.id)"
            @remove="cartStore.removeItem(item.product.id)"
          />
        </div>

        <!-- خلاصه سفارش -->
        <aside
          class="rounded-3xl border border-line bg-surface p-6 min-[900px]:sticky min-[900px]:top-24"
        >
          <h2 class="text-xl font-bold text-ink">
            {{ $t("cart.summary") }}
          </h2>

          <div
            class="mt-6 flex items-center justify-between border-t border-line pt-5"
          >
            <span class="text-muted">
              {{ $t("cart.subtotal") }}
            </span>

            <span class="text-lg font-bold text-ink">
              {{ formattedSubtotal }}
            </span>
          </div>

          <NuxtLink
            :to="localePath('/checkout')"
            class="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 font-semibold text-white transition hover:opacity-90"
          >
            {{ $t("cart.checkout") }}
          </NuxtLink>
        </aside>
      </div>
    </AppContainer>
  </section>
</template>
