export default async function useCart(): Promise<any> {
  return $fetch('/api/cart')
}
