<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'

import type { InfoDataType } from '@/types'
import { SHOP_INFO_TYPE, SHOP_INFO } from '@/utils/constants'

const { app: { baseURL } } = useRuntimeConfig()
const SHOP_TYPE = SHOP_INFO_TYPE.filter(x => x.type !== 'mail')
</script>

<template>
  <section class="overflow-x-clip">
    <Divider title="門市資訊" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[10px] justify-items-center">
      <div
        v-for="item in SHOP_INFO"
        :key="item.name"
        class="max-w-[282px] infoSm:max-w-full infoSm:w-full flex flex-col infoSm:flex-row md:flex-col not-first:mt-[20px] infoSm:not-first:mt-0"
        :data-aos="item.aos"
        data-aos-duration="700"
        data-aos-easing="ease-in-sine"
      >
        <div class="w-full infoSm:w-[55%] md:w-full infoSm:mr-[8px] flex">
          <ResponsiveImg img-class="w-full w-[282px] aspect-[282/220]" :src="item.img" :alt="item.name" />
        </div>
        <div class="w-full max-w-[282px] infoSm:max-w-none infoSm:w-[45%] md:w-full m-auto">
          <h3
            :data="item.name"
            class="text-[20px] leading-[20px] font-[300] tracking-[.04em] !text-[var(--mainWhite)] relative mt-[20px] infoSm:mt-0 md:mt-[20px] ml-[35px] [-webkit-text-stroke:3px_var(--mainRed)] before:[-webkit-text-stroke:0] text-stroke-[3px_var(--mainRed)] text-shadow-[1px_0px_2px_var(--mainRed),0px_1px_2px_var(--mainRed),-1px_0px_0px_var(--mainRed),0px_-1px_0px_var(--mainRed),2px_0px_2px_var(--mainRed),0px_2px_2px_var(--mainRed),-2px_0px_0px_var(--mainRed),0px_-2px_0px_var(--mainRed)] before:content-[attr(data)] before:absolute before:w-[200px] before:h-[100px]"
          >
            {{ item.name }}
          </h3>
          <div v-for="type in SHOP_TYPE" :key="type.type + item.name" class="mt-[20px] flex">
            <div>
              <img
                :src="`${baseURL}img/icon/${type.type}.webp`"
                :alt="type.label"
                class="aspect-square !align-bottom w-[24px]"
              >
            </div>
            <div>
              <span class="text-[16px] tracking-[.04em] leading-[24px] font-[100] inline-block ml-[10px]">
                {{ item[type.type as keyof InfoDataType] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
