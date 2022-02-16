<markdown>
# 基础用法
</markdown>

<template>
  <n-radio v-model:value-value="value" value="Definitely Maybe">
    <n-input />
  </n-radio>
</template>

<script lang="ts">
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
