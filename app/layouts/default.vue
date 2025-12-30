<script setup lang="ts">
import { useRoute } from '#imports'
import { onMounted, ref, computed } from 'vue'

const route = useRoute()
const colorPrimary = ref('#702222')
const colorTextBase = ref('#505050')

onMounted(() => {
  requestIdleCallback?.(() => {
    const rootStyle = getComputedStyle(document.documentElement)
    const mainRed = rootStyle.getPropertyValue('--mainRed').trim()
    const mainTxt = rootStyle.getPropertyValue('--mainTxt').trim()

    if (mainRed) colorPrimary.value = mainRed
    if (mainTxt) colorTextBase.value = mainTxt
  })
})

const showBreadcrumb = computed(() => route.path !== '/')
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
    <Nav />
    <Breadcrumb v-if="showBreadcrumb" />
    <main class="w-full max-w-[1280px] flex flex-col flex-1">
      <slot />
    </main>
    <Footer />
  </a-config-provider>
</template>
