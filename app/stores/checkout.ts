import { defineStore } from 'pinia'
import type {
  CheckoutStep,
  CustomerInformation,
  ShippingAddress,
  ShippingMethod,
} from '~/features/checkout/types/checkout'

const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 150_000,
  express: 300_000,
}

export const useCheckoutStore = defineStore(
  'checkout',
  () => {
    const currentStep = ref<CheckoutStep>('customer')

    const customer = reactive<CustomerInformation>({
      fullName: '',
      phone: '',
      email: '',
    })

    const shippingAddress = reactive<ShippingAddress>({
      province: '',
      city: '',
      postalCode: '',
      addressLine: '',
    })

    const shippingMethod = ref<ShippingMethod>('standard')

    const shippingCost = computed(() => {
      return SHIPPING_COSTS[shippingMethod.value]
    })

    const isCustomerInformationComplete = computed(() => {
      return (
        customer.fullName.trim() !== ''
        && customer.phone.trim() !== ''
      )
    })

    const isShippingInformationComplete = computed(() => {
      return (
        shippingAddress.province.trim() !== ''
        && shippingAddress.city.trim() !== ''
        && shippingAddress.postalCode.trim() !== ''
        && shippingAddress.addressLine.trim() !== ''
      )
    })

    function updateCustomer(
      information: CustomerInformation,
    ) {
      Object.assign(customer, information)
    }

    function updateShippingAddress(
      address: ShippingAddress,
    ) {
      Object.assign(shippingAddress, address)
    }

    function setShippingMethod(
      method: ShippingMethod,
    ) {
      shippingMethod.value = method
    }

    function goToStep(step: CheckoutStep) {
      const requiresCustomerInformation =
        step === 'shipping'
        || step === 'review'

      if (
        requiresCustomerInformation
        && !isCustomerInformationComplete.value
      ) {
        currentStep.value = 'customer'
        return
      }

      if (
        step === 'review'
        && !isShippingInformationComplete.value
      ) {
        currentStep.value = 'shipping'
        return
      }

      currentStep.value = step
    }

    function resetCheckout() {
      currentStep.value = 'customer'

      Object.assign(customer, {
        fullName: '',
        phone: '',
        email: '',
      })

      Object.assign(shippingAddress, {
        province: '',
        city: '',
        postalCode: '',
        addressLine: '',
      })

      shippingMethod.value = 'standard'
    }

    return {
      currentStep,
      customer,
      shippingAddress,
      shippingMethod,
      shippingCost,
      isCustomerInformationComplete,
      isShippingInformationComplete,
      updateCustomer,
      updateShippingAddress,
      setShippingMethod,
      goToStep,
      resetCheckout,
    }
  },
)