<markdown>
# 展开方式

使用 `expand-trigger="click"` 搭配 `line-clamp` 参数可以实现点击缩略文本展开完整文本的功能。
</markdown>

<template>
  <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
    电灯熄灭 物换星移 泥牛入海<br>
    黑暗好像 一颗巨石 按在胸口<br>
    独脚大盗 百万富翁 摸爬滚打<br>
    黑暗好像 一颗巨石 按在胸口
  </n-ellipsis>
</template>
