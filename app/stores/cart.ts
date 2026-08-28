import { defineStore } from "pinia";
import type { CartItem } from "~/features/cart/types/cart";
import type { ProductPreview } from "~/features/products/types/product";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const isHydrated = ref(false);

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  });

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  const isEmpty = computed(() => {
    return items.value.length === 0;
  });

  function addItem(product: ProductPreview, quantity = 1) {
    if (quantity <= 0) {
      return;
    }

    const existingItem = items.value.find((item) => {
      return item.product.id === product.id;
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }

    items.value.push({
      product,
      quantity,
    });
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((item) => {
      return item.product.id !== productId;
    });
  }

  function increaseQuantity(productId: string) {
    const item = items.value.find((item) => {
      return item.product.id === productId;
    });

    if (item) {
      item.quantity++;
    }
  }

  function decreaseQuantity(productId: string) {
    const item = items.value.find((item) => {
      return item.product.id === productId;
    });

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      removeItem(productId);
      return;
    }

    item.quantity--;
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const item = items.value.find((item) => {
      return item.product.id === productId;
    });

    if (item) {
      item.quantity = Math.floor(quantity);
    }
  }

  function restoreItems(savedItems: CartItem[]) {
    items.value = savedItems.filter((item) => {
      return (
        item.product &&
        typeof item.product.id === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
      );
    });
  }

  function clearCart() {
    items.value = [];
  }

  function markAsHydrated() {
    isHydrated.value = true;
  }

  return {
    items,
    isHydrated,

    totalItems,
    subtotal,
    isEmpty,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    restoreItems,
    clearCart,
    markAsHydrated,
  };
});
