import type { CartItem } from '~/features/cart/types/cart'
import { useCartStore } from '~/stores/cart'

const CART_STORAGE_KEY = 'artovia-cart'

export default defineNuxtPlugin((nuxtApp) => {
  const cartStore = useCartStore()

  nuxtApp.hook('app:mounted', () => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY,
      )

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart)

        if (Array.isArray(parsedCart)) {
          cartStore.restoreItems(
            parsedCart as CartItem[],
          )
        }
      }
    }
    catch {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
    finally {
      cartStore.markAsHydrated()
    }

    cartStore.$subscribe(
      (_mutation, state) => {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.items),
        )
      },
      {
        detached: true,
      },
    )
  })
})