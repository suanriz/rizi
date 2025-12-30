<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'
import { computed, reactive, ref, watch, onMounted } from 'vue'
import type { UnwrapRef } from 'vue'

import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface'

import { useCartStore } from '@/stores/cartStore'
import { useFavouriteStore } from '@/stores/favouriteStore'
import type { GoodsListMailType } from '@/types'
import { CART_TYPE, EMAIL_TYPE } from '@/utils/constants'
import { sendEmail } from '@/utils/tool'

const activeTab = ref(1)
const isCheckoutModalShow = ref(false)
const formRef = ref<HTMLFormElement | null>(null)
const formData: UnwrapRef<GoodsListMailType> = reactive({
  email: '',
  data: '',
  content: '',
  totalSale: 0
})
const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()
const checkGroup = reactive({
  indeterminate: true,
  checkAll: false,
})
const cartData = computed(() => cartStore.items)
const favouritesData = computed(() => favouriteStore.items)

const renderTabData = () => {
  if (activeTab.value === 1) return cartData.value
  return favouritesData.value
}

const onCheckAllChange = (e: CheckboxChangeEvent) => {
  const target = e.target as HTMLInputElement
  Object.assign(checkGroup, {
    checkAll: target.checked,
    indeterminate: false,
  })
  cartStore.checkAll(target.checked)
}

const renderPrice = () => {
  let totalPrice = 0
  let totalSale = 0
  cartData.value.forEach(good => {
    if (!good.checked) return
    totalPrice += good.price * (good?.count ?? 1)
    totalSale += (good.onSale || good.price) * (good?.count ?? 1)
  })
  return { totalPrice, totalSale }
}

const checkBoxStatus = (newValue: (boolean | undefined)[]) => {
  const checkAll = newValue.every(x => x)
  Object.assign(checkGroup, {
    indeterminate: !checkAll && newValue.some(x => x),
    checkAll: checkAll,
  })
}

const handleSentMail = () => {
  cartStore.items = cartStore.items.filter(x => !x.checked)
  closeCheckoutModal()
}

const renderList = () => {
  let list = ''
  cartData.value.forEach((x, index) => {
    if (!x.checked) return
    list += `${index + 1}. ${x.name} x${x.count} NT$${(x.count ?? 1) * (x.onSale ?? x.price)}\n`
  })
  return list
}

