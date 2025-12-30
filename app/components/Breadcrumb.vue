<script lang="ts" setup>
import { useRoute } from '#imports'
import { computed } from 'vue'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
import type { BreadcrumbType } from '@/types'

const route = useRoute()
const { currentTitle } = useBreadcrumb()
const breadcrumbData = computed(() => route.meta.breadcrumb as BreadcrumbType[] || [])
</script>

<template>
  <section class="w-full bg-[var(--mainGray)] flex justify-center">
    <div class="w-full max-w-[1080px]">
      <ul class="m-auto flex p-[5px_4%_8px] leading-[12px] flex-wrap">
        <li class="text-[12px]">
          <NuxtLink to="/" class="not-hover:!text-[var(--deepGray)] text-[12px]">
            首頁
          </NuxtLink>
        </li>
        <li
          v-for="breadcrumb in breadcrumbData"
          :key="breadcrumb.to"
          class="text-[11px] not-first:before:content-['/'] not-first:before:text-[var(--deepGray)] not-first:before:px-[4px]"
        >
          <NuxtLink :to="breadcrumb.to" class="not-hover:!text-[var(--deepGray)] text-[12px] inline-block">
            {{ breadcrumb.title }}
          </NuxtLink>
        </li>
        <li
          class="text-[11px] not-first:before:content-['/'] not-first:before:text-[var(--deepGray)] not-first:before:px-[4px] text-[var(--deepGray)]"
        >
          <span class="text-[12px] leading-3 inline-block">{{ route.matched[0]?.meta.title ?? currentTitle }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
