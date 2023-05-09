import { defineStore } from 'pinia'
import type { Category } from './category'
import useStoreInventory from '~/composables/useStoreInventory'
import type { LocaleField } from '~/types/locale'

export interface NavItem {
  id: number
  active: boolean
  name: string | LocaleField
  route?: string
  children: NavItem[]
}

export interface NavbarState {
  _items: NavItem[]
}

export const useNavbarStore = defineStore({
  id: 'navbar',
  state: (): NavbarState => ({
    _items: [],
  }),
  getters: {
    items(): NavItem[] {
      return this._items
    },
  },
  actions: {
    async fetchCategories(): Promise<void> {
      const { data } = await useStoreInventory({
        type: 'categories',
        routeMatch: 'tree',
      })

      const categories = data[0] as Category

      this._items = [...transformCategoriesToNavItems(categories.children)]
    },
    buildBreadcrumbTrailFromCategoryTree(categoryId: number, navItems: NavItem[]): (NavItem[] | NavItem)[] {
      const matchingNavItem = navItems.find((navItem) => navItem.id === categoryId)

      if (matchingNavItem) {
        return [matchingNavItem]
      }

      const findChildNavItem = (navItem: NavItem) =>
        navItem.children.length > 0 &&
        this.buildBreadcrumbTrailFromCategoryTree(categoryId, navItem.children).length > 0

      const childNavItem = navItems.find(findChildNavItem) || null
      const childBreadcrumbTrail = childNavItem
        ? this.buildBreadcrumbTrailFromCategoryTree(categoryId, childNavItem.children)
        : []

      return childNavItem ? [childNavItem, ...childBreadcrumbTrail] : []
    },
    dynamicBreadcrumb(props: { for: string; data?: any }) {
      const router = useRouter()
      const params = router.currentRoute.value.params
      let breadcrumbs: any = []

      switch (props.for) {
        case 'category':
          breadcrumbs = this.buildBreadcrumbTrailFromCategoryTree(
            parseInt(params.categoryId?.toString(), 10),
            this.items,
          )
          break
        case 'product':
          breadcrumbs = this.buildBreadcrumbTrailFromCategoryTree(
            parseInt(props.data.attributes.primary_category_id.toString(), 10),
            this.items,
          )
          breadcrumbs.push({
            name: props.data.attributes.name,
            route: router.currentRoute.value.path,
          })
          break
        case 'brand':
          breadcrumbs = [
            {
              name: 'Designers',
              route: '/designers',
            },
          ]
          if (props.data) {
            breadcrumbs.push({
              name: props.data.attributes.name,
              route: router.currentRoute.value.path,
            })
          }
          break
        default:
          break
      }
      return breadcrumbs
    },
  },
})

function transformCategoriesToNavItems(categories: Category[]): any {
  return categories.map((category: any) => ({
    id: category.id,
    active: category.active,
    name: category.name,
    route: `/${category.id}-${category.name.toLowerCase().replace(/[\s\W-]+/g, '-')}`,
    children: transformCategoriesToNavItems(category.children),
  }))
}
