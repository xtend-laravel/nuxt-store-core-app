interface StoreInventory {
  products: any
  categories: any
}

export default async function useStoreInventory(): Promise<StoreInventory> {
  const inventory = await $fetch('/api/category-[id]')
  const { products, categories }: any = inventory

  return {
    products,
    categories,
  }
}
