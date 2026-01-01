<markdown>
# 渲染性能更好的省略

通常情况下，普通的省略已经能满足性能需求，但是在大量渲染的情况下，你可以使用 `n-performant-ellipsis` 来替代普通的 `n-ellipsis`。它具备更好的性能，但是也存在一些问题：内部的组件有可能被卸载再重新挂载，所以请谨慎使用。
</markdown>

<template>
  <n-performant-ellipsis style="max-width: 240px">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </n-performant-ellipsis>
</template>
