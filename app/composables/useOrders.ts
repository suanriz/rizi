import { toValue } from '#imports'

import { simulateOrdersApi } from '@/utils/simulation/orders'

export const useOrders = (
  params: Ref<{
    page: number;
    pageSize: number;
    status: number;
  }>,
) => {
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `ordersList-${p.status}-${p.page}-${p.pageSize}`
  })

  return useAsyncData(
    dynamicKey,
    async () => simulateOrdersApi(toValue(params)),
    {
      default: () => ({ list: [], total: 0 }),
      watch: [params],
    }
  )
}
