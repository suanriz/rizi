<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'

const props = defineProps({
  link: { type: String, required: true },
  noGoodLink: { type: Boolean, required: false },
})
const { app: { baseURL } } = useRuntimeConfig()
</script>

<template>
  <div class="group flex justify-end font-[400] p-[0_4%] mt-[4%] hover:translate-[3.6%] hover:duration-[.7s] ">
    <div class="w-fit leading-[1em]" :class="{ 'noGoodLink': props.noGoodLink }">
      <NuxtLink
        :to="props.link"
        class="text-[16px] leading-[16px] tracking-[.04em] align-baseline !text-[var(--deepGray)] group-hover:!text-[var(--mainRed)]"
      >
        <slot>View More</slot>
      </NuxtLink>
      <img
        :src="`${baseURL}img/icon/more.svg`"
        alt="看更多"
        class="!align-sub ml-[5px] grayscale-100 opacity-50 group-hover:grayscale-0 group-hover:opacity-100 aspect-square w-[20px]"
      >
    </div>
  </div>
</template>
