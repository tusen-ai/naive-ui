<markdown>
# Better render performance

In most case, normal ellipsis is fast enough. However, if you have a huge amount ellipsis to render, you may use `n-performant-ellipsis` in place of `n-ellpisis`. It has better render performance with some caveats: Inner component may be unmounted and remouted again. Use it carefully.
</markdown>

<template>
  <n-performant-ellipsis style="max-width: 240px">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam
  </n-performant-ellipsis>
</template>
