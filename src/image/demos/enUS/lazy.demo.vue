<markdown>
# lazyLoad
</markdown>

<template>
  <n-image
    v-for="(item, index) in Array(50)"
    :key="index"
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    lazy
    :lazy-options="{
      root: '.n-layout--static-positioned'
    }"
  />
</template>
