<markdown>
# 组件的类前缀

如果不设置 `n-config-provider` 的类前缀 `cls-prefix`，则默认继承父级的类前缀。

注意，该属性不是响应式的。
</markdown>
<template>
  <n-config-provider cls-prefix="myPrefix" abstract>
    <n-flex vertical>
      <n-button ref="button1Ref">
        噢 {{ button1Ref?.mergedClsPrefix }}
      </n-button>
      <n-config-provider abstract>
        <n-button ref="button2Ref">
          噢噢 {{ button2Ref?.mergedClsPrefix }}
        </n-button>
      </n-config-provider>
    </n-flex>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'
const button1Ref = ref<InstanceType<typeof NButton>>()
const button2Ref = ref<InstanceType<typeof NButton>>()
</script>
