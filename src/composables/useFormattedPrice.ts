import type { ComputedRef, Ref } from 'vue'
import { computed, isRef } from 'vue'

interface FormattedPrice {
  formatPrice: (price: Ref<number> | number, discountPercentage?: number, priceDivisor?: number) => ComputedRef<string>
}

export default function useFormattedPrice(currencyCode?: string): FormattedPrice {
  const formatPrice = (price: Ref<number> | number, discountPercentage = 0, priceDivisor = 1): ComputedRef<string> => {
    let priceValue = isRef(price) ? price.value : price
    if (discountPercentage) {
      priceValue = priceValue - priceValue * (discountPercentage / 100)
    }
    return computed(() =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode || useRuntimeConfig().public.defaultCurrencyCode || 'USD',
      }).format(priceValue / priceDivisor),
    )
  }

  return {
    formatPrice,
  }
}
