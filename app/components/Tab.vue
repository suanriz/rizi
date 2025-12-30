<script lang="ts" setup>
import type { TabType } from '@/types'

const props = defineProps<{
  tabData: TabType[]
}>()
const modelValue = defineModel<number>()
const emit = defineEmits(['handle-tab-click'])

const handleClick = (index: number) => {
  modelValue.value = index
  emit('handle-tab-click', index)
}

defineExpose({ handleClick })
</script>

<template>
  <ul
    class="filter p-[0_4%] grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] md:block"
    data-aos="fade-right"
    data-aos-duration="800"
    data-aos-easing="ease-in-sine"
  >
    <li
      v-for="(tab, index) in props.tabData"
      :key="tab.name"
      role="button"
      tabindex="0"
      @click="handleClick(index)"
      @keyup.enter="handleClick(index)"
    >
      <p
        class="hoverStyle relative text-[var(--mainTxt)] text-[18px] leading-[18px] font-[300] tracking-[.04em] m-[0_0_20px_0] pl-[10px] transition duration-[.7s] hover:translate-x-[14px]"
        :class="{ activeStyle: modelValue === index }"
      >
        <span>{{ tab.name }}</span>
        <span class="block text-[var(--deepGray)] text-[14px] leading-[14px] font-[100] tracking-[.1em] mt-[5px]">{{
          tab.sub }}</span>
      </p>
    </li>
  </ul>
</template>

<style scoped>
.activeStyle,
.hoverStyle:hover {
  position: relative;
}

.activeStyle::before,
.hoverStyle:hover::before {
  content: "";
  border-left: 3px solid var(--mainRed);
  margin-right: 5px;
  position: absolute;
  left: 0;
  height: 100%;
  display: block;
}

.activeStyle:first-child,
.hoverStyle:hover:first-child {
  color: var(--mainRed);
}
</style>
