import { ComputedRef, Ref, computed, isRef, ref } from "vue";

interface FormattedPrice {
  formatPrice: (
    price: Ref<number> | number,
    discountPercentage?: number,
    priceDivisor?: number
  ) => ComputedRef<string>;
}

export default function useFormattedPrice(
  currencyCode: string
): FormattedPrice {
  const formatPrice = (
    price: Ref<number> | number,
    discountPercentage: number = 0,
    priceDivisor: number = 1
  ): ComputedRef<string> => {
    let priceValue = isRef(price) ? price.value : price;
    if (discountPercentage) {
      priceValue = priceValue - priceValue * (discountPercentage / 100);
    }
    const formattedPrice = computed(() =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
      }).format(priceValue / priceDivisor)
    );
    return formattedPrice;
  };

  return {
    formatPrice,
  };
}
