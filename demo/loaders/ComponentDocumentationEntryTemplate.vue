<template>
  <documentation-wrapper>
    <en-US />
    <zh-CN />
  </documentation-wrapper>
</template>

<script>
import zhCN from './zhCN/index'
import enUS from './enUS/index'
zhCN.name = 'zh-CN'
enUS.name = 'en-US'
export default {
  components: {
    'en-US': enUS,
    'zh-CN': zhCN
  }
}
</script>
