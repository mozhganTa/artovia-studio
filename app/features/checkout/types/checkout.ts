export type CheckoutStep =
  | 'customer'
  | 'shipping'
  | 'review'

export type ShippingMethod =
  | 'standard'
  | 'express'

export interface CustomerInformation {
  fullName: string
  phone: string
  email: string
}

export interface ShippingAddress {
  province: string
  city: string
  postalCode: string
  addressLine: string
}

export interface CheckoutInformation {
  customer: CustomerInformation
  shippingAddress: ShippingAddress
  shippingMethod: ShippingMethod
}