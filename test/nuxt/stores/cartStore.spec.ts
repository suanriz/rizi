import { message } from 'ant-design-vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useCartStore } from '@/stores/cartStore'
import type { GoodType, CoffeeDetailType } from '@/types'

vi.mock('ant-design-vue', () => ({
  message: {
    success: vi.fn(),
  },
}))

describe('cartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
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

  it('should add a new item to the cart', () => {
    const store = useCartStore()
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
    expect(store.items[0]).toEqual({
      ...mockItem,
      count: 1,
      checked: true,
    })
    expect(message.success).toHaveBeenCalledWith('加入成功')
  })

  it('should increment count if item already exists', () => {
    const store = useCartStore()
    store.add(mockItem)
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
    expect(store.items[0]!.count).toBe(2)
  })

  it('should remove an item by id', () => {
    const store = useCartStore()
    store.add(mockItem)
    store.remove(1)

    expect(store.items).toHaveLength(0)
  })

  it('should check/uncheck all items', () => {
    const store = useCartStore()
    store.add(mockItem)
    store.add({ ...mockItem, id: 2 })

    store.checkAll(false)
    expect(store.items.every(i => !i.checked)).toBe(true)

    store.checkAll(true)
    expect(store.items.every(i => i.checked)).toBe(true)
  })

  it('should toggle checked state of a specific item', () => {
    const store = useCartStore()
    store.add(mockItem)

    store.toggleChecked(1)
    expect(store.items[0]!.checked).toBe(false)

    store.toggleChecked(1)
    expect(store.items[0]!.checked).toBe(true)

    store.toggleChecked(999)
    expect(store.items[0]!.checked).toBe(true)
  })

  it('should handle message when messageDOM exists', () => {
    vi.stubGlobal('document', {
      querySelector: vi.fn().mockReturnValue([{}]),
    })
    const store = useCartStore()
    store.add(mockItem)

    expect(store.items).toHaveLength(1)
    expect(message.success).toHaveBeenCalledWith('加入成功')
  })
})
