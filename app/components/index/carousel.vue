<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'
import { computed } from 'vue'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import { useBanner } from '@/composables/useBanner'

const { app: { baseURL } } = useRuntimeConfig()
const { data: banners } = await useBanner()
const bannerList = computed(() => banners.value ?? [])
const modules = [Navigation]

const handleOpenNewTab = (link: string) => window.open(baseURL + link, '_blank', 'noopener,noreferrer')
</script>

<template>
  <section class="mt-[2%] aspect-[1280/533]">
    <Swiper
      :modules="modules"
      :loop="true"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="h-full"
    >
      <SwiperSlide v-for="(item, index) in bannerList" :key="item.id">
        <div
          :class="{ 'cursor-pointer': item.link }"
          role="button"
          tabindex="0"
          @click="item.link && handleOpenNewTab(item.link)"
          @keyup.enter="item.link && handleOpenNewTab(item.link)"
        >
          <ResponsiveImg
            img-class="w-full h-auto aspect-[1280/533]"
            :src="item.img"
            :alt="item.alt || 'Banner'"
            :fetchpriority="index === 0 ? 'high' : 'low'"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </SwiperSlide>
      <div class="swiper-button-prev !left-[10px] w-[30px] !h-[30px] !text-[30px] !text-[var(--mainWhite)] opacity-50 hover:opacity-100 transition duration-[.3s] ease-in-out z-[var(--zIndexDefault)] after:hidden">
        <LeftCircleOutlined />
      </div>
      <div class="swiper-button-next !right-[10px] w-[30px] !h-[30px] !text-[30px] !text-[var(--mainWhite)] opacity-50 hover:opacity-100 transition duration-[.3s] ease-in-out z-[var(--zIndexDefault)] after:hidden">
        <RightCircleOutlined />
      </div>
    </Swiper>
  </section>
</template>
