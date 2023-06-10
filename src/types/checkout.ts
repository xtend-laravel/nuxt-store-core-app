export interface CheckoutStep {
  index: number
  key: string
  completed: boolean
  title: string
  description: string
  component: any
  hidden?: boolean
}

export interface OrderSummary<TAmount, TCurrency> {
  cartId: number
  billingAddressId: number
  shippingAddressId: number
  separateBillingAddress: boolean
  shippingMethodIdentifier?: string
  paymentGatewayIdentifier?: string
  currency: TCurrency
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
  _type: string
  _steps: CheckoutStep[]
  _currentStep: number
  _orderSummary: OrderSummary<string, string>
  _paymentMethods: PaymentMethods[]
  _shippingMethods: ShippingMethods[]
  _addresses: Addresses[]
}
