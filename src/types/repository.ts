type Repository = 'products' | 'categories' | 'carts' | 'addresses'
type Action = 'update | create | delete'
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IEntity {
  repository: Repository
  action: Action
  method: RequestMethod
  data?: any
  exclude?: any
}
