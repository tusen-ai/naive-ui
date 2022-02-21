<markdown>
# Processing

Set `processing` prop to indicate it is processing.
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
