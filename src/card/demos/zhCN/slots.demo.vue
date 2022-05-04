<markdown>
# 插槽

卡片有很多插槽，希望能帮你少写点代码。
</markdown>

<template>
  <n-card title="卡片插槽示例">
    <template #header-extra>
      #header-extra
    </template>
    卡片内容
    <template #footer>
      #footer
    </template>
    <template #action>
      #action
    </template>
  </n-card>
</template>
