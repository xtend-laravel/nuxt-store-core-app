export default async function useCart(cartId: number): Promise<any> {
  return $fetch(`/api/cart${cartId > 0 ? `?cartId=${cartId}` : ''}`)
}
