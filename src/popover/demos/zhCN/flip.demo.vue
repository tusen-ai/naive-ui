<markdown>
# 弹出信息的位置调整

使用 `flip` 决定是否调整，使用 `shift` 决定是否偏移
</markdown>

<template>
  <n-popover trigger="click" placement="bottom" shift>
    <template #trigger>
      <n-button> 我要调整 </n-button>
    </template>
    <span>
      默认是在已有位置内调整，如若已有位置不满足还是被遮挡了，可以设置`shift`属性，会在同纬度进行适当偏移的。注意：如果弹出信息足够大，怎么偏移都是会被遮挡哦！注意：如果弹出信息足够大，怎么偏移都是会被遮挡哦！注意：如果弹出信息足够大，怎么偏移都是会被遮挡哦！
    </span>
  </n-popover>
</template>
