const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const toCurrency = (value: number) => formatter.format(value)

export const truncate = (str: string, length: number) => {
  if (str.length > length)
    return `${str.substring(0, length)}...`

  return str
}
