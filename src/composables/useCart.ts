export default async function useCart(cartId: number): Promise<any> {
  return $fetch(`/api/cart/${cartId}`)
}
