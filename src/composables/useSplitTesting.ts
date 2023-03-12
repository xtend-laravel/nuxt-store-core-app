interface ISplitTesting {
  version: 'A' | 'B' | undefined
  route?: string
  params?: any
}
export default async function useSplitTesting(options: ISplitTesting): Promise<void> {
  console.log('useSplitTesting', options)
}
