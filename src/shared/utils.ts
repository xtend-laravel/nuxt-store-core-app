const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function toCurrency(value: number) {
  return formatter.format(value)
}

export function truncate(str: string, length: number) {
  if (str.length > length)
    return `${str.substring(0, length)}...`

  return str
}
