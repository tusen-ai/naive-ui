<markdown>
# 自定义 to 选项
</markdown>

<template>
  <div ref="sizePickerRef" />
  <div ref="compressedQuickJumperRef" />
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
    :to="to"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      pageSize: ref(20),
      to: ref(
        {} as { compressedQuickJumper: HTMLElement; sizePicker: HTMLElement }
      )
    }
  },
  mounted () {
    this.to.compressedQuickJumper = this.$refs
      .compressedQuickJumperRef as HTMLElement
    this.to.sizePicker = this.$refs.sizePickerRef as HTMLElement
  }
})
</script>
