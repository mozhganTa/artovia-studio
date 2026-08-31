export type OrderPaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'

export interface CreateOrderItem {
  productId: string
  quantity: number
}

export interface CreateOrderCustomer {
  fullName: string
  phone: string
  email: string
}

export interface CreateOrderAddress {
  province: string
  city: string
  postalCode: string
  addressLine: string
}

export interface CreateOrderInput {
  customer: CreateOrderCustomer
  shippingAddress: CreateOrderAddress
  shippingMethod: 'standard' | 'express'
  items: CreateOrderItem[]
}

export interface CreateOrderResponse {
  orderId: string
  orderNumber: string
  paymentStatus: OrderPaymentStatus
}