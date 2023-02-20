export interface CheckoutStep {
  index: number
  completed: boolean
  title: string
  description: string
  component: any
  hidden?: boolean
}

export interface OrderSummary<TAmount, TCurrency> {
  cartId: number
  billingAddressId: number
  currency: TCurrency
  shippingAddressId: number
  subtotal: TAmount
  shipping: TAmount
  tax: TAmount
  discount: TAmount
  total: TAmount
}

export interface PaymentMethods {
  id: number
  name: string
  description?: string
  is_active: boolean
  is_default: boolean
}

export interface ShippingMethods {
  id: number
  name: string
  description?: string
  is_active: boolean
  is_default: boolean
}

export interface Addresses {
  id: number
  address_type: string
  first_name: string
  last_name?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state?: string
  zip_code: string
}

export interface CheckoutState {
  _steps: CheckoutStep[]
  _currentStep: number
  _orderSummary: OrderSummary<string, string>
  _paymentMethods: PaymentMethods[]
  _shippingMethods: ShippingMethods[]
  _addresses: Addresses[]
}
