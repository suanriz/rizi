<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'
import { computed } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

import { Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import { useBanner } from '@/composables/useBanner'

const { app: { baseURL } } = useRuntimeConfig()
const { data: banners } = await useBanner()
const bannerList = computed(() => banners.value ?? [])
const modules = [Navigation, Autoplay]

const handleOpenNewTab = (link: string) => window.open(baseURL + link, '_blank', 'noopener,noreferrer')
</script>

<template>
  <section class="mt-[2%] aspect-[1280/533] w-full">
    <Swiper
      :modules="modules"
      :loop="true"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
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
      <div class="swiper-button-prev !w-[8vw] !h-[41vw] !text-[var(--mainWhite)] opacity-40 hover:opacity-80 transition duration-[.3s] ease-in-out z-[var(--zIndexDefault)] after:hidden flex items-center justify-center">
        <LeftOutlined class="[&>svg]:!w-[8vw] [&>svg]:!h-[41vw] [&>svg]:text-[var(--mainWhite)] hover:[&>svg]:scale-110 transition-transform" />
      </div>
      <div class="swiper-button-next !w-[8vw] !h-[41vw] !text-[var(--mainWhite)] opacity-40 hover:opacity-80 transition duration-[.3s] ease-in-out z-[var(--zIndexDefault)] after:hidden">
        <RightOutlined class="[&>svg]:!w-[8vw] [&>svg]:!h-[41vw] [&>svg]:text-[var(--mainWhite)] hover:[&>svg]:scale-110 transition-transform" />
      </div>
    </Swiper>
  </section>
</template>
