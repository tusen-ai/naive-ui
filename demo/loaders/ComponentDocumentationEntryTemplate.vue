<template>
  <documentation-wrapper>
    <en-US />
    <zh-CN />
  </documentation-wrapper>
</template>

<script>
import zhCN from './zhCN/index.md'
import enUS from './enUS/index.md'

export default {
  components: {
    'en-US': enUS,
    'zh-CN': zhCN
  }
}
</script>
