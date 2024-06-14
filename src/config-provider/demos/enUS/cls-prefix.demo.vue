<markdown>
# Component's class prefix
If you don't set the `cls-prefix` prop of `n-config-provider`, it will inherit the class prefix from its parent by default.

Note that this prop is not reactive.
</markdown>
<template>
  <n-config-provider cls-prefix="myPrefix" abstract>
    <n-flex vertical>
      <n-button ref="button1Ref">
        Oops · {{ button1Ref?.mergedClsPrefix }}
      </n-button>
      <n-config-provider abstract>
        <n-button ref="button2Ref">
          Oops Oops · {{ button2Ref?.mergedClsPrefix }}
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
