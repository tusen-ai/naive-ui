<markdown>
# Height & border radius

In case you aren't satisfied with height & border-radius.
</markdown>

<template>
  <n-space vertical>
    <n-progress
      type="line"
      :percentage="50"
      :height="24"
      :border-radius="4"
      :fill-border-radius="0"
    />
    <n-progress
      type="line"
      status="error"
      :percentage="50"
      :height="24"
      border-radius="12px 0 12px 0"
      fill-border-radius="12px 0 12px 0"
    >
      A Kind of Art
    </n-progress>
  </n-space>
</template>
