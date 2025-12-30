<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'
import { computed, ref } from 'vue'

import type { Key } from 'ant-design-vue/es/_util/type'

import { useNews } from '@/composables/useNews'
import type { NewsType, NewsModelType } from '@/types'
import { NEWS_TYPE } from '@/utils/constants'

const pageConfig = ref({
  current: 1,
  pageSize: 4,
})
const activeTab = ref(0)
const queryParams = computed(() => ({
  page: pageConfig.value.current,
  pageSize: pageConfig.value.pageSize,
  type: activeTab.value
}))
const { data } = useNews(queryParams)
const newsList = computed(() => data.value.list)
const total = computed(() => data.value.total)
const modalConfig = ref<NewsModelType>({
  isOpen: false,
  list: [],
  data: {
    id: 0,
    title: '',
    introduction: '',
    img: '',
    type: 0
  }
})

const handleTabChange = (key: Key) => {
  activeTab.value = Number(key)
  pageConfig.value.current = 1
}

const handleOpenModal = (data: NewsType) => {
  modalConfig.value.isOpen = true
  modalConfig.value.list = newsList.value
  modalConfig.value.data = data
}

useSeoMeta({
  title: '最新消息',
  description:
    '好日子咖啡輕食最新消息，不定期推出優惠活動與新品上市資訊，歡迎關注。',
})
definePageMeta({ title: '最新消息' })
</script>

<template>
  <section class="contentWrap">
    <Divider title="最新消息" />
    <div class="filterWrap">
      <a-tabs v-model:active-key="activeTab" @change="handleTabChange">
        <a-tab-pane
          v-for="option in NEWS_TYPE"
          :key="option.value"
          :tab="option.label"
          show-size-changer
        />
      </a-tabs>
    </div>
    <div class="flex flex-wrap justify-between m-auto w-full">
      <div
        v-for="news in newsList"
        :key="news.title"
        role="button"
        tabindex="0"
        class="w-full cursor-pointer mb-[8%] newsFull:w-[48.5%]"
        @click="handleOpenModal(news)"
        @keyup.enter="handleOpenModal(news)"
      >
        <div class="w-full aspect-[475/300] overflow-hidden">
          <ResponsiveImg
            img-class="w-full transition-transform duration-[.3s] hover:scale-[1.2] aspect-[475/300] w-[475px]"
            :src="news.img"
            :alt="news.title"
            :fetchpriority="'high'"
            :loading="'eager'"
          />
        </div>
        <div class="p-[0_4%]">
          <h3 class="text-[18px] text-[var(--mainTxt)] leading-[30px] font-[400] tracking-[.1em] m-[8px_0] hover:text-[var(--mainRed)]">
            {{ news.title }}
          </h3>
          <p class="text-[16px] text-[var(--mainTxt)] leading-[25px] tracking-[.04em] font-[100] text-ellipsis line-clamp-2 break-all hover:text-[var(--mainRed)]">
            {{ news.introduction }}
          </p>
        </div>
      </div>
    </div>
    <Pagination v-model="pageConfig" :total="total" />
  </section>
  <NewsModal v-model="modalConfig" />
</template>
