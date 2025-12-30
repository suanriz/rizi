<script lang="ts" setup>
import { useSeoMeta, useRoute, definePageMeta } from '#imports'
import { computed } from 'vue'

import {
  useMenuDetail,
  useMenuSharedState,
  useMenuList,
} from '@/composables/useMenu'
import type { GoodType, CakeDetailType } from '@/types'
import { GOOD_DETAIL_TYPE } from '@/utils/constants'

const route = useRoute()
const detailId = computed(() => Number(route.params.id))
const { data } = await useMenuDetail(detailId)
const { menuList } = useMenuSharedState()
const cake = computed<GoodType<CakeDetailType> | '商品不存在'>(() => data.value?.id ? data.value : '商品不存在')
const recommendParams = computed(() => ({
  type: typeof cake.value === 'object' ? cake.value.type : 0,
  page: 1,
  pageSize: 6
}))
const { data: recData } = await useMenuList(recommendParams)
const recommendList = computed(() => {
  const currentId = detailId.value
  const list = recData.value?.list || menuList.value
  return list
    .filter(x => x.id !== currentId)
    .slice(0, 4)
})

useSeoMeta({ title: () => typeof cake.value === 'object' && cake.value?.id ? cake.value.name : '商品不存在' })
definePageMeta({
  breadcrumb: [
    { title: '門市菜單', to: '/menu' },
    { title: '菜單列表', to: '/menu/list' },
  ]
})
</script>

<template>
  <section v-if="typeof cake === `object` && cake?.id" class="contentWrap !mt-[30px]">
    <div class="flex flex-col mainWrapCol:flex-row justify-between">
      <ImgGroup :data="cake" />
      <div
        class="w-full mainWrapCol:w-[38%] flex flex-col"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <h3 class="text-[20px] leading-[30px] tracking-[.1em] font-[500] mt-[20px] mainWrapCol:mt-0">
          {{ cake.name }}
        </h3>
        <div class="m-[20px_0_30px] leading-[16px]">
          <p
            class="text-[20px] leading-[20px] text-[var(--mainRed)] tracking-[.04em] font-[300] inline-block mr-[10px]"
          >
            <span class="text-[18px] leading-[18px]">NT$</span>
            {{ cake.price }}
          </p>
        </div>
        <ul type="circle" class="mb-[20px] grow-1">
          <li
            v-for="detail in GOOD_DETAIL_TYPE"
            :key="detail.value"
            class="indent-[-5em] text-[16px] font-[100] text-[var(--mainTxt)] leading-[25px] tracking-[.04em] mb-[15px] pl-[5em]"
          >
            {{ detail.label }} : {{ cake.detail.features[detail.value] }}
          </li>
        </ul>
      </div>
    </div>
    <Divider title="營養標示" />
    <div class="overflow-x-auto m-[0_4%] pb-[2px]">
      <table>
        <thead>
          <tr>
            <th>一次提供量</th>
            <th>熱量(kcal)</th>
            <th>糖(g)</th>
            <th>蛋白質(g)</th>
            <th>飽和脂肪(g)</th>
            <th>鈉(mg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="nutrition in cake.detail.nutritionFacts" :key="nutrition">
              {{ nutrition }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="recommendList.length > 0">
      <Divider title="相似推薦" />
      <div class="productRecommend">
        <div class="shopWrap" data-aos="fade-up" data-aos-duration="700">
          <div class="shopItem">
            <GoodCard
              v-for="good in recommendList"
              :key="good.id"
              :data="good"
            />
          </div>
        </div>
      </div>
      <MoreBtn link="/menu/list" />
    </template>
  </section>
  <div v-if="typeof cake === 'string'" class="noGood">
    商品不存在
    <MoreBtn link="/menu/list" no-good-link>
      看看其他店內限定販售的商品
    </MoreBtn>
  </div>
</template>

<style scoped>
table th {
  background-color: var(--tableTH);
}

table td,
table th {
  border: 1px solid var(--deepGray);
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 0.04em;
  color: var(--mainTxt);
  padding: 13px;
  text-align: center;
  margin-left: 40px;
}
</style>
