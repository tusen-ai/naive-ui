<markdown>
# 下拉菜单

和下拉菜单一起使用。
</markdown>

<script lang="ts" setup>
const options1 = [
  {
    label: 'David Tao',
    key: 1
  },
  {
    label: '黑色柳丁',
    key: 2
  }
]

const options2 = [
  {
    label: '小镇姑娘',
    key: 1
  },
  {
    label: '普通朋友',
    key: 2
  }
]
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-dropdown :options="options1">
        <div class="trigger">
          I'm ok
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-dropdown :options="options2">
        <div class="trigger">
          I'm ok
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style>
.trigger {
  padding: 4px;
  margin: -4px;
  border-radius: inherit;
}
</style>
