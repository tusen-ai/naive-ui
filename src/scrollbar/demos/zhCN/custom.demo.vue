<markdown>
# 自定义样式

你可以通过 `theme-overrides` 去控制滚动条的样式。
</markdown>

<template>
  <n-config-provider
    :theme-overrides="{
      Scrollbar: {
        width: '8px',
        railInsetHorizontal: '4px 4px 4px auto',
        borderRadius: 0
      }
    }"
  >
    <n-scrollbar style="max-height: 120px">
      我们在田野上面找猪<br>
      想象中已找到了三只<br>
      小鸟在白云上面追逐<br>
      它们在树底下跳舞<br>
      啦啦啦啦啦啦啦啦咧<br>
      啦啦啦啦咧<br>
      我们在想象中度过了许多年<br>
      想象中我们是如此的疯狂<br>
      我们在城市里面找猪<br>
      想象中已找到了几百万只<br>
      小鸟在公园里面唱歌<br>
      它们独自在想象里跳舞<br>
      啦啦啦啦啦啦啦啦咧<br>
      啦啦啦啦咧<br>
      我们在想象中度过了许多年<br>
      许多年之后我们又开始想象<br>
      啦啦啦啦啦啦啦啦咧
    </n-scrollbar>
  </n-config-provider>
</template>
