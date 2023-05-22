import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * Convert a date to a relative time
 */
export function fromNow(date: string) {
  return dayjs(date).fromNow()
}
