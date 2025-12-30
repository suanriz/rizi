import { useAsyncData, useState, toValue } from '#imports'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
import type { GoodType, CakeDetailType, ApiListResponse } from '@/types'

import {
  simulateMenuApi,
  simulateMenuDetailApi,
} from '@/utils/simulation/menu'

export const useMenuSharedState = () => {
  const menuList = useState<GoodType<CakeDetailType>[]>('shared-menu-list', () => [])
  return { menuList }
}

export const useMenuList = (
  params: Ref<{
    type?: number
    page: number
    pageSize: number
  }>,
  option: { writeShared: boolean } = { writeShared: false }
) => {
  const { menuList } = useMenuSharedState()
  const dynamicKey = computed(() => {
    const p = toValue(params)
    return `MenuList-${p.type}-${p.page}-${p.pageSize}`
  })
  return useAsyncData(
    dynamicKey,
    async () => {
      const res = (await simulateMenuApi(
        toValue(params),
      )) as unknown as ApiListResponse<GoodType<CakeDetailType>>
      if (res.list && option.writeShared) menuList.value = res.list
      return res
    },
    {
      server: true,
      default: () =>
        ({ list: [], total: 0 }) as ApiListResponse<GoodType<CakeDetailType>>,
      watch: [params],
    },
  )
}

export const useMenuDetail = (id: Ref<number>) => {
  const dynamicKey = computed(() => `MenuDetail-${toValue(id)}`)
  const { setTitle } = useBreadcrumb()
  const result = useAsyncData(
    dynamicKey,
    async () => {
      const res = await simulateMenuDetailApi(String(toValue(id)))
      return res
    },
    {
      server: true,
      default: () => ({}) as GoodType<CakeDetailType>,
      watch: [id],
    },
  )

  watch(
    () => result.data.value,
    (newVal) => {
      if (newVal?.name) setTitle(newVal.name)
    },
    { immediate: true }
  )

  return result
}
