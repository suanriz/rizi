<script lang="ts" setup>
import { ref, computed } from 'vue'

import { useNews } from '@/composables/useNews'
import type { NewsModelType, NewsType } from '@/types'

const query = ref({ page: 1, pageSize: 3, type: 0 })
const { data } = await useNews(query)
const newsData = computed(() => data.value.list)
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

const handleOpenModal = (article: NewsType) => {
  modalConfig.value.isOpen = true
  modalConfig.value.list = newsData.value
  modalConfig.value.data = article
}
</script>

<template>
  <section class="w-full aspect-[115/49]">
    <Divider title="最新消息" />
    <div class="px-[4%]">
      <div
        v-for="news in newsData"
        :key="news.title"
        role="button"
        tabindex="0"
        class="group not-first:mt-[25px] md:not-first:mt-[4%] no-underline transition duration-[.7s] flex justify-between items-center cursor-point hover:translate-x-[3.6%]"
        @click="handleOpenModal(news)"
        @keyup.enter="handleOpenModal(news)"
      >
        <div class="item">
          <h3 class="text-[18px] font-[400] tracking-[0.1em] leading-[1.2em] text-[var(--mainTxt)] mb-[2%] hover:text-[var(--mainRed)]">
            {{ news.title }}
          </h3>
          <p class="text-[14px] font-[300] leading-[1.2em] tracking-[.1em] text-[var(--mainTxt)] hover:text-[var(--mainRed)]">
            {{ news.introduction }}
          </p>
        </div>
        <div class="ml-[6px] grayscale-100 opacity-50 group-hover:grayscale-0 group-hover:opacity-100">
          <img
            class="!block aspect-square w-[20px]"
            src="/img/icon/moreOutline.svg"
            alt="看更多"
          >
        </div>
      </div>
    </div>
    <MoreBtn link="news" />
  </section>
  <NewsModal v-model="modalConfig" />
</template>
