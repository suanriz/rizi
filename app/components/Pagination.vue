<script lang="ts" setup>
const pageConfig = defineModel({
  type: Object,
  required: true,
})
const props = defineProps<{
  total: number
}>()

const handleChange = (_current: number, _pageSize: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="flex justify-center">
    <a-pagination
      v-model:current="pageConfig.current"
      v-model:page-size="pageConfig.pageSize"
      :total="props.total"
      :page-size-options="['2', '4', '6', '8', '10']"
      show-size-changer
      @show-size-change="() => pageConfig.current = 1"
      @change="handleChange"
    />
  </div>
</template>
