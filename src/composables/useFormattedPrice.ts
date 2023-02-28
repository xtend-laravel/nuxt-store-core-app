import { ComputedRef, Ref, computed } from "vue";

interface FormattedPrice {
  formatPrice: (
    price: Ref<number>,
    dicountPercentage?: number,
    priceDivisor?: number
  ) => ComputedRef<string>;
}

export default function useFormattedPrice(
  currencyCode: string
): FormattedPrice {
  const formatPrice = (
    price: Ref<number>,
    dicountPercentage: number = 0,
    priceDivisor: number = 1
  ): ComputedRef<string> => {
    return computed(() => {
      let priceValue = price.value / priceDivisor;
      if (dicountPercentage) {
        priceValue = priceValue - priceValue * (dicountPercentage / 100);
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
      }).format(priceValue)
    });
  };

  return {
    formatPrice,
  };
}
