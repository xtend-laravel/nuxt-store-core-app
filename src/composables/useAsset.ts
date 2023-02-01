export default function useAsset(path: string): string {
  // ignore presets directory when using meta glob
  const assets = import.meta.glob(['~/assets/**/*', '!**/presets'], {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/${path}`]
}
