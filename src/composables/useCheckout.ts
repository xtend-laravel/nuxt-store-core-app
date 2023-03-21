export default async function useCheckout(): Promise<any> {
  // @todo Improve later perhaps we only need to fetch the step we are on?
  return $fetch('/api/checkout/')
}
