<markdown>
# 图标

添加图标
</markdown>

<template>
  <n-input placeholder="搜索" clearable>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input placeholder="搜索" clearable>
    <template #suffix>
      DOLLAR
    </template>
  </n-input>
  <n-input round placeholder="搜索" size="small" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input placeholder="搜索" size="large" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input placeholder="搜索" size="small" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input placeholder="搜索" pair size="large" separator="-" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input placeholder="搜索" pair size="small" separator="-" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input round placeholder="搜索" size="large" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
    <template #prefix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
  <n-input round placeholder="搜索" clearable>
    <template #suffix>
      <n-icon>
        <md-search />
      </n-icon>
    </template>
  </n-input>
</template>
<script lang="ts">
import { MdSearch } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdSearch
  }
})
</script>

<style>
.n-input {
  margin-bottom: 8px;
}
</style>
