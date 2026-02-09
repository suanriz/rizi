<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  layout: false
})
</script>

<template>
  <Nav />
  <IndexCarousel />
  <main class="w-full flex flex-col flex-1">
    <div class="contentWrap mb-0">
      <IndexNews />
    </div>
    <LazyIndexMenu />
    <div class="contentWrap mb-0">
      <LazyIndexStore />
    </div>
    <LazyIndexConcept />
    <div class="contentWrap">
      <LazyIndexInfo />
    </div>
  </main>
  <Footer />
</template>
