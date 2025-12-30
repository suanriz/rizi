<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useMenuList } from '@/composables/useMenu'

const query = ref({ page: 1, pageSize: 7 })
const { data } = await useMenuList(query)
const list = computed(() => data.value.list)
</script>

<template>
  <section v-if="list.length > 0" class="flex flex-col menuSm:min-h-[766.25px] md:min-h-[521.64px]">
    <Divider title="熱門菜單" />
    <div class="w-full max-h-[752.5px] menuSm:max-h-[685px] md:max-h-[500px] p-[0_0_36px_0] menuSm:p-[0_8px_40px_0] md:p-[0_40px_20px_0] grid gap-[6px] menuSm:gap-[8px] md:gap-[10px] grid-rows-[14.28%_14.28%_14.28%_14.28%_14.28%_14.28%_14.32%] menuSm:grid-rows-[16.8%_16.6%_16.6%_16.6%_16.6%_16.8%] md:grid-rows-[43%_29%_28%] grid-cols-1 menuSm:grid-cols-[50%_50%] md:grid-cols-[28%_22%_12%_21%_17%]">
      <div
        v-for="item in list"
        :key="item.name"
        class="w-full relative nth-1:row-start-7 nth-1:col-start-1 nth-1:row-span-1 nth-1:col-span-1 nth-2:row-start-2 nth-2:col-start-1 nth-2:row-span-1 nth-2:col-span-1 nth-3:row-start-1 nth-3:col-start-1 nth-3:row-span-1 nth-3:col-span-1 nth-4:row-start-6 nth-4:col-start-1 nth-4:row-span-1 nth-4:col-span-1 nth-5:row-start-5 nth-5:col-start-1 nth-5:row-span-1 nth-5:col-span-1 nth-6:row-start-3 nth-6:col-start-1 nth-6:row-span-1 nth-6:col-span-1 nth-7:row-start-4 nth-7:col-start-1 nth-7:row-span-1 nth-7:col-span-1 menuSm:nth-1:row-start-5 menuSm:nth-1:col-start-2 menuSm:nth-1:row-span-2 menuSm:nth-1:col-span-1 menuSm:nth-2:row-start-2 menuSm:nth-2:col-start-2 menuSm:nth-2:row-span-2 menuSm:nth-2:col-span-1 menuSm:nth-3:row-start-1 menuSm:nth-3:col-start-2 menuSm:nth-3:row-span-1 menuSm:nth-3:col-span-1 menuSm:nth-4:row-start-3 menuSm:nth-4:col-start-1 menuSm:nth-4:row-span-3 menuSm:nth-4:col-span-1 menuSm:nth-5:row-start-1 menuSm:nth-5:col-start-1 menuSm:nth-5:row-span-2 menuSm:nth-5:col-span-1 menuSm:nth-6:row-start-6 menuSm:nth-6:col-start-1 menuSm:nth-6:row-span-1 menuSm:nth-6:col-span-1 menuSm:nth-7:row-start-4 menuSm:nth-7:col-start-2 menuSm:nth-7:row-span-1 menuSm:nth-7:col-span-1 md:nth-1:row-start-1 md:nth-1:col-start-1 md:nth-1:row-span-3 md:nth-1:col-span-1 md:nth-2:row-start-1 md:nth-2:col-start-2 md:nth-2:row-span-1 md:nth-2:col-span-2 md:nth-3:row-start-1 md:nth-3:col-start-4 md:nth-3:row-span-1 md:nth-3:col-span-2 md:nth-4:row-start-2 md:nth-4:col-start-2 md:nth-4:row-span-2 md:nth-4:col-span-1 md:nth-5:row-start-2 md:nth-5:col-start-3 md:nth-5:row-span-2 md:nth-5:col-span-2 md:nth-6:row-start-2 md:nth-6:col-start-5 md:nth-6:row-span-1 md:nth-6:col-span-1 md:nth-7:row-start-3 md:nth-7:col-start-5 md:nth-7:row-span-1 md:nth-7:col-span-1"
      >
        <div class="text-[18px] leading-[18px] font-[500] tracking-[.04em] text-[var(--mainTxt)] absolute bottom-[15px] left-[15px] text-shadow-[0_0_1px_var(--mainWhite),0_0_2px_var(--mainWhite),0_0_3px_var(--mainWhite),0_0_5px_var(--mainWhite),0_0_8px_var(--mainWhite),0_0_10px_var(--mainWhite)] opacity-100">
          <p>{{ item.name }}</p>
        </div>
        <NuxtLink :to="item.link">
          <div class="w-full h-full absolute text-center text-[20px] text-[var(--mainRed)] !bg-[var(--shadowLight)] flex flex-col justify-center items-center opacity-0 rotate-y-180 transition duration-[.6s] ease-in-out hover:opacity-100 hover:transition hover:duration-[1s] hover:rotate-y-0">
            <p class="text-[20px] leading-[20px] font-[400] tracking-[.04em] pb-[14%] relative after:content-[''] after:w-[100px] after:h-[1px] after:bg-[var(--mainRed)] after:absolute after:top-[31px] after:m-[0_auto] after:left-0 after:right-0 before:content-[''] before:w-[5px] before:h-[5px] before:bg-[var(--mainRed)] before:absolute before:top-[29px] before:m-[0_auto] before:left-0 before:right-0 before:rotate-45">
              {{ item.name }}
            </p>
            <p class="text-[14px] leading-[14px] font-[300] border border-[var(--mainRed)] p-[3.5%] hover:bg-[var(--mainRed)] hover:text-[var(--shadowLight)]">
              了解更多
            </p>
          </div>
          <div class="w-full h-full overflow-hidden">
            <ResponsiveImg
              :src="item.indexImg"
              :alt="item.name"
              :img-class="{
                'w-full !h-full object-cover object-center': true,
                'max-phone:!object-left': item.name === '熱壓蘑菇芝士',
                'max-phone:!object-bottom': item.name === '清爽西瓜特調',
                '!object-top': item.name === '冰心莓果優格',
                'max-menuSm:!object-top': item.name === '莓果幕斯塔'
              }"
              :img-style="{ aspectRatio: `${item.indexImagePCSize[0]}/${item.indexImagePCSize[1]}`, width: item.indexImagePCSize[0] }"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
    <MoreBtn link="menu/list" />
  </section>
</template>
