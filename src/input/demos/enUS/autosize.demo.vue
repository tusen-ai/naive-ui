<markdown>
# Autosize

Autosize the input.
</markdown>

<template>
  <n-space vertical>
    <n-input placeholder="Autosizable" autosize style="min-width: 50%" />
    <n-input
      placeholder="Autosizable"
      type="textarea"
      size="small"
      :autosize="{
        minRows: 3,
        maxRows: 5
      }"
    />
    <n-input
      type="textarea"
      placeholder="Autosizable"
      :autosize="{
        minRows: 3
      }"
    />
  </n-space>
</template>
