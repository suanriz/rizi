<script lang="ts" setup>
import { computed } from 'vue'

import { useCartStore } from '@/stores/cartStore'
import type { CakeDetailType, CoffeeDetailType, GoodType } from '@/types'

const props = defineProps<{ data: GoodType<CakeDetailType | CoffeeDetailType>, lcp?: boolean }>()
const { name, link, img, price, onSale, tag } = props.data
const cartStore = useCartStore()
const isCoffee = computed(() => !Object.prototype.hasOwnProperty.call(props.data, 'indexImg'))
</script>

<template>
  <div class="group w-full rounded-t-[10px] shadow-[0_0_2px_var(--deepGray),0_0_10px_var(--tagBG)] hover:shadow-[0_0_2px_var(--shadow),0_0_10px_var(--shadow)] hover:bg-[var(--tableTH)]">
    <NuxtLink :to="link" class="flex flex-col no-underline text-[var(--mainBlack)] h-full">
      <div
        tag="☰ New"
        class="relative"
        :class="{ 'after:content-[attr(tag)] after:box-content after:leading-[12px] after:text-[12px] after:text-[var(--mainTxt)] after:absolute after:right-[-5px] after:top-[10px] after:w-[40px] after:h-[19px] after:p-[5px_5px_0px_7px] after:bg-[var(--tagBG)] before:content-[\'\'] before:absolute before:right-[-5px] before:top-[34px] before:border-t-5 before:border-r-5 before:border-r-transparent before:border-[var(--deepGray)]': tag?.includes(1) }"
      >
        <ResponsiveImg
          img-class="w-full rounded-t-[10px] aspect-square w-[213px]"
          :src="props.lcp || false ? img + 'LCP' : img"
          :alt="name"
        />
      </div>
      <div class="flex flex-col flex-1 p-[5%_8%_7%] relative">
        <button
          v-if="isCoffee"
          dir="rtl"
          class="absolute bg-[var(--cardAddToCart)] text-[var(--mainWhite)] m-auto text-center text-base leading-[30px] tracking-[.5em] font-[500] p-0 border-0 bottom-full left-0 w-full h-[30px] indent-[-.5em] transition duration-[.5s] opacity-0 group-hover:opacity-100 hover:bg-[var(--cardAddToCartHover)]"
          @click.prevent="cartStore.add(data as GoodType<CoffeeDetailType>)"
        >
          加入購物車
        </button>
        <h3 class="flex-1 text-[16px] text-[var(--mainBlack)] tracking-[.08em] font-[100] text-center">
          {{ name }}
        </h3>
        <div class="priceWrap">
          <div v-if="onSale" class="onSalePriceTxt">
            <span>NT$</span>{{ price }}
          </div>
          <div>
            <span>NT$</span>{{ onSale ?? price }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
