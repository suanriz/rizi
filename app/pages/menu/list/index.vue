<script lang="ts" setup>
import { useSeoMeta, definePageMeta, useRoute, useRouter } from '#imports'
import { computed, onMounted, ref, watch } from 'vue'

import Tab from '@/components/Tab.vue'
import { useMenuList } from '@/composables/useMenu'
import { MENU_TAB_TYPE } from '@/utils/constants'

const route = useRoute()
const router = useRouter()
const pageConfig = ref({
  current: 1,
  pageSize: 8,
})
const activeTab = ref(Number(route.query.type) || 0)
const queryParams = computed(() => ({
  type: activeTab.value,
  page: pageConfig.value.current,
  pageSize: pageConfig.value.pageSize
}))
const { data } = useMenuList(queryParams, { writeShared: true })
const menuList = computed(() => data.value?.list || [])
const total = computed(() => data.value?.total || 0)

const handleTabClick = (index: number) => {
  activeTab.value = index
  pageConfig.value.current = 1
}

watch(() => route.query.type, (newType) => {
  if (newType !== undefined) {
    activeTab.value = Number(newType) || 0
    pageConfig.value.current = 1
  }
})

onMounted(() => {
  if (route.query && route.query.type) {
    router.replace({ query: {} })
  }
})

useSeoMeta({ title: '菜單列表', description: '查看各類咖啡豆、甜點與輕食的詳細介紹。' })
definePageMeta({
  title: '菜單列表',
  breadcrumb: [{ title: '門市菜單', to: '/menu' }],
})
</script>

<template>
  <section class="contentWrap">
    <Divider title="菜單列表" />
    <div class="flex flex-col md:flex-row">
      <Tab
        v-model="activeTab"
        :tab-data="MENU_TAB_TYPE"
        @handle-tab-click="handleTabClick"
      />
      <div
        class="shopWrap"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
      >
        <div class="shopItem">
          <GoodCard v-for="good in menuList" :key="good.name" :data="good" />
        </div>
        <Pagination v-model="pageConfig" :total="total" />
      </div>
    </div>
  </section>
</template>
