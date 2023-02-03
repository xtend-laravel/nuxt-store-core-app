import { onUnmounted } from 'vue'
import { useCheckoutStore } from '~/store/checkout'

export const CHECKOUT_STORAGE = 'CHECKOUT_STORAGE'

export const usePersistCheckout = () => {
  const checkoutStore = useCheckoutStore()

  const unsub = checkoutStore.$subscribe(() => {
    localStorage.setItem(CHECKOUT_STORAGE, JSON.stringify(checkoutStore.contents))
  })

  onUnmounted(() => {
    unsub()
  })
}
