<markdown>
# 处理中

设定 `processing` 来表明正在处理。
</markdown>

<template>
  <n-space :size="24" align="center">
    <n-badge dot processing>
      <n-avatar />
    </n-badge>
    <n-badge :value="20" processing>
      <n-avatar />
    </n-badge>
    <n-badge dot type="info" processing>
      <n-avatar />
    </n-badge>
  </n-space>
</template>
