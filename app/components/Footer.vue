<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'

import type { InfoDataType } from '@/types'
import {
  CONTACT_INFO,
  SHOP_INFO_TYPE,
  SHOP_INFO,
  SNS_INFO,
} from '@/utils/constants'

const { app: { baseURL } } = useRuntimeConfig()
const HEAD_OFFICE_TYPE = [...SHOP_INFO_TYPE.filter(x => x.type !== 'opening')].sort((a, b) => {
  if (a.type === 'address') return -1
  if (b.type === 'address') return 1
  return 0
})
const HEAD_OFFICE_INFO = SHOP_INFO.find(x => x.id === 1) as InfoDataType 
</script>

<template>
  <footer class="w-full bg-[var(--mainGray)] text-[var(--mainTxt)] font-[300] text-[12px] leading-[12px] py-[20px]">
    <div class="px-[4%] m-auto max-w-[1280px]">
      <div class="flex flex-col md:flex-row items-center md:justify-between">
        <div class="max-w-[246px] aspect-[246/108]">
          <img
            :src="`${baseURL}img/logoFooter.webp`"
            class="w-full w-[246px] aspect-[246/108]"
            alt=" logo"
          >
        </div>
        <div class="my-[3.4%] footerSm:mx-0 flex flex-col footerSm:flex-row justify-between items-center footerSm:items-end md:w-[60%] md:ml-[6%]">
          <div>
            <div class="flex flex-col m-auto items-center footerSm:items-start">
              <p class="tracking-[.08em]">
                創始店鋪
              </p>
              <div
                v-for="item in HEAD_OFFICE_TYPE"
                :key="item.type"
                class="flex items-center mt-[14px]"
              >
                <img
                  :src="`${baseURL}img/icon/${item.type}.webp`"
                  class="mr-[2px] aspect-square w-[14px]"
                  :alt="item.label"
                >
                <span class="tracking-[0.08em]">{{ HEAD_OFFICE_INFO[item.type as keyof InfoDataType] }}</span>
              </div>
            </div>
          </div>
          <div
            v-for="contactGroup in CONTACT_INFO"
            :key="JSON.stringify(contactGroup)"
            class="flex flex-col footer2Sm:flex-row footerSm:flex-col justify-center items-stretch footerSm:ml-[14px]"
          >
            <NuxtLink
              v-for="contact in contactGroup"
              :key="contact.name"
              :to="contact.link"
              class="!text-[var(--mainTxt)] hover:!text-[var(--mainRed)] no-underline tracking-[.08em] mt-[14px] mx-[6px] footerSm:mx-0 leading-[14px]"
            >
              {{ contact.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col-reverse md:flex-row items-center md:justify-between md:mt-[20px]">
        <div>
          <p class="mt-[14px] md:mt-0 text-center leading-[1.5em]">
            Copyright © {{ new Date().getFullYear() }} RIZI Company. All rights reserved.
          </p>
        </div>
        <div class="mt-[3.4%] md:mt-0">
          <a
            v-for="sns in SNS_INFO"
            :key="sns.type"
            :href="sns.link"
            target="_blank"
            rel="noopener noreferrer"
            class="not-first:ml-[6px]"
            :aria-label="sns.type"
          >
            <img
              :src="`${baseURL}img/icon/${sns.type}.webp`"
              :alt="sns.type"
              class="transition duration-[.3s] hover:translate-y-[-10px] aspect-square w-[23px]"
            >
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
