<markdown>
# Lazy 原始尺寸展示图片
</markdown>

<template>
  <n-image
    width="100"
    src="https://tva1.sinaimg.cn/large/9448bbf8gy1h2mzox08tlj20g45xyh0q.jpg?t=3"
    lazyload
  />

  <n-image
    width="100"
    src="https://tva1.sinaimg.cn/large/9448bbf8gy1h2mzox08tlj20g45xyh0q.jpg?t=2"
    lazyload
  />
  <n-image
    width="100"
    src="https://tva1.sinaimg.cn/large/9448bbf8gy1h2mzox08tlj20g45xyh0q.jpg?t=1"
    lazyload
  />

  <n-image
    width="100"
    src="https://tva1.sinaimg.cn/large/9448bbf8gy1h2mzox08tlj20g45xyh0q.jpg?t=1"
    lazyload
  >
    <template #placeholder>
      <div>111</div>
    </template>
  </n-image>
</template>
