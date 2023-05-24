const dayjs = useDayjs()
/**
 * Convert a date to a relative time
 */
export function fromNow(date: string) {
  return dayjs(date).fromNow()
}
