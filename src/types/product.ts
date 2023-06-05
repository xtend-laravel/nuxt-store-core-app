interface Product {
  id: number
  slug: string
  name: string
  brand: string
  primary_category_id: number
  category_slug: string
  description: string
  status: string
  images: {
    thumbnail: string
    gallery: string[]
  }
  prices: {
    basePrice: number
  }
  variants: []
  features: []
  legacy_data: any
  stock: number
}

interface Purchasable {
  id: number
  name: string
  price: number
  sku: string
  purchasable: string
  stock: number
  backorder: number
  tax_class_id: number
  tax_class: {
    id: number
    name: string
    default: number
    created_at: string
    updated_at: string
  }
  values: [
    {
      id: number
      product_option_id: number
      name: {
        en: string
        fr: string
      }
      color: null
      position: number
      created_at: string
      updated_at: string
      legacy_data: {
        id: number
        color: string
        product_option_id: string
      }
      pivot: {
        variant_id: number
        value_id: number
        created_at: string
        updated_at: string
      }
      option: {
        id: number
        name: {
          en: string
          fr: string
        }
        position: number
        handle: string
        created_at: string
        updated_at: string
        legacy_data: any
      }
    },
  ]
}

export interface LineItem {
  id: number
  quantity: number
  total: number
  product: Product
  purchasable: Purchasable
}
