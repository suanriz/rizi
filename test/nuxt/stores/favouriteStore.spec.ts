import { message } from 'ant-design-vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useFavouriteStore } from '@/stores/favouriteStore'
import type { GoodType, CoffeeDetailType } from '@/types'

vi.mock('ant-design-vue', () => ({
  message: {
    success: vi.fn(),
  },
}))

describe('favouriteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    vi.stubGlobal('process', { ...process, client: true })
    vi.stubGlobal('document', {
      querySelector: vi.fn().mockReturnValue(null),
    })
  })

  const mockItem: GoodType<CoffeeDetailType> = {
    id: 1,
    name: 'Coffee',
    price: 100,
    img: 'coffee.jpg',
    link: '/coffee',
    type: 1,
    tag: [1],
    detail: {
      imgs: ['coffee.jpg'],
      features: {
        flavor: 'Bitter',
        flavorDetail: 'Dark Roast',
        roast: 'Dark',
        acidity: 'Low'
      },
      info: ['Test info']
    }
  }

  it('should add an item to favourites', () => {
    const store = useFavouriteStore()
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
    expect(store.items[0]).toEqual(mockItem)
    expect(message.success).toHaveBeenCalledWith('加入成功')
  })

  it('should not add duplicate items', () => {
    const store = useFavouriteStore()
    store.add(mockItem)
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
  })

  it('should remove an item by id', () => {
    const store = useFavouriteStore()
    store.add(mockItem)
    store.remove(1)

    expect(store.items).toHaveLength(0)
  })

  it('should toggle item in favourites', () => {
    const store = useFavouriteStore()
    store.toggle(mockItem)
    expect(store.items).toHaveLength(1)

    store.toggle(mockItem)
    expect(store.items).toHaveLength(0)
  })

  it('should clear all favourites', () => {
    const store = useFavouriteStore()
    store.add(mockItem)
    store.clear()

    expect(store.items).toHaveLength(0)
  })

  it('should handle message when messageDOM exists', () => {
    vi.stubGlobal('document', {
      querySelector: vi.fn().mockReturnValue([{}]),
    })
    const store = useFavouriteStore()
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
    expect(message.success).toHaveBeenCalledWith('加入成功')
  })
})