const handleSendList = () => {
  formRef.value?.validate().then(() => {
    formData.data = new Intl.DateTimeFormat(undefined, {
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date())
      .replace(/\//g, '-')
    formData.content = renderList()
    formData.totalSale = renderPrice().totalSale
    sendEmail(EMAIL_TYPE.GoodsList, formData, handleSentMail)
  })
}

const closeCheckoutModal = () => {
  formRef?.value?.resetFields()
  isCheckoutModalShow.value = false
}

watch(() => cartData.value.map(x => x.checked), (newValue) => {
  checkBoxStatus(newValue)
})

onMounted(() => {
  requestIdleCallback?.(() => {
    checkBoxStatus(cartData.value.map(x => x.checked))
  })
})

useSeoMeta({
  title: '購物車',
  robots: 'noindex, nofollow'
})
definePageMeta({ title: '購物車' })
</script>

<template>
  <section class="contentWrap">
    <Divider title="購物車" />
    <div class="filterWrap">
      <a-tabs v-model:active-key="activeTab">
        <a-tab-pane
          v-for="option in CART_TYPE"
          :key="option.value"
          :tab="option.label"
          show-size-changer
        />
      </a-tabs>
    </div>
    <div v-show="cartData.length > 0 && activeTab === 1" class="p-[10px] font-[100] leading-[16px]">
      <a-checkbox
        v-model:checked="checkGroup.checkAll"
        :indeterminate="checkGroup.indeterminate"
        @change="onCheckAllChange"
      >
        Check all
      </a-checkbox>
    </div>
    <div
      v-if="renderTabData().length > 0"
      class="flex flex-col justify-start items-center border-b border-[var(--lightGray)] font-[100]"
      :class="{ 'border-t border-[var(--lightGray)]': activeTab === 1 }"
    >
      <div
        v-for="good in renderTabData()"
        :key="good.id"
        class="flex flex-col cartSm:flex-row justify-between cartSm:justify-center items-center not-first:border-t border-[var(--lightGray)] even:bg-[var(--cartLine)] w-full p-[10px]"
        :class="{ 'w-[114px]': activeTab === 1 }"
      >
        <div
          class="grow flex [@media_(max-width:255px)]:flex-wrap justify-start items-center gap-[10px] cartSm:mr-[10px] w-full"
        >
          <a-checkbox v-if="activeTab === 1" v-model:checked="good.checked" class="w-[20px] shrink-0" />
          <div class="w-[80px] shrink-0">
            <ResponsiveImg img-class="w-full" :src="good.img" :alt="good.name" />
          </div>
          <div class="flex grow justify-start items-center min-w-[77.88px] cart2Sm:w-full">
            <span class="leading-[16px]">{{ good.name }}</span>
          </div>
        </div>
        <div
          class="shrink-2 flex flex-wrap cart2Sm:flex-nowrap justify-center cart2Sm:justify-end items-center gap-[10px] cart2Sm:pl-[30px] cartSm:pl-0 mt-[10px] cart2Sm:mt-0 w-full"
        >
          <div class="priceWrap flex justify-center items-center w-[70px]">
            <div v-if="good.onSale" class="priceTxt onSalePriceTxt">
              <span>NT$</span>{{ good.price }}
            </div>
            <div class="priceTxt">
              <span>NT$</span>{{ good.onSale ?? good.price }}
            </div>
          </div>
          <div v-if="activeTab === 1" class="flex justify-center items-center text-center w-[90px]">
            <a-input-number
              id="inputNumber"
              v-model:value="good.count"
              class="font-sans"
              :min="1"
              :max="999"
            />
          </div>
          <div :class="['flex flex-col justify-center items-center', activeTab === 1 ? 'w-[66px]' : 'w-[114px]']">
            <button
              v-if="activeTab === 1"
              class=""
              @click="() => {
                favouriteStore.add(good)
                cartStore.remove(good.id)
              }"
            >
              收藏
            </button>
            <button v-if="activeTab === 1" class="mt-[10px]" @click="cartStore.remove(good.id)">
              刪除
            </button>
            <button
              v-if="activeTab === 2"
              @click="() => {
                cartStore.add(good)
                favouriteStore.remove(good.id)
              }"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noGood">
      還有沒商品資訊
      <MoreBtn link="/store" no-good-link>
        這裡有多種風味任您挑選
      </MoreBtn>
    </div>
    <div
      v-show="activeTab === 1"
      class="flex flex-col infoSm:flex-row flex-wrap justify-end gap-[10px] font-[100] p-[10px]"
    >
      <div class="priceWrap leading-[16px]">
        售價
        <div>
          <span>NT$</span>{{ renderPrice().totalPrice }}
        </div>
      </div>
      <div class="priceWrap leading-[16px]">
        折扣
        <div>
          <span>NT$</span>{{ renderPrice().totalPrice - renderPrice().totalSale }}
        </div>
      </div>
      <div class="priceWrap leading-[16px]">
        金額
        <div>
          <span>NT$</span>{{ renderPrice().totalSale }}
        </div>
      </div>
      <button :disabled="!cartData.some(x => x?.checked)" @click="isCheckoutModalShow = true">
        結帳
      </button>
    </div>
  </section>
  <a-modal
    v-model:open="isCheckoutModalShow"
    title="以下是您選購的商品"
    cancel-text="意念收貨"
    ok-text="寄送明細到信箱"
    :closable="false"
    :keyboard="false"
    :mask-closable="false"
    @cancel="closeCheckoutModal"
    @ok="handleSendList"
  >
    <ol>
      <li v-for="good in cartData.filter(x => x.checked)" :key="good.id">
        {{ `${good.name} x${good.count} NT$${(good.count ?? 1) * (good.onSale ?? good.price)}` }}
      </li>
    </ol>
    <br>
    <p class="text-right text-[var(--mainRed)]">
      結帳金額：NT$ {{ renderPrice().totalSale }}
    </p>
    <a-form
      ref="formRef"
      :model="formData"
      hide-required-mark
      class="w-full flex flex-col items-end !m-[10px_0]"
      no-style
    >
      真的會收到信件哦
      <a-form-item
        label="信箱"
        name="email"
        :rules="[
          { required: true, message: '請輸入信箱' },
          { type: 'email', message: '輸入信箱有誤' }
        ]"
      >
        <a-input v-model:value="formData.email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
::v-deep(.ant-input-number-input) {
  font-family: "Noto Sans TC", sans-serif;
}

.ant-form-item {
  max-width: 250px;
  margin-inline-end: 0px;
  margin-bottom: 0;
}

.ant-form-item ::v-deep(.ant-form-item-label) {
  flex: 0 0 auto;
  padding: 0;
}

.ant-form-item ::v-deep(.ant-form-item-label) label {
  font-size: 16px;
}

.ant-form-item ::v-deep(.ant-form-item-label .ant-form-item-required:after) {
  display: block;
}

.ant-form-item ::v-deep(.ant-form-item-control) {
  flex: 1 0 calc(100% - 46.45px);
}

.ant-form-item ::v-deep(.ant-form-item-control input) {
  border-radius: 0;
}
</style>
