<script setup lang="ts">
import { useHead, useRuntimeConfig } from '#imports'
import { onMounted, ref } from 'vue'

const { app: { baseURL } } = useRuntimeConfig()
const colorPrimary = ref('#702222')
const colorTextBase = ref('#505050')

useHead({
  title: '好日子咖啡輕食 RIZI COFE HOUSE',
  titleTemplate: '%s | 好日子咖啡輕食 RIZI COFE HOUSE',
  htmlAttrs: {
    lang: 'zh-Hant'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    {
      name: 'description',
      content: '好日子咖啡輕食 RIZI COFE HOUSE - 提供高品質的手沖咖啡、特調飲品、幸福甜品與輕食餐點。'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://suanriz.github.io/rizi/' },
    { property: 'og:title', content: '好日子咖啡輕食 RIZI COFE HOUSE' },
    { property: 'og:description', content: '好日子咖啡輕食 RIZI COFE HOUSE - 提供高品質的手沖咖啡、特調飲品、幸福甜品與輕食餐點。' },
    { property: 'og:image', content: 'https://raw.githubusercontent.com/suanriz/rizi/refs/heads/master/public/img/logoFooter.webp' },

    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: 'https://suanriz.github.io/rizi/' },
    { property: 'twitter:title', content: '好日子咖啡輕食 RIZI COFE HOUSE' },
    { property: 'twitter:description', content: '好日子咖啡輕食 RIZI COFE HOUSE - 提供高品質的手沖咖啡、特調飲品、幸福甜品與輕食餐點。' },
    { property: 'twitter:image', content: 'https://raw.githubusercontent.com/suanriz/rizi/refs/heads/master/public/img/logoFooter.webp' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}img/favicon.svg` },
  ]
})

onMounted(() => {
  requestIdleCallback?.(() => {
    const rootStyle = getComputedStyle(document.documentElement)
    const mainRed = rootStyle.getPropertyValue('--mainRed').trim()
    const mainTxt = rootStyle.getPropertyValue('--mainTxt').trim()

    if (mainRed) colorPrimary.value = mainRed
    if (mainTxt) colorTextBase.value = mainTxt
  })
})
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary,
        colorTextBase,
        fontFamily: 'Noto Sans TC, sans-serif'
      }
    }"
  >
    <a-extract-style>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </a-extract-style>
  </a-config-provider>
</template>
