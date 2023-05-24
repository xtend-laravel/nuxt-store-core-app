/**
 * Convert a date to a relative time
 */
export function fromNow(date: string) {
  return useDayjs()(date).fromNow()
}
