import { toValue } from '#imports'

import { simulateNewsApi } from '@/utils/simulation/news'

export const useNews = (
  params: Ref<{
    page: number;
    pageSize: number;
    type: number;
  }>,
) => {
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `newsList-${p.type}-${p.page}-${p.pageSize}`
  })
  
  return useAsyncData(
    dynamicKey,
    async () => simulateNewsApi(toValue(params)),
    {
      default: () => ({ list: [], total: 0 }),
      watch: [params],
    }
  )
}
