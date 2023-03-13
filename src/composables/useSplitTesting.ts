interface ISplitTesting {
  version: 'A' | 'B' | undefined
  pageName?: string
  params?: any
}
export default function useSplitTesting(options: ISplitTesting): ISplitTesting {
  return {
    version: options.version,
    pageName: options.pageName,
    params: options.params || [],
  }
}
