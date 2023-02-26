import type { IEntity } from '../types/repository'

export default async function useRepositoryAction(options: IEntity): Promise<any> {
  const { repository, action, method = 'POST', data }: IEntity = options

  const body = data ? JSON.stringify(data) : undefined
  return $fetch(`/api/repositories/${repository}/${action}-${repository.slice(0, -1)}-action`, { method, body })
}
