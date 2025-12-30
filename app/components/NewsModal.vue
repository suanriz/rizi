<script lang="ts" setup>
import { computed } from 'vue'

import type { NewsModelType, NewsType } from '@/types'

const props = defineModel<NewsModelType>({
  required: true
})
const listIdMap = computed(() => props.value.list.map(x => x.id))
const pageId = computed(() => props.value.data.id)
const noPrev = computed(() => listIdMap.value[0] === pageId.value)
const noNext = computed(() => listIdMap.value.at(-1) === pageId.value)

const closeModal = () => props.value.isOpen = false

const handleChangeNews = (type: 'next' | 'prev') => {
  const idIndex = listIdMap.value.findIndex(x => x === pageId.value)
  const searchIndex = type === 'next' ? idIndex + 1 : idIndex - 1

  if (listIdMap.value[searchIndex])
    return props.value.data = props.value.list[searchIndex] as NewsType
}
</script>

<template>
  <a-modal v-model:open="props.isOpen" :title="props.data.title" @cancel="closeModal">
    <ResponsiveImg img-class="w-full aspect-[475/300] w-[475px]" :src="props.data.img" :alt="props.data.title" />
    <p class="mt-[6px]">
      {{ props.data.introduction }}
    </p>
    <template #footer>
      <div class="flex justify-center gap-[20px]">
        <button :disabled="noPrev" @click="handleChangeNews('prev')">
          上一篇
        </button>
        <button :disabled="noNext" @click="handleChangeNews('next')">
          下一篇
        </button>
      </div>
    </template>
  </a-modal>
</template>
