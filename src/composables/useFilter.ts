export default async function useFilter(repositories: string, filterQueryString: string): Promise<any> {
  console.log(filterQueryString)
  return $fetch(`/api/products/${filterQueryString}`)
}
