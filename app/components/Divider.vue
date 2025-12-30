<script lang="ts" setup>
import { useRuntimeConfig } from '#imports'
const prop = defineProps({
  title: String
})

const { app: { baseURL } } = useRuntimeConfig()
</script>

<template>
  <div
    class="aspect-[924/48] max-w-[960px] w-full min-h-[40px] bg-center bg-no-repeat bg-cover flex items-center justify-center m-[30px_auto_20px] md:m-[30px_auto_4%]"
    :style="{ backgroundImage: `url(${baseURL}img/divider.webp)` }"
  >
    <h2 class="text-center text-[20px] leading-[20px] font-[500] tracking-[.04em] text-[var(--mainRed)]">
      {{ prop.title }}
    </h2>
  </div>
</template>
