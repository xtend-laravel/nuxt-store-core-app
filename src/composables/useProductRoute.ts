export default function useProductRoute(product: any) {
  console.log('useProductRoute', product.category_slug)
  const url = `/${product.attributes.category_slug}/${product.attributes.id}-${product.attributes.name.en
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-')}`
  return { url }
}
