<template>
  <documentation-wrapper>
    <en-us />
    <zh-cn />
  </documentation-wrapper>
</template>

<script>
import zhCN from './zhCN/index.md'
import enUS from './enUS/index.md'

export default {
  components: {
    'en-us': enUS,
    'zh-cn': zhCN
  }
}
</script>
