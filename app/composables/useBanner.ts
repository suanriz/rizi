import { useAsyncData } from '#imports'

import type { BannerType } from '@/types'
import { simulateBannersApi } from '@/utils/simulation/banners'

export const useBanner = () => {
  return useAsyncData<BannerType[]>(
    'banner',
    async () => simulateBannersApi(),
    {
      server: true,
      default: () => [],
    }
  )
}
