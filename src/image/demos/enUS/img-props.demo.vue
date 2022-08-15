<markdown>
# Image Props

You can set e.g. `aspect-ratio` or `referrerpolicy` via `:img-props`
</markdown>

<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    :img-props="{
      style: { 'aspect-ratio': '16 / 9' },
      referrerpolicy: 'no-referrer'
    }"
  />
</template>
