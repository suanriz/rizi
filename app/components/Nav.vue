<script lang="ts" setup>
import { useRoute } from '#imports'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useCartStore } from '@/stores/cartStore'
import { NAV_INFO } from '@/utils/constants'

const route = useRoute()
const cartStore = useCartStore()
const cartData = computed(() => cartStore.items.length)
const isNavOpen = ref(false)

const handleResize = () => {
  if (window.innerWidth >= 1000 && isNavOpen.value) isNavOpen.value = false
}

watch(
  () => route.path,
  () => isNavOpen.value = false
)

onMounted(() => {
  requestIdleCallback?.(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="shadow-[0_1px_1px_var(--gray)] bg-[var(--mainWhite)] fixed w-full max-w-screen z-[var(--zIndexPopup)]">
    <div class="h-[70px] max-w-[1280px] m-auto flex justify-between items-center px-[4%] z-[var(--zIndexPopup)]">
      <button
        id="navToggle"
        class="hamburger w-[50px] h-[50px] relative left-0 cursor-pointer navFull:sr-only bg-transparent border-none appearance-none p-0 focus:outline-[var(--mainRed)]"
        aria-label="開啟選單"
        :aria-expanded="isNavOpen"
        aria-controls="mainNav"
        @click="isNavOpen = !isNavOpen"
      />
      <div class="navFull:mr-[45px]">
        <h1>
          <NuxtLink to="/">
            <img
              src="/img/logo.webp"
              alt="RIZI COFF HOUSE"
              fetchpriority="high"
              class="w-[144px] h-[30px]"
            >
          </NuxtLink>
        </h1>
      </div>
      <nav
        id="mainNav"
        class="absolute w-full top-[100%] transition-[left,opacity] duration-600 ease-in-out -left-full min-h-screen p-[0px_0px_35px_7%] bg-[var(--mainWhite)] border-t border-[var(--gray)] navFull:min-w-[476px] navFull:max-w-[700px] navFull:min-h-auto navFull:static navFull:opacity-100 navFull:p-0 navFull:border-none"
        :class="{ '!left-0 !opacity-100 z-[var(--zIndexOverlay)]': isNavOpen, 'opacity-0': !isNavOpen }"
      >
        <ul class="navFull:flex navFull:justify-between">
          <li
            v-for="(item, index) in NAV_INFO"
            :key="item.label + index"
            class="border-b border-[var(--gray)] h-full navFull:border-none navFull:flex navFull:m-0 navFull:text-[var(--mainRed)]"
          >
            <NuxtLink
              :to="item.link"
              :class="[
                'block p-[20px] no-underline text-[16px] leading-[16px] tracking-[.1em] font-[400] hover:!text-[var(--mainRed)] navFull:text-[16px] navFull:font-[400] navFull:p-0',
                item.link === route.path ? '!text-[var(--mainRed)]' : '!text-[var(--mainTxt)]'
              ]"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="navFull:flex navFull:ml-[45px]">
        <div class="cart">
          <NuxtLink
            to="/cart"
            aria-label="購物車"
            class="navFull:h-full navFull:block"
          >
            <a-badge :offset="[-3, 5]" :count="cartData">
              <img
                src="/img/icon/cart.webp"
                alt="購物車"
                class="w-[43px] aspect-[43/38] navFull:h-[27px] navFull:w-[30.76px] navFull:mr-0"
              >
            </a-badge>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <div class="min-h-[70px]" />
</template>

<style scoped>
.hamburger[aria-expanded="true"]:before {
  top: 24px;
  box-shadow: 0px 10px 0px #ff00;
  transform: rotate(45deg);
  transition:
    box-shadow 0.3s 0s,
    top 0.3s 0.3s,
    transform 0.3s 0.6s;
}

.hamburger[aria-expanded="true"]:after {
  bottom: 23px;
  transform: rotate(-45deg);
  transition:
    bottom 0.3s 0.3s,
    transform 0.3s 0.6s;
}

.hamburger:before,
.hamburger:after {
  content: "";
  position: absolute;
  width: 60%;
  height: 2.3px;
  background-color: var(--mainTxt);
  right: 0;
  left: 0;
  margin: auto;
  transform: rotate(0deg);
}

.hamburger:before {
  top: 15px;
  box-shadow: 0px 10px 0px var(--mainTxt);
  transition:
    box-shadow 0.3s 0.6s,
    top 0.3s 0.3s,
    transform 0.3s 0s;
}

.hamburger:after {
  bottom: 12px;
  transition:
    bottom 0.3s 0.3s,
    transform 0.3s 0s;
}
</style>
