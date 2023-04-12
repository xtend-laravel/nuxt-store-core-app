export default function useProductRoute(product: any) {
  // console.log('useProductRoute', product.category_slug)
  const attributes = product.attributes || product
  const url = `/${attributes.category_slug}/${attributes.id}-${attributes.name.toLowerCase().replace(/[\s\W-]+/g, '-')}`
  return { url }
}
