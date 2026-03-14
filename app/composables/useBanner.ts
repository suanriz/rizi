import { useAsyncData } from '#imports'

import type { BannerType } from '@/types'
import { simulateBannersApi } from '@/utils/simulation/banners'

export const useBanner = () => {
  return useAsyncData<BannerType[]>(
    'banner',
    async () => {
      const res = await simulateBannersApi()
      return res.filter(x => x.status).sort((a, b) => a.sequence - b.sequence)
    },
    {
      server: true,
      default: () => [],
    }
  )
}
