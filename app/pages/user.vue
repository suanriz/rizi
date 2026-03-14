<script lang="ts" setup>
import { useSeoMeta, definePageMeta, navigateTo } from '#imports'
import { computed, ref, h } from 'vue'

import { CarryOutOutlined, GiftOutlined, FormOutlined, MinusSquareOutlined } from '@ant-design/icons-vue'
import type { Key } from 'ant-design-vue/es/_util/type'

import { useAuth } from '@/composables/useAuth'
import { useOrders } from '@/composables/useOrders'
import { ORDER_STATUS_TYPE } from '@/utils/constants'

const pageConfig = ref({
  current: 1,
  pageSize: 4,
})
const activeTab = ref(0)
const queryParams = computed(() => ({
  page: pageConfig.value.current,
  pageSize: pageConfig.value.pageSize,
  status: activeTab.value
}))
const { data } = useOrders(queryParams)
const ordersList = computed(() => data.value.list)
const total = computed(() => data.value.total)

const handleTabChange = (key: Key) => {
  activeTab.value = Number(key)
}

const { isAuthenticated } = useAuth()

useSeoMeta({
  title: '訂單紀錄',
  description:
    '查看您的訂單紀錄。',
})
definePageMeta({
  title: '訂單紀錄'
})

if (!isAuthenticated.value) {
  if (import.meta.client) {
    navigateTo('/?login=true')
  }
}
</script>

<template>
  <section class="contentWrap">
    <Divider title="訂單紀錄" />
    <div class="filterWrap">
      <a-tabs v-model:active-key="activeTab" @change="handleTabChange">
        <a-tab-pane
          v-for="option in ORDER_STATUS_TYPE"
          :key="option.value"
          :tab="option.label"
          show-size-changer
        />
      </a-tabs>
    </div>
    <a-input name="search" placeholder="可透過 訂單編號 或 商品名稱 搜尋" />
    <div class="my-4">
      <div
        v-for="order in ordersList"
        :key="order.id"
        class="flex flex-col justify-between cartSm:justify-center items-center not-first:border-t border-[var(--lightGray)] odd:bg-[var(--cartLine)] hover:bg-[var(--mainGray)] w-full p-[10px] py-10"
      >
        <div class="font-[100] w-[85%]">
          訂單編號 : {{ order.id }}
        </div>
        <div class="w-[85%] stepsFull:w-[calc(85%+30px)] my-6">
          <a-steps
            :current="order.status === 4
              ? 1
              : order.status === 3
                ? 2
                : order.status"
            label-placement="vertical"
            :items="[
              {
                title: '新訂單',
                subTitle: order.create_at,
                icon: h(FormOutlined)
              },
              ...(order.status === 4 ? [
                {
                  title: '已取消',
                  subTitle: order.cancelled_at,
                  icon: h(MinusSquareOutlined)
                }
              ]
                : [
                  {
                    title: `${order.status===1?'待':'已'}出貨`,
                    subTitle: order.shipped_at,
                    icon: h(GiftOutlined)
                  },
                  {
                    title: order.status!==3?'待收貨':'已完成',
                    subTitle: order.completed_at,
                    icon: h(CarryOutOutlined)
                  },
                ])
            ]"
          />
        </div>
        <div v-for="item in order.items" :key="order.id + item.id" class="w-[85%]">
          <div
            class="grow flex [@media_(max-width:255px)]:flex-wrap justify-start items-center gap-[10px] cartSm:mr-[10px] w-full font-[100]"
          >
            <NuxtLink :to="item.link" class="w-[80px] shrink-0">
              <ResponsiveImg img-class="w-full" :src="item.img" :alt="item.name" />
            </NuxtLink>
            <div class="flex flex-col justify-center min-w-[77.88px] cart2Sm:w-full">
              <p class="leading-[16px]">
                {{ item.name }}
              </p>
              <p>x{{ item.count }}</p>
            </div>
            <div class="priceWrap leading-[18px]">
              <div class="text-right m-0 text-black">
                <span class="text-[16px]">NT$</span>{{ item.price * item.count }}
              </div>
            </div>
          </div>
          <a-divider />
        </div>
        <div class="priceWrap justify-end leading-[20px] w-[85%] font-[100] mt-6">
          訂單金額
          <div class="mr-0 text-[20px] font-[500]">
            <span class="text-[18px] font-[500]">NT$</span>{{ order.totalPrice }}
          </div>
        </div>
      </div>
    </div>
    <Pagination v-model="pageConfig" :total="total" />
  </section>
</template>

<style scoped>
.ant-divider-horizontal{
margin: 8px 0;
}
</style>
