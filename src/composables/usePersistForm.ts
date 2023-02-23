import type { IEntity } from '~/types/repository'
import { useGlobalStore } from '~/store/global'

export default async function usePersistForm(options: IEntity) {
  const { data, exclude = [] } = options

  const filteredData: Record<string, unknown> = Object.keys(data)
    .reduce((acc: Record<string, unknown>, key: string) => {
      return exclude.includes(key) ? acc : {...acc, [key]: data[key]}
    }, {})

  delete options.exclude
  return await useGlobalStore()
    .persistEntity({
      ...options,
      data: filteredData,
    })
    .then((response: any) => console.log('response', response))
}
