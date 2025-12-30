<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'

import { MENU_TYPE_INFO } from '@/utils/constants'

useSeoMeta({
  title: '門市菜單',
  description:
    '好日子咖啡輕食完整菜單瀏覽，包括手沖咖啡、特調飲品、精緻甜點與健康輕食等多樣選擇。',
})
definePageMeta({ title: '門市菜單' })
</script>

<template>
  <section class="contentWrap">
    <Divider title="門市菜單" />
    <div
      v-for="item in MENU_TYPE_INFO"
      :key="item.name"
      class="flex flex-col md:flex-row justify-between mb-[4%] even:flex-col even:md:flex-row-reverse"
      :data-aos="item.aos"
      data-aos-duration="700"
      data-aos-easing="ease-in-sine"
    >
      <div class="w-full md:w-[50%]">
        <ResponsiveImg
          img-class="object-cover w-full h-full aspect-[500/250] w-[500px]"
          :src="item.img"
          :alt="item.name"
          fetchpriority="high"
          loading="eager"
        />
      </div>
      <div class="w-full md:w-[48%]">
        <h3 class="text-[18px] text-[var(--mainRed)] leading-[30px] tracking-[.04em] font-[300]">
          {{ item.name }}
        </h3>
        <p class="text-[16px] text-[var(--mainTxt)] leading-[25px] tracking-[.04em] font-[100]">
          {{ item.introduction }}
        </p>
        <NuxtLink :to="item.link" class="no-underline cursor-auto">
          <div class="flex justify-end mt-[6px] leading-[1em]">
            <button>View more</button>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
