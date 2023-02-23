import type { IEntity } from '~/types/repository'

// @todo Improve later perhaps migrate over to Pinia Entity Store
export default async function useRepositoryAction(options: IEntity): Promise<any> {
  const { repository, action, method = 'POST', data }: IEntity = options

  return $fetch(`/api/repositories/${repository}/${action}-${repository}-action`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  })
}
