interface ISplitTesting {
  page?: string
  version: 'A' | 'B' | undefined
  params?: any
}
export default function useSplitTesting(options: ISplitTesting): ISplitTesting {
  return {
    page: options.page,
    version: options.version,
    params: options.params || undefined,
  }
}
