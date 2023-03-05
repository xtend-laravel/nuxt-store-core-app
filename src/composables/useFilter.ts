export default async function useFilter(repositories: string, filterQueryString: string): Promise<any> {
  return $fetch(`/api/products/${filterQueryString}`)
}
