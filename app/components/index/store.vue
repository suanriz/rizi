<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useGoodsList } from '@/composables/useGoods'

const query = ref({ page: 1, pageSize: 20, type: 0 })
const { data } = useGoodsList(query)
const shopData = computed(() => data.value.list.filter(x => x.tag.includes(0)))
</script>

<template>
  <section>
    <Divider title="立即購買" />
    <div
      class="grid justify-center grid-cols-1 cardTwoCol:grid-cols-2 cardThreeCol:grid-cols-3 cardFourCol:grid-cols-4 gap-[16px] p-[0_4%]"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <GoodCard
        v-for="good in shopData"
        :key="good.name"
        :data="good"
        :lcp="true"
      />
    </div>
    <MoreBtn link="store" />
  </section>
</template>
