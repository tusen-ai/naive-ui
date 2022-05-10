<markdown>
# Customize tooltip content

Use the `tooltip` slot to customize the tooltip content.
</markdown>

<template>
  <n-ellipsis style="max-width: 240px">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam
    <template #tooltip>
      <div style="text-align: center">
        <i>Lorem Ipsum</i><br>
        Sed ut perspiciatis unde omnis<br>
        iste natus error sit voluptatem accusantium doloremque laudantium,<br>
        totam rem aperiam
      </div>
    </template>
  </n-ellipsis>
</template>
