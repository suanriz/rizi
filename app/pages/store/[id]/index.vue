<script lang="ts" setup>
import { useSeoMeta, useRoute, definePageMeta } from '#imports'
import { computed } from 'vue'

import {
  useGoodsDetail,
  useGoodsSharedState,
  useGoodsList,
} from '@/composables/useGoods'

import { useCartStore } from '@/stores/cartStore'
import { useFavouriteStore } from '@/stores/favouriteStore'
import type { GoodType, CoffeeDetailType } from '@/types'
import { STORE_DETAIL_TYPE } from '@/utils/constants'

const route = useRoute()
const detailId = computed(() => Number(route.params.id))
const { data } = await useGoodsDetail(detailId)
const { goodsList } = useGoodsSharedState()
const good = computed<GoodType<CoffeeDetailType> | '商品不存在'>(() => data.value?.id ? data.value : '商品不存在')
const favouriteStore = useFavouriteStore()
const cartStore = useCartStore()
const recommendParams = computed(() => ({
  type: typeof good.value === 'object' ? good.value.type : 0,
  page: 1,
  pageSize: 6
}))

const { data: recData } = await useGoodsList(recommendParams)
const recommendList = computed(() => {
  const currentId = detailId.value
  const list = recData.value?.list || goodsList.value
  return list
    .filter(x => x.id !== currentId)
    .slice(0, 4)
})

useSeoMeta({
  title: () =>
    typeof good.value === 'object' && good.value?.id
      ? good.value.name
      : '商品不存在',
})
definePageMeta({
  breadcrumb: [{ title: '線上購物', to: '/store' }],
})
</script>

<template>
  <section v-if="typeof good === `object` && good?.id" class="contentWrap !mt-[30px]">
    <div class="flex flex-col mainWrapCol:flex-row justify-between">
      <ImgGroup :data="good" />
      <div
        class="w-full mainWrapCol:w-[38%] flex flex-col"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3 class="text-[20px] leading-[30px] tracking-[.1em] font-[500] mt-[20px] mainWrapCol:mt-0">
          {{ good.name }}
        </h3>
        <div class="m-[20px_0_30px] leading-[16px]">
          <p
            class="text-[20px] leading-[20px] text-[var(--mainRed)] tracking-[.04em] font-[300] inline-block mr-[10px]"
          >
            <span class="text-[18px] leading-[18px]">NT$</span>{{ good.price }}
          </p>
        </div>
        <ul type="circle" class="mb-[20px] grow-1">
          <li
            v-for="detail in STORE_DETAIL_TYPE"
            :key="detail.value"
            class="indent-[-5em] text-[16px] font-[100] text-[var(--mainTxt)] leading-[25px] tracking-[.04em] mb-[15px] pl-[5em]"
          >
            {{ detail.label }} : {{ good.detail.features[detail.value] }}<template v-if="detail.value === 'acidity'">
              <sup
                class="text-[14px] leading-[14px] text-[var(--mainRed)] relative top-[-6px]"
                title="酸度的感受因人而異，我們以五種水果來做最甜到最酸的評準
草莓果醬(1分)、葡萄(2分)、蘋果(3分)、橘子(4分)、檸檬(5分)
希望透過這樣的評分，讓咖啡豆有酸度的比較值，提供消費者在購買上參考"
              >[註]</sup>(酸度由弱至強是1~5分)
            </template>
          </li>
        </ul>
        <div class="flex flex-col">
          <button
            class="w-full mb-[12px]"
            type="submit"
            @click="cartStore.add(good)"
          >
            加入購物車
          </button>
          <button
            type="submit"
            class="buttonPrimary w-full"
            @click="favouriteStore.add(good)"
          >
            加入收藏清單
          </button>
        </div>
      </div>
    </div>
    <Divider title="商品資訊" />
    <ul class="m-[0_4%] pb-[2px]">
      <li
        v-for="info in good.detail.info"
        :key="info"
        class="text-[16px] leading-[25px] text-[var(--mainTxt)] tracking-[.04em] font-[100] mb-[15px]"
      >
        {{ info }}
      </li>
    </ul>
    <Divider title="好評推薦" />
    <div class="productRecommend">
      <div class="shopWrap" data-aos="fade-up" data-aos-duration="700">
        <div class="shopItem">
          <GoodCard v-for="item in recommendList" :key="item.id" :data="item" />
        </div>
      </div>
    </div>
    <MoreBtn link="/store" />
  </section>
  <div v-else-if="typeof good === 'string'" class="noGood">
    商品不存在
    <MoreBtn link="/store" no-good-link>
      這裡有多種風味任您挑選
    </MoreBtn>
  </div>
</template>
