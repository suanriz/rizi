<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'

import { STEP_INFO } from '@/utils/constants'

useSeoMeta({
  title: '品牌精神',
  description:
    '好日子咖啡輕食追求品質與效率，採用自家烘焙頂級莊園咖啡豆，堅持現做健康輕食。',
})
definePageMeta({ title: '品牌精神' })
</script>

<template>
  <section class="max-w-[1280px] w-full">
    <div class="contentWrap !mb-0">
      <Divider title="品牌精神" />
    </div>
    <ResponsiveImg
      img-class="w-full w-[1280px] aspect-[1280/640]"
      src="img/brand/view"
      alt="品牌專業"
      fetchpriority="high"
      loading="eager"
    />
    <div class="contentWrap">
      <div data-aos="zoom-in" data-aos-duration="800">
        <h3 class="text-[20px] text-[var(--mainRed)] leading-[1.5em] tracking-[.04em] text-center font-[400] m-[6.3%_auto_2.3%_auto]">
          享受生活，過「好日子」
        </h3>
        <p class="text-[16px] font-[100] tracking-[.1em] leading-[35px] text-center text-[var(--mainTxt)] mb-[11.72%]">
          好日子咖啡輕食店追求品質與效率的完美配方，採用自家烘焙的頂級莊園咖啡豆沖煮新鮮的好咖啡<br>堅持健康、天然、不添加人工香料的現做輕食，用最短的等待時間萃取最優質的飲食品味
        </p>
      </div>
      <Divider title="黃金步驟" />
      <div class="w-full flex flex-wrap justify-center brandOneCol:justify-around brandTwoCol:justify-between">
        <div
          v-for="step, index in STEP_INFO"
          :key="step.title"
          class="max-w-[200px] even:brandOneCol:mt-[60px] w-full brandOneCol:w-[calc(50%-16px)] brandTwoCol:w-[calc(100%/4-10px)]"
          :data-aos="step.aos"
          data-aos-duration="700"
        >
          <div class="w-full relative">
            <h3 class="text-shadow-deep absolute top-[12px] left-[38px] font-[400] text-[25px] leading-[25px] text-[var(--mainWhite)]">
              {{ step.title }}
            </h3>
            <span
              class="text-shadow-deep absolute top-[40px] left-[41px] font-[400] text-[var(--mainWhite)] text-[12px] leading-[12px]"
            >
              {{ step.sub }}
            </span>
            <span class="text-shadow-deep absolute top-[5px] left-[11px] font-[500] text-[50px] leading-[50px] text-[var(--mainWhite)] opacity-70">
              {{ index + 1 }}
            </span>
            <ResponsiveImg img-class="w-full rounded-[20px]" :src="step.img" :alt="step.title" />
          </div>
          <div class="p-[5%_6.5%] text-[16px] font-[100] tracking-[.08em] leading-[25px] text-[var(--mainTxt)] text-justify">
            <p>{{ step.introduction }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
