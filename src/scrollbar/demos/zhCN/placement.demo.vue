<markdown>
# 滚动条位置

通过 `y-placement` 和 `x-placement` 去控制滚动条的位置。
</markdown>

<template>
  <NSpace>
    <n-scrollbar style="max-height: 120px" y-placement="left">
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
    <n-scrollbar x-scrollable x-placement="top" style="white-space: nowrap">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞
      啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年
      想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只
      小鸟在公园里面唱歌 它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 许多年之后我们又开始想象 啦啦啦啦啦啦啦啦咧
    </n-scrollbar>
  </NSpace>
</template>
