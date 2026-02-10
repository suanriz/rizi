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
  <header class="fixed w-full z-[var(--zIndexPopup)]">
    <div class="absolute inset-0 bg-white/80 backdrop-blur-md shadow-[0_1px_1px_var(--gray)] -z-10" />
    <div class="relative h-[70px] max-w-[1280px] m-auto flex justify-between items-center px-[4%]">
      <button
        id="navToggle"
        class="hamburger w-[50px] h-[50px] relative left-0 cursor-pointer navFull:sr-only bg-transparent border-none appearance-none p-0 focus:outline-[var(--mainRed)]"
        aria-label="開啟選單"
        :aria-expanded="isNavOpen"
        aria-controls="mainNav"
        @click="isNavOpen = !isNavOpen"
      />
      <div class="navFull:mr-[45px] relative">
        <h1>
          <NuxtLink to="/">
            <span class="shine absolute w-[144px] h-[30px] overflow-hidden [mask-image:url(/img/logo.webp)] [mask-size:100%] after:content-[''] after:absolute after:top-[-50%] after:left-[-230%] after:w-[30px] after:h-[200%] after:bg-gradient-to-r after:from-transparent after:via-[#af1212c2] after:to-transparent after:rotate-90 after:pointer-events-none" />
            <img
              src="/img/logo.webp"
              alt="RIZI COFE HOUSE"
              fetchpriority="high"
              class="w-[144px] h-[30px]"
            >
          </NuxtLink>
        </h1>
      </div>
      <nav
        id="mainNav"
        class="absolute w-full top-[100%] transition-[left,opacity] duration-600 ease-in-out -left-full min-h-screen p-[0px_0px_35px_7%] border-t border-[var(--gray)] navFull:min-w-[476px] navFull:max-w-[700px] navFull:min-h-auto navFull:static navFull:opacity-100 navFull:p-0 navFull:border-none bg-white/80 backdrop-blur-md navFull:bg-transparent navFull:backdrop-blur-none"
        :class="[ isNavOpen ? '!left-0 z-[var(--zIndexOverlay)]' : '' ]"
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
                'scrollTextParent block p-[20px] no-underline text-[16px] leading-[16px] tracking-[.2em] font-[400] hover:!text-[var(--mainRed)] navFull:text-[16px] navFull:font-[400] navFull:p-0',
                item.link === route.path ? '!text-[var(--mainRed)]' : '!text-[var(--mainTxt)]'
              ]"
            >
              <span class="scrollText navFull:text-center">
                <span class="scrollTextItem"> {{ item.label }}</span>
                <span class="scrollTextItem navFull:tracking-[0.05em]" aria-hidden="true">
                  {{ item.link.slice(1).toUpperCase() }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="navFull:flex navFull:ml-[45px]">
        <div class="cart">
          <NuxtLink
            to="/cart"
            aria-label="購物車"
            class="navFull:h-full navFull:flex"
          >
            <a-badge :offset="[-3, 5]" :count="cartData">
              <svg
                version="1.2"
                baseProfile="tiny"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 155 136"
                class="w-[43px] aspect-[43/38] navFull:h-[27px] navFull:w-[30.76px] navFull:mr-0 transition-all duration-300 hover:scale-110 hover:text-[var(--mainRed)]"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                aria-label="購物車"
              >
                <path
                  d="M52.4 115.3c-1.1 5-5.8 8.6-11 8.5-5.3-.1-9.8-3.6-10.6-8.8-.8-4.3.4-8 3.9-10.9.3-.3.5-.6.5-1V32.4c0-.5-.1-.8-.5-1-5.8-3.8-11.5-7.5-17.2-11.4-2.3-1.3-3-3.4-2.1-5.4 1.1-2.4 4-3.1 6.4-1.5 1.6 1 3.3 2.1 4.9 3.3 5.1 3.4 10.4 6.9 15.7 10.3 1.5 1 2.1 2.3 2.1 4v3.6h91.2c.8 0 1.6 0 2.3.4 2.1.9 2.8 3.3 1.4 5.3-1.1 1.6-2.3 3.3-3.5 4.9-5.8 8.1-11.7 16.3-17.4 24.4-5 7.1-10.1 14.2-15.2 21.3-1.1 1.6-2.6 2.5-4.8 2.5h-54c0 .1-.1.3-.1.4v8.8c0 .5 0 .8.6.9 2.3.5 4 1.9 5.5 3.5.4.4.8.5 1.3.5H84c.5 0 .9-.3 1.3-.6 2.9-3.3 6.6-4.6 10.9-3.6 4.4 1.1 7.1 4 8 8.3 1.3 6-2.4 11.5-8.4 12.9-5.3 1.1-10.9-2.3-12.3-7.6-.1-.5-.3-.8-.9-.8h-30c0-.5 0-.5-.2-.5zm40.5-73.2v16.5h21.3c.4 0 .8-.3 1-.6 2.6-3.6 5.4-7.4 8-11.2 1.1-1.6 2.3-3.1 3.5-4.9-11.2.2-22.5.2-33.8.2zm-28.1 42h19.8V66.8H64.8v17.3zm19.8-25.3V42.3H64.8v16.5h19.8zm-27.9 8H44.5v17.3h12.2V66.8zm-12.3-8.1h12.3V42.1H44.4v16.6zm48.5 25.4h3.3c.5 0 .8-.1 1.1-.5 3.9-5.5 7.6-10.9 11.5-16.4.1-.1.1-.3.3-.5H92.9v17.4z"
                />
              </svg>
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

<style scoped>
@keyframes logoShine {
  0% { left: -20%; }
  100% { left: 120%; }
}

.shine:hover::after {
  animation: logoShine 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
