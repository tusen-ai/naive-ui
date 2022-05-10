<markdown>
# 自定义上一步和下一步
</markdown>

<template>
  <n-pagination :page-count="101">
    <template #prev>
      往回走
    </template>
    <template #next>
      继续走
    </template>
  </n-pagination>
</template>
