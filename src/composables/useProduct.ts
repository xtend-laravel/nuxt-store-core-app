import { ref, unref } from 'vue'

export default function useProduct(attributes: any) {
  const basePrice = ref(attributes.prices.basePrice * 1.2)
  const { formatPrice } = useFormattedPrice()
  const hasDiscount = ref(attributes.legacy_data.reduction_amount > 0)
  const discountPercentage = Math.round(
    (attributes.legacy_data.reduction_amount / (attributes.legacy_data.price * 1.2)) * 100,
  )
  const formattedPrice = formatPrice(unref(basePrice), 0, 100)
  const formattedDiscountedPrice = formatPrice(unref(basePrice), hasDiscount.value ? discountPercentage : 0, 100)
  const stock = ref(attributes.stock)
  const outOfStock = ref(attributes.stock <= 0)

  return {
    basePrice,
    hasDiscount,
    discountPercentage,
    formattedPrice,
    formattedDiscountedPrice,
    stock,
    outOfStock,
  }
}
