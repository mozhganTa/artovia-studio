import type {
  CreateOrderInput,
  CreateOrderResponse,
  OrderPaymentStatus,
} from '../types/order'

const MOCK_PAYMENT_STATUS: OrderPaymentStatus = 'paid'

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResponse> {
  if (!input.items.length) {
    throw new Error(
      'Order must contain at least one item.',
    )
  }

  await wait(1000)

  const timestamp = Date.now().toString()

  return {
    orderId: crypto.randomUUID(),
    orderNumber: `ART-${timestamp.slice(-8)}`,
    paymentStatus: MOCK_PAYMENT_STATUS,
  }
}