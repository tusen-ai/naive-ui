<markdown>
# 最大行数

naive-ui 提供基于 `-webkit-line-clamp` 的多行省略。兼容性参见 [caniuse](https://caniuse.com/?search=line-clamp)。
</markdown>

<template>
  <n-ellipsis :line-clamp="2">
    电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
    百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
  </n-ellipsis>
</template>
