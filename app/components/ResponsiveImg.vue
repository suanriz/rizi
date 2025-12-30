<script setup lang="ts">
defineOptions({
  name: 'ResponsiveImg',
  inheritAttrs: false
})

import { useRuntimeConfig } from '#imports'
import { useAttrs } from 'vue'
import type { PropType, CSSProperties } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  imgClass: {
    type: [String, Array, Object] as PropType<
      | string
      | string[]
      | Record<string, boolean>
    >,
    default: undefined,
  },
  imgStyle: Object as PropType<CSSProperties>,
  wrapClass: {
    type: [String, Array, Object] as PropType<string | string[] | Record<string, boolean>>,
    default: undefined,
  },
  loading: String as PropType<'lazy' | 'eager' | undefined>,
  fetchpriority: String as PropType<'high' | 'low' | 'auto' | undefined>,
})

const attrs = useAttrs()

const { app: { baseURL } } = useRuntimeConfig()
</script>

<template>
  <picture :class="props.wrapClass">
    <source media="(max-width: 412px)" :srcset="`${baseURL}${props.src}-phone.webp`" type="image/webp">
    <source :media="`(min-width: 412.00001px)`" :srcset="`${baseURL}${props.src}-pc.webp`" type="image/webp">
    <img
      v-bind="attrs"
      :src="`${baseURL}${props.src.replace('LCP', '')}.jpg`"
      :alt="props.alt"
      :fetchpriority="props.fetchpriority"
      :loading="props.loading"
      :class="[props.imgClass]"
      :style="props.imgStyle"
    >
  </picture>
</template>
