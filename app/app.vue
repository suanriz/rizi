<script setup lang="ts">
import { useHead, useRuntimeConfig } from '#imports'

const { app: { baseURL } } = useRuntimeConfig()

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
</script>

<template>
  <a-extract-style>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-extract-style>
</template>
