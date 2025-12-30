import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

import type { GoodType, CoffeeDetailType } from '@/types'

export const useFavouriteStore = defineStore('favourite', {
  state: () => ({
    items: [] as GoodType<CoffeeDetailType>[],
  }),

  persist: {
    pick: ['items'],
  },

  actions: {
    add (item: GoodType<CoffeeDetailType>) {
      const exists = this.items.some(i => i.id === item.id)
      const messageDOM = document.querySelector('.ant-message-notice') as NodeListOf<HTMLElement> | null
      if (exists) return

      this.items.push(item)

      if (!messageDOM || messageDOM?.length === 0) message.success('加入成功')
      message.success('加入成功')

    },

    remove (id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },

    toggle (item: GoodType<CoffeeDetailType>) {
      const exists = this.items.some(i => i.id === item.id)
      if (exists) {
        this.remove(item.id)
      } else {
        this.add(item)
      }
    },

    clear () {
      this.items = []
    },
  },
})
